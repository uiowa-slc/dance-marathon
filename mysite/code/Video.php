<?php

use SilverStripe\Forms\TextField;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataObject;

class Video extends DataObject {

  private static $db = array(
    'Title' => 'Varchar(255)',
    // 'Description' => 'Text',
    'YoutubeVideoID' => 'Varchar(255)',
    'SortOrder'=>'Int'
  );

  // One-to-one relationship with parent page
  private static $has_one = array(
    'HomePage' => 'HomePage'
  );

  // Summary fields
  private static $summary_fields = array(
    'Title' => 'Title',
    // 'Description' => 'Description'
  );

  private static $default_sort='SortOrder';

  public function getCMSFields_forPopup() {

    return new FieldList(
      new TextField('Title', 'Title'),
      // new TextareaField('Description', 'Video Description'),
      new TextField('YoutubeVideoID', 'Youtube Video ID)')
    );

  }
}