<?php

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\TreeDropdownField;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataObject;

class Family extends DataObject {

  private static $db = array(
    // 'Title' => 'Varchar(255)',
    'SortOrder'=>'Int'
  );

  // One-to-one relationship with parent page
  private static $has_one = array(
    'AssociatedPage' => SiteTree::class,
    'HomePage' => 'HomePage'
  );

  // Summary fields
  private static $summary_fields = array(
    'AssociatedPage.Title' => 'Title',
  );
  private static $default_sort='SortOrder';

  public function getCMSFields() {

    return new FieldList(
      // new TextField('Title', 'Title'),
      new TreeDropdownField('AssociatedPageID', 'Link to this page', SiteTree::class)
    );

  }
}