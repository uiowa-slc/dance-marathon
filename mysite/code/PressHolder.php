<?php

class PressHolder extends Page {
	
	public static $db = array(
	
	);
	
	public static $has_one = array(
								   
								   
	);

static $allowed_children = array('PressPage');
	
	
function getCMSFields() {
	$fields = parent::getCMSFields();
	
	$fields->removeFieldFromTab("Root.Content","Content");
	
    return $fields;
	
   }	
	
}

class PressHolder_Controller extends Page_Controller {
	

}

?>