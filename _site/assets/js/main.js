 $(document).ready(function() {
  // ---------------------
  // Mobile Detect
  // from http://davegamache.com/
  // ---------------------

  var isMobile;

  // Identify if visitor on mobile with lame sniffing to serve up good videos
  if( navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/BlackBerry/)
  ){
    isMobile = true;
  }



  // ---------------------
  // Facts Slider
  // ---------------------

   var facts = [
   	"I kind of want to be a rapper.",
	  "I have jumped out of a plane.",
	  "I have been to China.",
	  "I love to solve problems.",
	  "I have traveled to Australia.",
	  "I lived in Rome for a semester.",
	  "I work at an advertising agency.",
	  "I would like to design a typeface.",
	  "I run 2 miles most days.",
     "I have been to 4 of 7 continents"
   ]

   var i = Math.floor(Math.random() * facts.length);
   var generate = function(){
   	if (i < facts.length - 1) {
   		i++
 		} else {
 			i = 0;
 		}
    $('.fact').fadeOut(200).html('<span class="fact">'+facts[i]+'</span>').fadeIn(200);
   	// $(".fact").fadeOut(200, function(){
   	// 	$('.fact').remove();
	   // 	$('<span class="fact">'+facts[i]+'</span>').prependTo('.facts');
   	// });
   }

   // $(".fact").remove();
   // $('<span class="fact">'+facts[i]+'</span>').prependTo('.facts');

   $(".fact-spinner").click(generate);

   // ---------------------
   // Big Video calls
   // ---------------------
   if($('body').hasClass('home')){
    $(function() {
       var BV = new $.BigVideo();
       BV.init();
       if (Modernizr.touch || isMobile === true) {
          BV.show('assets/vids/view-from-window.jpg');
       } else {
          BV.show('assets/vids/view-from-window_med.m4v',{ambient:true});
       };
     });
   }

 });