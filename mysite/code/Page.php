<?php

use SilverStripe\Forms\CheckboxField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\ORM\ArrayList;
use SLC\Calendar\Calendar;

class Page extends SiteTree {

	private static $db = array(
        'Sidebar' => 'HTMLText',
        'ShowChildrenInDropdown' => 'Boolean(1)',
	);

	private static $has_one = array(
		"Photo" => Image::class,
	);

	private static $owns = array(
		'Photo',
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		//$fields->removeByName("Metadata");
		$fields->addFieldToTab("Root.Main", new UploadField("Photo", "Photo"), "Content");

        $fields->addFieldToTab("Root.Sidebar", new HTMLEditorField("Sidebar", "Sidebar Content"));

		return $fields;

    }
    
    public function getSettingsFields(){
        $fields = parent::getSettingsFields();
        $fields->addFieldToTab('Root.Settings', CheckboxField::create('ShowChildrenInDropdown', 'Show child pages in a dropdown menu if page is in the top bar (Yes)'));
        return $fields;
    }

	public function Calendar() {
		return Calendar::get()->First();
	}
	public function EventsByCategory($categoryName) {
		$category = EventCategory::get()->filter(array('Title' => $categoryName))->First();
		$catEvents = new ArrayList();

		if ($category) {

			$catEventsTemp = $category->CalendarEvents();

			foreach ($catEventsTemp as $catEventTemp) {

				if ($catEventTemp->UpcomingDates()->First()) {
					$catEvents->push($catEventTemp->UpcomingDates()->First());
				}
			}

		}

		$catEventsSorted = $catEvents->sort(array("StartDate" => "ASC", "StartTime" => "ASC"));

		// print_r($catEvents);

		return $catEventsSorted;

	}
}
