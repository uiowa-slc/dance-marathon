<?php

class NewsPage extends Page {
	
	
	public static $defaults = array(
							 
		'NewsType' => 'All'
	
	);
	
	public static $db = array(
	
	"NewsDate" => "Text",
	'NewsType' => 'Text',
	
	
	);
	
	public static $has_one = array(
	
	"NewsImage" => "Image",
	
	);
	
	
	
function getCMSFields() {
	$fields = parent::getCMSFields();
	
	$fields->addFieldToTab('Root.Content.Main', new TextField('NewsDate', 'Enter News Date and Time Here'));
	$fields->addFieldToTab('Root.Content.Images', new ImageField('NewsImage', 'News Image'));

	$array = array(
	  'Dancers' => 'Dancers',
	  'Families' => 'Families',
	  'All' => 'All',
	);
	 
	$fields->addFieldToTab('Root.Content.Main', new DropdownField(
	  'NewsType',
	  'News Type',
	  $array
	));

	
	
	
	
	
    return $fields;
	
   }	
	
}

class NewsPage_Controller extends Page_Controller {
	
	public function init() {
		parent::init();
		
	}
	
	
	
}

?>