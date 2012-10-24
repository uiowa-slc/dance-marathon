<?php

global $project;
$project = 'mysite';

global $databaseConfig;
$databaseConfig = array(
	"type" => 'MySQLDatabase',
	"server" => 'localhost', 
	"username" => 'root', 
	"password" => 'root', 
	"database" => 'dancemarathon',
	"path" => '',
);

// Sites running on the following servers will be
// run in development mode. See
// http://doc.silverstripe.org/doku.php?id=configuration
// for a description of what dev mode does.
Director::set_dev_servers(array(
	'localhost',
	'127.0.0.1'
));

Director::set_environment_type("live");
MySQLDatabase::set_connection_charset('utf8');

// This line set's the current theme. More themes can be
// downloaded from http://www.silverstripe.org/themes/
SSViewer::set_theme('dance');

// Set the site locale
i18n::set_locale('en_US');

// enable nested URLs for this site (e.g. page/sub-page/)
SiteTree::enable_nested_urls();

	RecaptchaField::$public_api_key = '6LcjsAgAAAAAAD6MXE7QNLusIBMajgpfK_EWjL3C';
	RecaptchaField::$private_api_key = '6LcjsAgAAAAAAJNAXp7BiEvEas6scIeWzQdaS87c';
SpamProtectorManager::set_spam_protector("RecaptchaProtector");
FulltextSearchable::enable();

 Validator::set_javascript_validation_handler('none'); 