<?php

class Page extends SiteTree {
	
	public static $db = array(
	);
	
	public static $has_one = array(
	);
	
	  /*
   * limits words to a number, but tries to validate the code
   */
   public function getSummaryHTML ($ContentArea='Content', $limit = 10){
      $m = 0;
      $addEplisis = '';
      $returnstr = '';
      $returnArray = array();
      $html = array();
      $chars = preg_split('/(<[^>]*[^\/]>| )/i', $this->$ContentArea, -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
      foreach ($chars as $elemnt) {
         // found start tag
         if(preg_match('/^<(p|h1|h2|h3|h4|h5|h6|q|b|i|strong|em)(.*)>$/', $elemnt)){
            preg_match('/^<(p|h1|h2|h3|h4|h5|h6|q|b|i|strong|em)(.*)>$/', $elemnt, $matches);
            array_push($html, $matches[1]);// convert <p class=""> to p
            array_push($returnArray, $elemnt);
            // found end tag
         } else if(preg_match('/^<\/(p|h1|h2|h3|h4|h5|h6|q|b|i|strong|em)(.*)>$/', $elemnt)){
            preg_match('/^<\/(p|h1|h2|h3|h4|h5|h6|q|b|i|strong|em)(.*)>$/', $elemnt, $matches);
            $testelement = array_pop ($html);
            // match (ie: <p>etc</p>)
            if($testelement==$elemnt[1]) array_pop($html);
            array_push($returnArray, $elemnt);
         } else {
            // done
            if($elemnt == ' ') continue;
            array_push($returnArray, $elemnt);
            $m++;
            if($m > $limit) {
               $addEplisis = '&hellip;';
               break;
            }
         }
      }
      // convert start tags to end tags
      $tmpr = '';
      foreach ($html as $elemnt) {
         $tmpr.='</'.$elemnt.'>';
      }
      return implode($returnArray, ' ') . $addEplisis . $tmpr;
   }
	
}

	


class Page_Controller extends ContentController {
	
	public function init() {
		parent::init();

		// Note: you should use SS template require tags inside your templates
		// instead of putting Requirements calls here.  However these are
		// included so that our older themes still work
		Requirements::themedCSS("form"); 
	}
	
		function Home($limit=4) {
		$set = DataObject::get("HomePageTab", null, null, null, $limit);
		
		return $set;
	}
	
	function Events($limit=3) {
		$set = DataObject::get("EventsPage", null, null, null, $limit);
		
		return $set;
	}
	
	
		function News($limit=2) {
		$set = DataObject::get("NewsPage", null, "Sort ASC", null, $limit);
		
		return $set;
	}
	
			function Profiles ($limit=1) {
		$set = DataObject::get("ProfilePage", null, null, null, $limit);
		
		return $set;
	}
	
	function Dancers($limit=1){
		
		
		$set = DataObject::get("ProfilePage", "ParentID = 31", null, null, $limit);
		return $set;
		
		
	}
	
		function Families($limit=1){
		
		
		$set = DataObject::get("ProfilePage", "ParentID = 33", null, null, $limit);
		return $set;
		
		
	}
	
		function Leadership($limit=1){
		
		
		$set = DataObject::get("ProfilePage", "ParentID = 35", null, null, $limit);
		return $set;
		
		
	}

		function NotHomePage(){
		
		if($this->URLSegment == 'home'){
			return false;
		}else{
			return true;
		}
		
		
	}
	
	/**
	 * Site search form 
	 */ 
	function SearchForm() {
		$searchText = isset($_REQUEST['Search']) ? $_REQUEST['Search'] : '';
		$fields = new FieldSet(
	      	new TextField("Search", "", $searchText)
	  	);
		$actions = new FieldSet(
	      	new FormAction('results', 'Search')
	  	);

	  	return new SearchForm($this, "SearchForm", $fields, $actions);
	}
	
	/**
	 * Process and render search results
	 */
	function results($data, $form){
	  	$data = array(
	     	'Results' => $form->getResults(),
	     	'Query' => $form->getSearchQuery(),
	      	'Title' => 'Search Results'
	  	);

	  	return $this->customise($data)->renderWith(array('Page_results', 'Page'));
	}
	
	public function Countdown(){
		$future = strtotime('4 February 2011');
		$now = time();
		$timeleft = $future-$now;
		$daysleft = round((($timeleft/24)/60)/60);
		
		return $daysleft; 
	
	}
	
	
}

?>