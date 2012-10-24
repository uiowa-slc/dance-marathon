<?php

class MerchandiseHolder extends Page {
	
	public static $db = array(
	
	);
	
	public static $has_one = array(
	);

static $allowed_children = array('MerchandiseItem');
	
	
function getCMSFields() {
	$fields = parent::getCMSFields();
	
	$report = new TableListField(
	  'ReservedItemTable',
	  'ReservedItem',
	  array(
			'ItemName' => 'Item Name',
			'Size' => 'Size',
			'Quantity' => 'Quantity',
			'UserInfo' => 'User Info'

		)
	);

	$report->setShowPagination(true);
	if(isset($_REQUEST['printable'])) {
		$report->setPageSize(false);
	} else {
		$report->setPageSize(50);
	}
 
	$report->setPermissions(array(
		'export',
		'delete',
		'print'
	));
 
$fields->addFieldToTab("Root.Content.Reservations", new LabelField("TableLabel", "Current Reservations"));	
$fields->addFieldToTab("Root.Content.Reservations", $report);
	
	//$fields->removeFieldFromTab("Root.Content","Content");
	
    return $fields;
	
   }	
	
}

class MerchandiseHolder_Controller extends Page_Controller {
	
	public function init() {
		parent::init();
	}
	
	public function merchItems(){
		
		$items = DataObject::get("Page");
		
		if($items){
		
		return 	items;
		
		}else{
			return false;	
		}
		
	}
	
	public function reserveSuccessMessage(){
		

		if(isset($_GET['success'])&&isset($_GET['item'])){
			$success = (int)$_GET['success'];
			$item_id = (int)$_GET['item'];
			
			
			
			$item = DataObject::get_by_id("MerchandiseItem", $item_id);

			$success_message = "<p id=\"success-message\">Successfully reserved ".$item->Title."!</p>";
			
			if(isset($item) && $success == 1){
				return $success_message;
			}else{
				
				return "An error ocurred. We're working on this. Sorry for the inconvenience!";	
			}
		}
		else{
			return null;
		}

	}
}

?>