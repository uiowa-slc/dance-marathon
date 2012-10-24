<?php
/**
 * Defines the HomePage page type
 */
 
class MerchandiseItem extends Page {
 static $db = array(
					
		"HasSizes" => "Boolean"


  
);
   static $has_one = array(
   
  	'ContentImage' => 'Image'
 
   );
   
   function getCMSFields() {
   $fields = parent::getCMSFields();
   


    		$fields->addFieldToTab('Root.Content.Images', new ImageField('ContentImage', 'Event Image 300x200 pixels'));
			$fields->addFieldToTab('Root.Content.Main',    new CheckboxField(
   $name = "HasSizes",
   $title = "Show available sizes for this item?"
));

   return $fields;
}


}
 
class MerchandiseItem_Controller extends Page_Controller {
	
	public function init() {
		parent::init();
	}
	
	
	function MerchReserveForm() {
		
		$sizes = array(
					 "S"=>"S",
					 "M"=>"M",
					 "L"=>"L",
					 "XL" => "XL",
					 "XXL" => "XXL");
		
		$fields = new FieldSet(
			new HiddenField("ItemName","Item Name",$this->Title));
		
		if($this->HasSizes == 1){
			$fields->push(
			 new DropdownField(
                 $name = "Size",
                 $title = "Size",
                 $source = $sizes,
                 $value = "test1"
            ));
		}
			$fields->push(
			new TextField("Quantity","Quantity", null, 3));
			$fields->push(new TextareaField("UserInfo", "Contact Information", $rows = 6, $columns = 20, $value = Session::get("UserInfo")));
			$fields->push(new LabelField("Contact","Please include your name, phone number, and intended purchasing date in the contact information field. This information will be saved for future reservations for the next few hours."));
		
		$actions = new FieldSet(new FormAction("reserveAction", "Reserve!"));
		
		 $requiredFields = new RequiredFields(
           "Size","Quantity","UserInfo"
        );
		 
		$form = new Form($this, "MerchReserveForm", $fields, $actions, $requiredFields);
		SpamProtectorManager::update_form($form, null, array('Size', 'Quantity', 'Contact', 'UserInfo'));
		return $form;
}

	public function reserveAction($data, $form){
		
		$reservedItem = new ReservedItem();
		$form->saveInto($reservedItem);
		
		$reservedItem->write();
		
		//$reservedItems = DataObject::get("ReservedItem");
		//print_r($reservedItem);
		
		Session::set("UserInfo", $reservedItem->UserInfo);
		
		  Director::redirect($this->getParent()->Link() . "?success=1&item=".$this->ID); 
		
	}
		

	
}
?>