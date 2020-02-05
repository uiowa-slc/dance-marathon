<?php

use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\GridField\GridField;
use UndefinedOffset\SortableGridField\Forms\GridFieldSortableRows;
class SponsorHolderPage extends Page {

	private static $db = array(
	);

	private static $has_one = array(
	);
	private static $has_many = array(
		'SponsorEntrys' => 'SponsorEntry',
		'SponsorTypes' => 'SponsorType'
	);
	private static $allowed_children = array(
		'SponsorEntry'
	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("SponsorEntrys", "Sponsors:", $this->SponsorEntrys(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField, "Content");

		$typeGridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$typeGridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$typeGridField = new GridField("SponsorTypes", "Sponsors:", $this->SponsorTypes(), $typeGridFieldConfig);
		$fields->addFieldToTab("Root.Main", $typeGridField, "Content");

		return $fields;

	}

	public function UncategorizedSponsors(){

		$sponsors = $this->SponsorEntrys()->filter(array('TypeID' => 0))->sort('SortOrder');
		return $sponsors;

	}

}
