<?php

class SiteConfigExtension extends DataExtension {

	private static $db = array(
		'TwitterLink' => 'Text',
		'FacebookLink' =>'Text',
		'FlickrLink' =>'Text',
		'InstagramLink' =>'Text',
		'YoutubeLink' =>'Text',
		'PinterestLink' =>'Text',
		'WordpressLink' =>'Text',
		'Address1' =>'Text',
		'Phone' =>'Text',
		'Email' =>'Text',
	);

	private static $has_one = array(
		'DefaultOpenGraphImage' => 'Image',
	);

	public function updateCMSFields(FieldList $fields){
		$fields->addFieldToTab('Root.Main', new TextField('TwitterLink', 'Twitter Account URL'));
		$fields->addFieldToTab('Root.Main', new TextField('FacebookLink', 'Facebook Account URL'));
		$fields->addFieldToTab('Root.Main', new TextField('FlickrLink', 'Flickr Account URL'));
		$fields->addFieldToTab('Root.Main', new TextField('YoutubeLink', 'YouTube Account URL'));
		$fields->addFieldToTab('Root.Main', new TextField('InstagramLink', 'Instagram Account URL'));
		$fields->addFieldToTab('Root.Main', new TextField('PinterestLink', 'Pinterest Account URL'));
		$fields->addFieldToTab('Root.Main', new TextField('WordpressLink', 'Wordpress Account URL'));
		$fields->addFieldToTab('Root.Main', new TextField('Address1', 'Address'));
		$fields->addFieldToTab('Root.Main', new TextField('Phone', 'Phone Number'));
		$fields->addFieldToTab('Root.Main', new TextField('Email', 'Email'));
        $fields->addFieldsToTab('Root.Main', array(
            HeaderField::create('', 'Open Graph'),
            UploadField::create('DefaultOpenGraphImage', 'Default Facebook Share Image (1200 x 630)')
        ));
		return $fields;

	}

}
class SiteConfigExtensionPage_Controller extends Page_Controller {

	public function init() {
		parent::init();
	}

}