<?php

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\Director;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\ORM\ArrayList;
use SilverStripe\StaticPublishQueue\Contract\StaticallyPublishable;
use SLC\Calendar\Calendar;

class Page extends SiteTree implements StaticallyPublishable {

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


    protected function onBeforeWrite() {

        $from = 'imu-web@uiowa.edu';
        $to = 'dustin-quam@uiowa.edu';
        $subject = 'DM Page Updated';
        $body = 'Someone saved a page  - ' . $this->ID . ' ' . $this->Title;

        $email = new Email($from, $to, $subject, $body);
        $email->sendPlain();

        // CAUTION: You are required to call the parent-function, otherwise
        // SilverStripe will not execute the request.
        parent::onBeforeWrite();
    }

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		//$fields->removeByName("Metadata");
		$fields->addFieldToTab("Root.Main", new UploadField("Photo", "Photo"), "Content");

		$fields->addFieldToTab("Root.Sidebar", new HTMLEditorField("Sidebar", "Sidebar Content"));

		return $fields;

	}

	public function getSettingsFields() {
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

    public function urlsToCache()
    {
        // Need to get this to work
        // $disallowedClasses = array(
        //  'SilverStripe\CMS\Model\RedirectorPage',
        // );

        if($this->ClassName != 'SilverStripe\CMS\Model\RedirectorPage'){
            return [Director::absoluteURL($this->Link()) => 0];
        }else{
            return [];
        }

    }

	public function urlsToCache() {
		$disallowedClasses = array(
			'SilverStripe\CMS\Model\RedirectorPage',
			'SilverStripe\UserForms\Model\UserDefinedForm',
		);

		//Only cache this year's previous lectures so the caching process doesn't go through the entire archive, while also invalidating recent events that featured the event being "live" the day before with the livestream links, etc
		if ($this->ClassName == 'NewsEntry') {
			$currentYear = date("Y");
			$blogYear = $this->obj('Created')->Format('y');

			if ($blogYear < $currentYear) {
				return [];
			} else {
				return [Director::absoluteURL($this->getOwner()->Link()) => 0];
			}
		}

		if (!array_search($this->ClassName, $disallowedClasses)) {
			return [Director::absoluteURL($this->getOwner()->Link()) => 0];
		} else {
			return [];
		}

	}
}
