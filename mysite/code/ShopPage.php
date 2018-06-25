<?php
class ShopPage extends Page {

	private static $db = array(
		"SecondaryContent" => "HTMLText",
	);

	private static $has_one = array(

	);
	private static $has_many = array(
		'ShopItems' => 'ShopItem',
		'Items' => 'Item',
	);
	private static $allowed_children = array(

	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$fields->removeByName("Metadata");

		// Shop items grid field - to buy
		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("ShopItems", "Items For Sale:", $this->ShopItems(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		// Content
		$fields->addFieldToTab("Root.Main", new HTMLEditorField("SecondaryContent", "Content"));

		// Shop items grid field - not to buy
		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("Items", "Items Not For Sale:", $this->Items(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		return $fields;


	}

}
class ShopPage_Controller extends Page_Controller {

	/**
	 * An array of actions that can be accessed via a request. Each array element should be an action name, and the
	 * permissions or conditions required to allow the user to access it.
	 *
	 * <code>
	 * array (
	 *     'action', // anyone can access this action
	 *     'action' => true, // same as above
	 *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
	 *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
	 * );
	 * </code>
	 *
	 * @var array
	 */

	public function init() {
		parent::init();
		// You can include any CSS or JS required by your project here.
		// See: http://doc.silverstripe.org/framework/en/reference/requirements
	}

}
