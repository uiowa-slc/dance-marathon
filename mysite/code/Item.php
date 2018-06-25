<?php

class Item extends DataObject {

	private static $db = array(
		'Title' => 'Varchar(255)',
		'SortOrder'=>'Int'
	);

	// One-to-one relationship with parent page
	private static $has_one = array(
		'Image' => 'Image',
		'ShopPage' => 'ShopPage'
	);

	// Summary fields
	private static $summary_fields = array(
		'Title',
		'Thumbnail'

	);
	private static $default_sort='SortOrder';

	function getThumbnail() {
      return $this->Image()->CMSThumbnail();
    }

}