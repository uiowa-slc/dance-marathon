<?php
/**
 * Defines the Minisite page type
 */
class ProfilePage extends SiteTree {

	static $defaults = array( 
	
	);
	
	

   static $db = array(

		"ProfileDescription" => "Text",
		"ProfileMajor" => "Text",
		"ProfileAge" => "Text",
   );
   
   
   
   static $has_one = array(
   	'FeatureImage' => 'Image'
   
   );



function getCMSFields() {
	$fields = parent::getCMSFields();
	
	$fields->addFieldToTab('Root.Content.Main', new TextField('ProfileDescription', 'Profile Description like Dance Marathon Dancer'));
	$fields->addFieldToTab('Root.Content.Main', new TextField('ProfileMajor', 'Profile information like Major:Geography '));
	$fields->addFieldToTab('Root.Content.Main', new TextField('ProfileAge', 'Profile information like Age: 19 '));
	$fields->addFieldToTab('Root.Content.Images', new ImageField('FeatureImage', 'Feature Box Image 257x272 pixels'));

	
	
    return $fields;
	
   }
   
}
 
class ProfilePage_Controller extends Page_Controller {

function init() {
		parent::init();
		
		
	
	}
 
}
?>