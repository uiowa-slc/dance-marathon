<?php

use SilverStripe\Assets\Image;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataObject;

class SponsorEntry extends DataObject {

  private static $db = array(
    'Title' => 'Varchar(255)',
    'Website' => 'Varchar(255)',
    'SortOrder'=>'Int'
  );

  // One-to-one relationship with parent page
  private static $has_one = array(
    'SponsorLogo' => Image::class,
    'SponsorHolderPage' => 'SponsorHolderPage'
  );

  // Summary fields
  private static $summary_fields = array(
    'Title' => 'Title'
  );

  private static $default_sort='SortOrder';

  public function getCMSFields_forPopup() {
    // Profile picture field
    $thumbField = new UploadField('SponsorLogo', 'Logo');
    $thumbField->allowedExtensions = array('jpg', 'png', 'gif');

    return new FieldList(
      new TextField('Title', 'Title'),
      new TextField('Website', 'Website URL (including http://)'),
      $thumbField
    );

  }
}