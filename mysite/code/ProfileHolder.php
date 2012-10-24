<?php

class ProfileHolder extends Page {
	
	public static $db = array(
	
	);
	
	public static $has_one = array(
	);

static $allowed_children = array('ProfilePage', 'ProfileOverview');
	
	
function getCMSFields() {
	$fields = parent::getCMSFields();
	
	$fields->removeFieldFromTab("Root.Content","Content");
	
    return $fields;
	
   }	
	
}

class ProfileHolder_Controller extends Page_Controller {
	
	public function init() {
		parent::init();
		
	}
	
	
	
}

?>