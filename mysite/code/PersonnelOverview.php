<?php

class PersonnelOverview extends Page {
	
	public static $db = array(
	
	);
	
	public static $has_one = array(
								   
	'ContentImage' => 'Image'
										
	);

static $allowed_children = array('PersonnelPage','PersonnelHolder' );
	
	
function getCMSFields() {
	$fields = parent::getCMSFields();
	
	 $fields->addFieldToTab('Root.Content.Images', new ImageField('ContentImage', 'Event Image 469x331 pixels'));
	$fields->removeFieldFromTab("Root.Content","Content");
	
    return $fields;
	
   }	
	
}

class PersonnelOverview_Controller extends Page_Controller {
	
	public function init() {
		parent::init();
		
	}
	
	
	
}

?>