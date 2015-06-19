<?php

global $project;
$project = 'mysite';

global $database;
$database = 'dance-marathon2';

require_once('conf/ConfigureFromEnv.php');

// Set the site locale
i18n::set_locale('en_US');