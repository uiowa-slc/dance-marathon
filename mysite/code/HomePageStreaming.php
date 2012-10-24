<?php
/**
 * Defines the HomePage page type
 */
 
class HomePageStreaming extends HomePage {
 static $db = array(
 );
 
   static $has_one = array(
 
   );
   
   function getCMSFields() {
   		$fields = parent::getCMSFields();
   		return $fields;
}
}
 
class HomePageStreaming_Controller extends HomePage_Controller {
	
		public function init() {
			parent::init();
		}
	
}
?>