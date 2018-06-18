<?php

class Family extends DataObject {

  private static $db = array(
    'Title' => 'Varchar(255)',
    'Content' => 'HTMLText'
  );

  // One-to-one relationship with parent page
  private static $has_one = array(
    'AssociatedPage' => 'SiteTree',
    'Photo' => 'Image',
    'HomePage' => 'HomePage'
  );

  // Summary fields
  private static $summary_fields = array(
    'Title' => 'Title',
  );

  public function getCMSFields() {

    return new FieldList(
      new TextField('Title', 'Title'),
      new UploadField('Photo', 'Photo'),
      new TreeDropdownField('AssociatedPageID', 'Link to this page', 'SiteTree'),
      new HtmlEditorField('Content', 'Content')
    );

  }
}