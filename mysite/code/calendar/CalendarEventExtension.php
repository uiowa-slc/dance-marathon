<?php

use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\DataList;
use SilverStripe\TagField\TagField;
use SLC\Calendar\CalendarDateTime;

class CalendarEventExtension extends DataExtension {

	private static $db = array(

	);

	private static $has_one = array(

	);

	private static $many_many = array(
		"Categories" => "EventCategory",
	);

	public function UpcomingDates($limit = 3) {
		return DataList::create(CalendarDateTime::class)
			->filter("EventID", $this->owner->ID)
			->where("\"StartDate\" >= DATE(NOW())")
			->sort("\"StartDate\" ASC")
			->limit($limit);
	}
	public function updateCMSFields(FieldList $fields) {

		$categoriesMap = array();
		foreach (EventCategory::get() as $category) {
			$categoriesMap[$category->ID] = $category->Title;
		}

		asort($categoriesMap);

		$tagField = TagField::create(
			'Categories',
			'Categories',
			EventCategory::get(),
			$this->owner->Categories()
		)
			->setShouldLazyLoad(false) // tags should be lazy loaded
			->setCanCreate(true);

		$fields->addFieldToTab("Root.Main", $tagField, "Content");

	}

}
