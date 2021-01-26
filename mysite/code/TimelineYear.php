<?php

use SilverStripe\ORM\DataObject;
use SilverStripe\Forms\TextField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\AssetAdmin\Forms\UploadField;

class TimelineYear extends Page
{
    private static $db = [
        'Title' => 'Varchar',
        'SortOrder' => 'Int',
        'Content' => 'HTMLText',
        'Year' => 'Text',
        'AmountRaised' => 'Text',
    ];
    private static $has_one = array(

        "Logo" => Image::class,

    );

    private static $owns = array(
        'Logo'
    );

    private static $default_sort = 'SortOrder';

        public function getCMSFields()
        {
            $fields = parent::getCMSFields();
            $fields->removeByName('Photo');

            $fields->addFieldToTab('Root.Main', new UploadField('Logo', 'Upload Logo'));

            $fields->addFieldToTab('Root.Main', new TextField('Year', 'Year'));
            $fields->addFieldToTab('Root.Main', new TextField('AmountRaised', 'Amount Raised'));

            $fields->addFieldToTab('Root.Main', new HTMLEditorField('Content'));

            return $fields;
        }
}
