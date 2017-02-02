<?php
class HomePage extends Page {

	private static $db = array(
		"Quicklinks" => "HTMLText",
		'Countdown' => 'Boolean',
		'CountdownDate' => 'Date',

		'EnableStream' => 'Boolean',
		'StreamHeader' => 'Text',
		'StreamCode' => 'Text'
	);

	private static $has_one = array(
	);
	private static $has_many = array(
		'Videos' => 'Video',
		'Testimonials' => 'Testimonial'
	);
	private static $allowed_children = array(

	);

	public function CountownDateOneDayAfter(){
	/*	$countdownDate = $this->CountdownDate;

		$countdownDateYear = $countdownDate->Format('Y');
		$countdownDateMonth = $countdownDate->Format('m');
		$countdownDateDay = $countdownDate->Format('d');

		$nextDate = $this->CountdownDate->next_day($countdownDateYear, $countdownDateMonth, $countdownDateDay);

		$nextDateObject = new Date($nextDate);

		return $nextDateObject;

*/

	}

	public function getCMSFields(){
		$fields = parent::getCMSFields();
		DateField::set_default_config('showcalendar', true);
		$fields->removeByName("Photo");

		$fields->addFieldToTab('Root.Countdown', new CheckboxField('Countdown','Show the Countdown? (Yes)'));
		$fields->addFieldToTab('Root.Countdown', new DateField('CountdownDate', 'Enter a date'));
		$fields->addFieldToTab("Root.Main", new HTMLEditorField("Quicklinks", "Quick Links"));


		$fields->addFieldToTab('Root.Stream', new CheckboxField('EnableStream','Enable the live stream video'));
		$fields->addFieldToTab("Root.Stream", new TextField("StreamHeader", 'Stream Header (optional, defaults to: "Livestream from the IMU:")'));
		$fields->addFieldToTab("Root.Stream", new TextField("StreamCode", 'Stream Code (optional, defaults to: JW player from ITS 2017)"></script>)' ));

		$testimonialGridFieldConfig = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	      new GridFieldAddNewButton('toolbar-header-right'),
	      new GridFieldSortableHeader(),
	      new GridFieldDataColumns(),
	      new GridFieldPaginator(10),
	      new GridFieldEditButton(),
	      new GridFieldDeleteAction(),
	      new GridFieldDetailForm()
		);
		$videoGridFieldConfig = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	      new GridFieldAddNewButton('toolbar-header-right'),
	      new GridFieldSortableHeader(),
	      new GridFieldDataColumns(),
	      new GridFieldPaginator(10),
	      new GridFieldEditButton(),
	      new GridFieldDeleteAction(),
	      new GridFieldDetailForm()
		);
		$gridField = new GridField("Videos", "Youtube Videos:", $this->Videos(), $videoGridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		$gridField = new GridField("Testimonials", "Testimonials:", $this->Testimonials(), $testimonialGridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		return $fields;

	}

    public function getOpenGraph_image() {

    	if($this->EnableStream){
    		return Director::absoluteBaseURL().'themes/dance-marathon/images/og-stream.jpg';
    	}

        $im = $this->owner->getOpenGraphImage();

        if($im) {
            return $im->AbsoluteURL;
        }
    }    
    public function getOpenGraph_image_height() {
    	if($this->EnableStream){
    		return '630';
    	}
        $im = $this->owner->getOpenGraphImage();
        if($im && $im->exists()) {
            return $im->Height;
        }
    }
    
    public function getOpenGraph_image_width() {
    	if($this->EnableStream){
    		return '1200';
    	}
        $im = $this->owner->getOpenGraphImage();
        if($im && $im->exists()) {
            return $im->Width;
        }
    }
    // public function getOpenGraph_video() {
    //     return 'https://dancemarathon.uiowa.edu/themes/dance-marathon/images/dm_video.mp4';
    // }

    // public function getOpenGraph_video_secure_url() {
    //     return 'https://dancemarathon.uiowa.edu/themes/dance-marathon/images/dm_video.mp4';
    // }
    // public function getOpenGraph_video_width() {
    //     return '960';
    // }
    // public function getOpenGraph_video_height() {
    //     return '540';
    // }
    // public function getOpenGraph_video_type(){
    // 	return 'video/mp4';
    // }
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
