<?php

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SLC\Calendar\Calendar;

class BigEvent extends Calendar {

	private static $db = array(
		'EnableStream' => 'Boolean',
		'StreamCode' => 'Text',
	);

	private static $has_one = array(
		'TopPhotoOne' => Image::class,
		'TopPhotoTwo' => Image::class,
		'TopPhotoThree' => Image::class,
	);
	private static $has_many = array(

	);

	private static $owns = array(
		'TopPhotoOne',
		'TopPhotoTwo',
		'TopPhotoThree',
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->removeByName("Photo");

		// Header Photos
		$fields->addFieldToTab('Root.Main', new UploadField('TopPhotoOne', 'Upload Photo'));
		$fields->addFieldToTab('Root.Main', new UploadField('TopPhotoTwo', 'Upload Photo'));
		$fields->addFieldToTab('Root.Main', new UploadField('TopPhotoThree', 'Upload Photo'));

		// Live Stream
		$fields->addFieldToTab('Root.Stream', new CheckboxField('EnableStream', 'Enable the live stream video'));
		$fields->addFieldToTab("Root.Stream", new TextareaField("StreamCode", 'Stream Code (optional, defaults to: JW player from ITS 2017)"></script>)'));

		return $fields;

	}

}
