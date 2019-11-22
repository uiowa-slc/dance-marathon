<?php

use SilverStripe\ORM\DataObject;

class YoutubeVideo extends DataObject {

	private static $db = array(
		'Title' => 'Text',
		'UrlSegment' => 'Text',
		'ThumbnailUrl' => 'Text'
	);

	

}
