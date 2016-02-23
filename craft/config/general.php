<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

$env = require(dirname(dirname(__FILE__)).'/../.env.php');

return array(
  // Things we need to use in the CP
  'environmentVariables' => array(
    'siteUrl' => $env['APP_SITE_URL'],
  ),
  'timezone'             => 'America/Chicago',
  'imageDriver'          => $env['APP_IMAGE_DRIVER'],
  'devMode'              => $env['APP_DEV_MODE'],
  'siteUrl'              => $env['APP_SITE_URL']
);
