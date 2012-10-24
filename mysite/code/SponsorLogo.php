<?php
/**
 * Defines the HomePage page type
 */
 
class SponsorLogo extends Page {
 static $db = array(

	"SponsorLink" => "Text",
  
);
   static $has_one = array(
   
  	'ContentImage' => 'Image'
 
   );
   
   function getCMSFields() {
   $fields = parent::getCMSFields();
   
   	$fields->removeFieldFromTab("Root.Content","Content");
	$fields->addFieldToTab('Root.Content.Main', new TextField('SponsorLink', 'Sponsor website address'));
    $fields->addFieldToTab('Root.Content.Images', new ImageField('ContentImage', 'Event Image 300x200 pixels'));

   return $fields;
}
}
 
class SponsorLogo_Controller extends Page_Controller {
	
}
?>