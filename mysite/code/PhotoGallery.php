<?php

use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\GridField\GridField;
use UndefinedOffset\SortableGridField\Forms\GridFieldSortableRows;
class PhotoGallery extends Page {

	private static $db = array(
	);

	private static $has_one = array(
	);
	private static $has_many = array(
		'PhotoEntries' => 'PhotoEntry'
	);
	private static $allowed_children = array(
		'PhotoEntry'
	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();

		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));

		$gridField = new GridField("PhotoEntries", "Photos:", $this->PhotoEntries(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField, "Content");

		return $fields;

	}

}
