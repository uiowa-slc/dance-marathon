<?php

class ProfileOverview extends Page {
	
	public static $db = array(
	
	);
	
	public static $has_one = array(
	);

static $allowed_children = array('ProfilePage', 'ProfileOverview');
	
	
function getCMSFields() {
	$fields = parent::getCMSFields();
	

	
    return $fields;
	
   }	
	
}

class ProfileOverview_Controller extends Page_Controller {
	
	public function init() {
		parent::init();
		
	}
	
	
	
}

?>