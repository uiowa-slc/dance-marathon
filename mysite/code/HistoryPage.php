<?php

use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\GridField\GridField;
use UndefinedOffset\SortableGridField\Forms\GridFieldSortableRows;
class HistoryPage extends Page {

	private static $db = array(
	);

	private static $has_one = array(

	);

	private static $has_many = array(
		'Photos' => 'Photo'
	);
	private static $allowed_children = array(
		'Photo'
	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();

		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));

		$gridField = new GridField("Photos", "Photos:", $this->Photos(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		return $fields;

	}

}
