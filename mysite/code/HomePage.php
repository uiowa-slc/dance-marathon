<?php

use SilverStripe\Forms\DateField;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Assets\File;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\GridField\GridField;
use UndefinedOffset\SortableGridField\Forms\GridFieldSortableRows;
class HomePage extends Page {

	private static $db = array(
		"Quicklinks" => "HTMLText",
		"ContentFull" => "HTMLText",
		'EnableStream' => 'Boolean',
		'StreamHeader' => 'Text',
		'StreamCode' => 'Text'
	);

	private static $has_one = array(
        'BgVideo' => File::class,
    );
    
	private static $has_many = array(
		'Videos' => 'Video',
		'Familys' => 'Family',
		'Testimonials' => 'Testimonial'
    );
    
    private static $owns = array(
		'BgVideo'
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
		$fields->removeByName("Photo");

		$fields->addFieldToTab("Root.Main", HTMLEditorField::create("ContentFull", "Full Width Content")->addExtraClass('stacked'));

        $fields->addFieldToTab("Root.Main", HTMLEditorField::create("Quicklinks", "Quick Links")->addExtraClass('stacked'));
        
        $fields->addFieldToTab('Root.Main', new UploadField('BgVideo', 'Upload Background Video'), 'Content');


		$fields->addFieldToTab('Root.Stream', new CheckboxField('EnableStream','Enable the live stream video'));
		$fields->addFieldToTab("Root.Stream", new TextField("StreamHeader", 'Stream Header (optional, defaults to: "Livestream from the IMU:")'));
		$fields->addFieldToTab("Root.Stream", new TextareaField("StreamCode", 'Stream Code (optional, defaults to: JW player from ITS 2017)"></script>)' ));


		// $videoGridFieldConfig = GridFieldConfig::create()->addComponents(
	 //      new GridFieldToolbarHeader(),
	 //      new GridFieldAddNewButton('toolbar-header-right'),
	 //      new GridFieldSortableHeader(),
	 //      new GridFieldDataColumns(),
	 //      new GridFieldPaginator(10),
	 //      new GridFieldEditButton(),
	 //      new GridFieldDeleteAction(),
	 //      new GridFieldDetailForm()
		// );
		// $gridField = new GridField("Videos", "Youtube Videos:", $this->Videos(), $videoGridFieldConfig);
		// $fields->addFieldToTab("Root.Main", $gridField);

		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("Videos", "Youtube Videos:", $this->Videos(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);


		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("Familys", "Family Spotlight:", $this->Familys(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("Testimonials", "Testimonials:", $this->Testimonials(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		return $fields;

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