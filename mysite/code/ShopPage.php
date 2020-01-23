<?php

use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

use UndefinedOffset\SortableGridField\Forms\GridFieldSortableRows;
class ShopPage extends Page {

	private static $db = array(
		"SecondaryContent" => "HTMLText",
	);

	private static $has_one = array(

	);
	private static $has_many = array(
		'ShopItems' => 'ShopItem',
		'Items' => 'Item',
	);
	private static $allowed_children = array(

	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$fields->removeByName("Metadata");

		// Shop items grid field - to buy
		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("ShopItems", "Items For Sale:", $this->ShopItems(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		// Content
		$fields->addFieldToTab("Root.Main", new HTMLEditorField("SecondaryContent", "Content"));

		// Shop items grid field - not to buy
		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("Items", "Items Not For Sale:", $this->Items(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		return $fields;


	}

}
