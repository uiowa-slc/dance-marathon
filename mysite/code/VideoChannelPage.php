<?php
class VideoChannelPage extends Page {

	private static $db = array(
	);

	

}
class VideoChannelPage_Controller extends Page_Controller {

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
	private static $allowed_actions = array (
	);

	public function init() {
		parent::init();
		// You can include any CSS or JS required by your project here.
		// See: http://doc.silverstripe.org/framework/en/reference/requirements
	}


	public function getYouTubeVideos(){
		 $youtube = new Madcoda\Youtube(array('key' => 'AIzaSyCrd_zPTxCP8OcEx9t4WkTyIdx5Nh5MLVM'));
		 $videosList = $youtube->getPlaylistItemsByPlaylistId('UU_oZdt6ePqTGW-p4UR5dvkw');
		 //convert standard objects to a readable array
		 $videos = json_decode(json_encode($videosList), true);
		 $videoList = new ArrayList();

		 foreach ($videos as $n) {
			$video = new YoutubeVideo();
		 	$video->Title = $n['snippet']['title'];
		 	$video->UrlSegment = $n['snippet']['resourceId']['videoId'];
		 	$video->ThumbnailUrl = $n['snippet']['thumbnails']['high']['url'];


		 	$videoList->push(array(

				 	'Title' => $video->Title,
				 	'UrlSegment' => $video->UrlSegment,
				 	'ThumbnailUrl' =>$video->ThumbnailUrl
		 		));
		 }
		 
		 return $videoList;

		 // foreach($n as $videos){
		 // 	$video = new YouTubeVideo();
		 // 	$video->Title = $videos[$n]['snippet']['Title'];
		 // 	$videoList->push($video);
		 // }
	   	//return new DataList($videos);
	}

}
