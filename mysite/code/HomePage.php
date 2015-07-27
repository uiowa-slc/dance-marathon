<?php
class HomePage extends Page {

	private static $db = array(
		"Quicklinks" => "HTMLText"
	);

	private static $has_one = array(
	);
	public static $has_many = array(
		'Videos' => 'Video',
		'Testimonials' => 'Testimonial'
	);
	private static $allowed_children = array(

	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();
		$fields->removeByName("Photo");

		$fields->addFieldToTab("Root.Main", new HTMLEditorField("Quicklinks", "Quick Links"));

		$gridFieldConfig = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	      new GridFieldAddNewButton('toolbar-header-right'),
	      new GridFieldSortableHeader(),
	      new GridFieldDataColumns(),
	      new GridFieldPaginator(10),
	      new GridFieldEditButton(),
	      new GridFieldDeleteAction(),
	      new GridFieldDetailForm()
		);

		$gridField = new GridField("Videos", "Youtube Videos:", $this->Videos(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		$gridField = new GridField("Testimonials", "Testimonials:", $this->Testimonials(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		return $fields;

	}

}
class HomePage_Controller extends Page_Controller {

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
