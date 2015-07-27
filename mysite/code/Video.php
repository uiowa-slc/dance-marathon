<?php

class Video extends DataObject {

  public static $db = array(
    'Title' => 'Varchar(255)',
    // 'Description' => 'Text',
    'YoutubeVideoID' => 'Varchar(255)'
  );

  // One-to-one relationship with parent page
  public static $has_one = array(
    'HomePage' => 'HomePage'
  );

  // Summary fields
  public static $summary_fields = array(
    'Title' => 'Title',
    // 'Description' => 'Description'
  );

  public function getCMSFields_forPopup() {

    return new FieldList(
      new TextField('Title', 'Title'),
      // new TextareaField('Description', 'Video Description'),
      new TextField('YoutubeVideoID', 'Youtube Video ID)')
    );

  }
}