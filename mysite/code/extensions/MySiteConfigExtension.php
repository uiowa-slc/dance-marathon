<?php

use SilverStripe\Assets\Image;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\DateField;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\ORM\DataExtension;
use MD\DiisionProject\SiteConfigExtensionPageController;

class MySiteConfigExtension extends DataExtension {

	private static $db = array(
        'Countdown' => 'Boolean',
		'CountdownDate' => 'Date'
	);

	private static $has_one = array(

	);

	private static $owns = array(

	);
	private static $defaults = array(

	);

	public function updateCMSFields(FieldList $fields) {
        $fields->addFieldToTab('Root.Main', new CheckboxField('Countdown','Show the Countdown? (Yes)'));
		$fields->addFieldToTab('Root.Main', new DateField('CountdownDate', 'Enter a date'));



		return $fields;
	}

}
