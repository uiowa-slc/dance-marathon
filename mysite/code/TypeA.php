<?php
/**
 * Defines the HomePage page type
 */
 
class TypeA extends Page {
 static $db = array(
	"DancersQuote" => "HTMLText",

  
);
   static $has_one = array(
   
  	'ContentImage' => 'Image'
 
   );
   
   function getCMSFields() {
   $fields = parent::getCMSFields();
   
   
$fields->addFieldToTab('Root.Content.Main', new HTMLEditorField('DancersQuote', 'Dancers Quote'));
$fields->addFieldToTab('Root.Content.Images', new ImageField('ContentImage', 'Event Image 700x267 pixels'));

   return $fields;
}
}
 
class TypeA_Controller extends Page_Controller {
	
}
?>