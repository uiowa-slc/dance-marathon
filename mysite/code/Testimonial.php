<?php

use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataObject;

class Testimonial extends DataObject {

  private static $db = array(
    'Quote' => 'Text',
    'Citation' => 'Varchar(255)',
    'Website' => 'Varchar(255)',
    'SortOrder'=>'Int'
  );

  // One-to-one relationship with parent page
  private static $has_one = array(
    'HomePage' => 'HomePage'
  );

  // Summary fields
  private static $summary_fields = array(
    'Quote' => 'Quote',
    'Citation' => 'Citation'
  );

  public function getCMSFields_forPopup() {

    return new FieldList(
      new TextareaField('Quote', 'Quote'),
      new TextField('Citation', 'Citation'),
      new TextField('Website', 'Website URL (including http://)'),
      $thumbField
    );

  }
}