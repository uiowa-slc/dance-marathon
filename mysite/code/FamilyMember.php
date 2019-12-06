<?php

use SilverStripe\Assets\Image;
use SilverStripe\AssetAdmin\Forms\UploadField;

class FamilyMember extends Page {

	private static $db = array(

	);

	private static $has_one = array(
		"FamilyPhoto" => Image::class,
	);

	private static $owns = array(
        'FamilyPhoto'
    );


	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$fields->removeByName("Metadata");

		$fields->addFieldToTab("Root.Main", new UploadField("FamilyPhoto", "Family Photo"));
		return $fields;

	}

	//private static $allowed_children = array("");

}
