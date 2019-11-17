---
path: "/moving-craft-categories"
date: 2019-11-16 
title: "Moving a Category"
status: "draft"
---

There are three things you need to change to move a category in craft

1. Update the `groupId` on the `categories` table
2. Update the `structureId` on the `structureelements` table

I recently ran into a situation where I needed to move some categories from one group into another. Having recently become a huge fan of migrations, I decided to see if I could accomplish this task in a migration instead of doing it manually.

## How categories are stored

Categories in Craft aren't really the simplest data structure, so in order to move them I first had to understand how they worked. I started my journey in the most obvious place; the `categories` table. Here, we find just a bit of information about each category. It has the `id` the `groupId` and then the standard meta information. Thankfully, this made it easy to know where to go next. I headed over to the `categorygroups` table to see what secrets were hiding there. 

Here we have a bit more information. Again we have the `id` and then we have the `structureId` which confirmed something I had been suspicious of. When you get down to it, category groups are just slightly different structures, which means (almost) everything that goes along with the entry structure comes along for the ride. 

This means that the content for our category is stored in the `content` table, and the corresponding element is stored in the `sturctureelements` table. The only missing piece is how an entry or category knows which other element it is related to. This takes place in the same table as with all the other elements, the `relations` table. There, rows are stored with a `sourceId` (the originating element) and the `targetId` (the target element) as well as a `fieldId` which lets Craft know which field created the relationship.

All this is a really long way of saying in order to move the category from one group to another, I'll need to update the `groupId` of the category to match my new group. Next I'll need to find the category elements in the `structureelements` table and update their `structureId` to match the `structureId` that corresponds to my new group. 

Thankfully, I don't need to update the actual relation of the `relations` table (because my IDs aren't changing), BUT I will need to update the `fieldId` to match the field my new category corresponds to. Otherwise, the categories will be associated but not visible to the user.

Looks like I have a bit of work ahead of me. 

## Migrating the categories

First, I'll set up my new category groups. Then, I'll create the fields for each category group and associate them with my entry. 

Next, I'll hop into my terminal and run

    $ ./craft migrate/create UpdateCategoryGroups

After this command, Craft will ask if you're *sure* you want to create the migration, to which you should probably reply "yes", otherwise this whole thing is kind of moot.

With this, Craft has created a new file in your `migrations/` folder with a long name that ends with `UpdateCategoryGroups.php` this is the file that will get run the next time you run `./craft migrate/up` If you've never written a migration before, check out the [Craft docs on the subject for a bit of a primer](https://docs.craftcms.com/v3/extend/migrations.html#app). 

Within this migration file, we have access to all that Craft goodness as well as access to the query builder and some database updating methods. Let's get down to using them. 

First we need to get all the categories we want to update. Since this is a migration and it's only getting run once, we don't have to be super flexible here. It represents a pretty specific point in time of our database, so I'm going to hard code a few things that might make you cringe. 

My initial `safeUp` function looks something like this

    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        // Place migration code here...
        $parent = Category::findOne([
            'slug' => 'specific-days'
        ]);
    
        $categoryQuery = Category::find()
            ->descendantOf($parent)
            ->descendantDist(1);
    
        $categories = $categoryQuery->all();
    
        foreach ($categories as $category) {
            echo $category->title . PHP_EOL;
        }
    
        die();
    }

A few things to point out here. First, I'm getting the parent category based on the slug. Then I'm using that parent to get all of the direct children and storing it in `$categoryQuery` Next, I use that query to get all the categories, and loop over them just outputting the title for now. I'm a visual guy, so I like to see what's happening each step of the way. 

At then end there, you'll notice I'm calling `die()` This is definitely some poor-man's debugging. I don't want the migration to actually finish yet, so I throw that in there so I can get some output without actually doing anything.

Running this should output something like:

    $ ./craft migrate/up
    Yii Migration Tool (based on Yii v2.0.21)
    
    Total 1 new migration to be applied:
    	m191106_013824_MoveLiturgicalYear
    
    Apply the above migration? (yes|no) [no]:yes
    *** applying m191106_013824_MoveLiturgicalYear
    Ash Wednesday
    Palm Sunday
    Good Friday
    Easter Vigil
    Easter Sunday
    Christmas Vigil
    Christmas Day
    Epiphany
    Solemnity of the Assumption of the Blessed Virgin Mary
    Solemnity of Mary, Mother of God
    Solemnity of the Ascension
    Pentecost Sunday
    Solemnity of the Immaculate Conception
    All Saints Day
    All Soul Day
    Annunciation of the Lord
    Holy Trinity
    Corpus Christi
    Catechetical Sunday
    Feast of the Transfiguration
    Feast of Our Lady of Guadalupe
    Feast of St. Ignatius

Woo! Those are the correct categories, so we can move on to moving them. 

Here's our final `safeUp` function:

    <?php
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
    
        // First, load up the category service
        $categoriesService = Craft::$app->getCategories();
        // Use it to get the model for the group we want to move things to
        $newGroup = $categoriesService->getGroupByHandle('specificDays');
    
        // Next, get the parent. We're going to be moving all its children, so we need it for the query
        $parent = Category::findOne(['slug' => 'specific-days']);
    
        // Now our query that will get all the direct descendants of that parent
        $categoryQuery = Category::find()
            ->descendantOf($parent)
            ->descendantDist(1);
    
        // Use the query to get the IDs of those categories
        $ids = $categoryQuery->ids();
    
        echo 'Updating Ids:' . PHP_EOL;
        echo implode(', ', $ids) . PHP_EOL;
    
        // Here's where the real stuff happens
        // This updates the categories table of all our categories with the new group id
        $this->update(TABLE::CATEGORIES, ['groupId' => $newGroup->id], ['IN', 'id', $ids]);
    
        // Next we update the structureelements to get the new structure ID
        $this->update(TABLE::STRUCTUREELEMENTS, [
            'structureId' => $newGroup->structureId,
            'level' => 1
        ], ['IN', 'elementId', $ids]);
    
        // Finally we update the relations table so the new values will show in our new field
        $this->update(TABLE::RELATIONS, ['fieldId' => 158], ['IN', 'targetId', $ids]);
    }
