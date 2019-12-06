<?php

use SilverStripe\Assets\Image;
use SilverStripe\Forms\TextField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

class CouncilMember extends Page {

	private static $db = array(
		"Name" => "Text",
		"Position" => "Text",
		"EmailAddress" => "Text",
		"FirstName" => "Text",
		"LastName" => "Text"
	);

	private static $has_one = array(
		"Photo" => Image::class,
	);

	private static $owns = array(
        'Photo'
    );


	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$fields->removeByName("Metadata");

		$fields->addFieldToTab("Root.Main", new TextField("FirstName", "First Name"));
		$fields->addFieldToTab("Root.Main", new TextField("LastName", "Last Name"));
		$fields->addFieldToTab("Root.Main", new TextField("Position", "Position"));
		$fields->addFieldToTab("Root.Main", new TextField("EmailAddress", "Email address"));
		$fields->addFieldToTab("Root.Main", new UploadField("Photo", "Photo"));
		$fields->addFieldToTab("Root.Main", new HTMLEditorField("Content", "Description"));

		return $fields;

	}

	//private static $allowed_children = array("");

}
