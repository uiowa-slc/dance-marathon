<?php

use SilverStripe\Control\Director;

class StreamingPage extends Page {

	private static $db = array(
	);

	private static $has_one = array(
	);
	private static $has_many = array(

	);
	private static $allowed_children = array(

	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		$fields->removeByName("Photo");

		return $fields;

	}
	public function getOpenGraph_image() {

		return Director::absoluteBaseURL() . 'themes/dance-marathon/images/og-stream2.jpg';

	}
	public function getOpenGraph_image_height() {
		return '630';
	}

	public function getOpenGraph_image_width() {
		return '1200';
	}
	public function urlsToCache() {
		$urls = array();

		$urls[Director::absoluteURL($this->Link())] = 0;
		$urls[Director::absoluteURL($this->Link()) . '/full'] = 0;

		return $urls;
	}
}
