<?php
/**
 * Defines the HomePage page type
 */
 
class PressPage extends Page {
 static $db = array(

	"PressLink" => "Text",
  
);
   static $has_one = array(
   

 
   );
   
   function getCMSFields() {
   $fields = parent::getCMSFields();
   
   
	$fields->addFieldToTab('Root.Content.Main', new TextField('PressLink', 'External Link to Article'));


   return $fields;
}
}
 
class PressPage_Controller extends Page_Controller {
	
}
?>
