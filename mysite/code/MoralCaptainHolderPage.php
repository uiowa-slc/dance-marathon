<?php

class MoralCaptainHolderPage extends Page {

	private static $db = array(
	);

	private static $has_one = array(
	);
	private static $allowed_children = array(
		'MoralCaptain'
	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$fields->removeByName("Metadata");
		return $fields;

	}

}
