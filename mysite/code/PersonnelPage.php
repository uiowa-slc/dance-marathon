<?php
/**
 * Defines the HomePage page type
 */
 
class PersonnelPage extends Page {
 static $db = array(

"PersonnelEmail" => "Text",
"PersonnelTitle" => "Text",
  
);
   static $has_one = array(
   
  	'ContentImage' => 'Image'
 
   );
   
   function getCMSFields() {
   $fields = parent::getCMSFields();
   
   	$fields->removeFieldFromTab("Root.Content","Content");
	$fields->addFieldToTab('Root.Content.Main', new TextField('PersonnelEmail', 'Email Address'));
		$fields->addFieldToTab('Root.Content.Main', new TextField('PersonnelTitle', 'Title'));
    $fields->addFieldToTab('Root.Content.Images', new ImageField('ContentImage', 'Profile Picture Here'));

   return $fields;
}
}
 
class PersonnelPage_Controller extends Page_Controller {
	
}
?>