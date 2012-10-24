<?php
/**
 * Defines the HomePage page type
 */
 
class ReservedItem extends DataObject {
	
	static $db = array(
		"ItemName" => "Text",
		"Size" => "Text",
		"Quantity" => "Int",
		"UserInfo" => "Text"
	);
	 
   static $has_one = array(
   
   );

}

?>