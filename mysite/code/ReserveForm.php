<?php

class ReserveForm extends Page {
	
	public static $db = array(
	
	);
	
	public static $has_one = array(
	);

static $allowed_children = array('none');
	
	
function getCMSFields() {
	$fields = parent::getCMSFields();
    return $fields;
	
   }	
	
}

class ReserveForm_Controller extends Page_Controller {
	
	public function init() {
		parent::init();
		print_r(Director::urlParams());
		
	}
	
	static $allowed_actions = array(
     'view'
   );
	
	public function view($request){
		print_r($request->param('ID'));
	}
	
	
	
}

?>