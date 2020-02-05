<?php

use SilverStripe\Forms\TextField;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Control\Controller;
use SilverStripe\Blog\Model\Blog;
use SilverStripe\Security\Permission;
use SilverStripe\ORM\DataObject;
use SilverStripe\Blog\Model\CategorisationObject;
use SilverStripe\ORM\ArrayList;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use UndefinedOffset\SortableGridField\Forms\GridFieldSortableRows;
use SilverStripe\Forms\GridField\GridField;
/**
 * A department for keyword descriptions of a job listing location.
 *
 * @package silverstripe
 * @subpackage blog
 *
 * @method Blog Blog()
 *
 * @property string $Title
 * @property string $URLSegment
 * @property int $BlogID
 */

class SponsorType extends DataObject
{

    private static $db = array(
        'Title' => 'Varchar(255)',
        'SortOrder'=>'Int'
    );

    private static $has_one = array(
        'SponsorHolderPage' => 'SponsorHolderPage'
    );

    private static $has_many = array(
        'Sponsors' => 'SponsorEntry'
    );

    private static $default_records = array(
        ['Title' => 'Monetary Sponsors',
         'SponsorHolderPageID' => 25,
         'SortOrder' => 0
     ],
        ['Title' => 'In-Kind Donors',
         'SponsorHolderPageID' => 25,
        'SortOrder' => 1],
        ['Title' => 'Community Days',
         'SponsorHolderPageID' => 25,
        'SortOrder' => 2]
    );
    private static $default_sort = 'SortOrder';
    
    public function getCMSFields() {
        // Profile picture field

        $sponsorHolder = $this->SponsorHolderPage();

        $gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
        $gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
        $gridField = new GridField("Sponsors", "Sponsors", $this->Sponsors(), $gridFieldConfig);
        

        return new FieldList(
          new TextField('Title', 'Title')
          // $gridField

        );

    }
 
}
