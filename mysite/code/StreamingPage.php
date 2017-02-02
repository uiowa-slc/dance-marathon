<?php
class StreamingPage extends Page {

	private static $db = array(
	);

	private static $has_one = array(
	);
	private static $has_many = array(

	);
	private static $allowed_children = array(

	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();


		return $fields;

	}
    public function getOpenGraph_image() {

    		return Director::absoluteBaseURL().'themes/dance-marathon/images/og-stream.jpg';

    }    
    public function getOpenGraph_image_height() {
    		return '630';
    }
    
    public function getOpenGraph_image_width() {
    		return '1200';
    }
}
class StreamingPage_Controller extends Page_Controller {

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
