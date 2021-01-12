<?php

use SilverStripe\Assets\Image;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\CMS\Model\SiteTree;

class Page extends SiteTree {

	private static $db = array(
		'Sidebar' => 'HTMLText'
	);

	private static $has_one = array(
		"Photo" => Image::class,
    );
    
    private static $owns = array(
		'Photo'
	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();

		//$fields->removeByName("Metadata");
		$fields->addFieldToTab("Root.Main", new UploadField("Photo", "Header Photo"), "Content");

		$fields->addFieldToTab("Root.Sidebar", new HTMLEditorField("Sidebar", "Sidebar Content"));

		return $fields;

	}

}
