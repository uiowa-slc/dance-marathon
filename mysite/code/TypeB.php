<?php
/**
 * Defines the HomePage page type
 */
 
class TypeB extends Page {
 static $db = array(

	"FamiliesQuote" => "HTMLText",
  
);
   static $has_one = array(
   
  	'ContentImage' => 'Image'
 
   );
   
   function getCMSFields() {
   $fields = parent::getCMSFields();
   
   
$fields->addFieldToTab('Root.Content.Main', new HTMLEditorField('FamiliesQuote', 'Families Quote'));
$fields->addFieldToTab('Root.Content.Images', new ImageField('ContentImage', 'Event Image 700x267 pixels'));

   return $fields;
}
}
 
class TypeB_Controller extends Page_Controller {
	
}
?>