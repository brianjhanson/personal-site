<?php
/**
 * Environment bootstrap
 *
 * Sets the environment defaults for the app.
 * Individual settings should be overridden using environment
 * variables on each server.
 *
 */
return array(
  // DATABASE
  'APP_DB_DATABASE'                             => 'brianhanson',
  'APP_DB_PASSWORD'                             => 'root',
  'APP_DB_SERVER'                               => 'localhost',
  'APP_DB_TABLE_PREFIX'                         => 'craft',
  'APP_DB_USER'                                 => 'root',
  // MISC
  'APP_DEV_MODE'                                => true,
  // URLS
  'APP_SITE_URL'                                => 'http://brianhanson.dev/',
  'APP_IMAGE_DRIVER'                            => 'imagick'
);
