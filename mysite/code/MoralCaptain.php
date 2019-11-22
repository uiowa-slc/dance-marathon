<?php

use SilverStripe\Assets\Image;
use SilverStripe\Forms\TextField;
use SilverStripe\AssetAdmin\Forms\UploadField;

class MoralCaptain extends Page {

	private static $db = array(
		"Name" => "Text",
		"EmailAddress" => "Text",
		"FirstName" => "Text",
		"LastName" => "Text",
		"OrderNumber" => "Text"
	);

	private static $has_one = array(
		"Photo" => Image::class,
	);


	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$fields->removeByName("Metadata");
		$fields->removeByName("Content");

		$fields->addFieldToTab("Root.Main", new TextField("FirstName", "First Name"));
		$fields->addFieldToTab("Root.Main", new TextField("LastName", "Last Name"));
		$fields->addFieldToTab("Root.Main", new TextField("EmailAddress", "Email address"));
		$fields->addFieldToTab("Root.Main", new TextField("OrderNumber", "Order Number"));
		$fields->addFieldToTab("Root.Main", new UploadField("Photo", "Photo"));


		return $fields;

	}

	//private static $allowed_children = array("");

}