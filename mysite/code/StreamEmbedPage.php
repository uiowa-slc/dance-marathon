<?php
/**
 * Defines the HomePage page type
 */
 
class StreamEmbedPage extends Page {
 static $db = array(

	/*"ImageCaption" => "Text",*/
  
);
   static $has_one = array(
   
  	/*'ContentImage' => 'Image'*/
 
   );
   
   function getCMSFields() {
   $fields = parent::getCMSFields();
   
   
	/*$fields->addFieldToTab('Root.Content.Images', new TextField('ImageCaption', 'Image Caption'));
    		$fields->addFieldToTab('Root.Content.Images', new ImageField('ContentImage', 'Event Image 469x331 pixels'));*/

   return $fields;
}
}
 
class StreamEmbedPage_Controller extends Page_Controller {
	
}
?>