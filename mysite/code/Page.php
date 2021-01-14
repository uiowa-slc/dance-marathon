<?php

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\ORM\ArrayList;
use SLC\Calendar\Calendar;

class Page extends SiteTree {

	private static $db = array(
		'Sidebar' => 'HTMLText',
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
		$fields->addFieldToTab("Root.Main", new UploadField("Photo", "Header Photo"), "Content");

		$fields->addFieldToTab("Root.Sidebar", new HTMLEditorField("Sidebar", "Sidebar Content"));

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
