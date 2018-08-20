<?php

class Photo extends DataObject {

  private static $db = array(
    'SortOrder'=>'Int'
  );

  // One-to-one relationship with parent page
  private static $has_one = array(
    'Photo' => 'Image',
    'HistoryPage' => 'HistoryPage'
  );

  // Summary fields
  private static $summary_fields = array(
    'Thumbnail'
  );
  function getThumbnail() {
    return $this->Photo()->CMSThumbnail();
  }

  public function getCMSFields_forPopup() {
    $fields->removeByName("SortOrder");
    $thumbField2 = new UploadField('Photo', 'Logo');
    $thumbField2->allowedExtensions = array('jpg', 'png', 'gif');

    return new FieldList(
      $thumbField2
    );

  }
  private static $default_sort='SortOrder';
}