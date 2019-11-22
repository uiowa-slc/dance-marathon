<?php


class FamilyHolder extends Page {

	private static $db = array(
	);

	private static $has_one = array(
	);
	private static $allowed_children = array(
		'FamilyMember'
	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$fields->removeByName("Metadata");
		return $fields;

	}

}
