<?php

namespace {
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use UndefinedOffset\SortableGridField\Forms\GridFieldSortableRows;
use SilverStripe\Forms\GridField\GridField;

    class TimelinePage extends Page
    {
        private static $db = [

        ];

        private static $has_one = [];

        private static $allowed_children = array(
            'TimelineYear'
        );

        public function getCMSFields()
        {
            $fields = parent::getCMSFields();
            $fields->removeByName('Sidebar');
            
            return $fields;
        }

        public function AllYears(){
        	$years = TimelineYear::get();
        	return $years;
        }
    }
}
