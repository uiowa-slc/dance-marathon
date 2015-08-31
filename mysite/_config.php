<?php

global $project;
$project = 'mysite';

global $database;
$database = 'dance-marathon2';

require_once('conf/ConfigureFromEnv.php');

// Set the site locale
i18n::set_locale('en_US');
FulltextSearchable::enable();
// Enable nested URLs for this site (e.g. page/sub-page/)
if (class_exists('SiteTree')) SiteTree::enable_nested_urls();
// TinyMCE cleanup on paste
HtmlEditorConfig::get('cms')->setOption('paste_auto_cleanup_on_paste','true');
HtmlEditorConfig::get('cms')->setOption('paste_remove_styles','true');
HtmlEditorConfig::get('cms')->setOption('paste_remove_styles_if_webkit','true');
HtmlEditorConfig::get('cms')->setOption('paste_strip_class_attributes','true');
GD::set_default_quality(80);
SiteConfig::add_extension('SiteConfigExtension');

if(Director::isLive()) {
	Director::forceSSL();
}
