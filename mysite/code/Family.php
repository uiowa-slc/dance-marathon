<?php

class Family extends DataObject {

  private static $db = array(
    // 'Title' => 'Varchar(255)',
    'SortOrder'=>'Int'
  );

  // One-to-one relationship with parent page
  private static $has_one = array(
    'AssociatedPage' => 'SiteTree',
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
      new TreeDropdownField('AssociatedPageID', 'Link to this page', 'SiteTree')
    );

  }
}