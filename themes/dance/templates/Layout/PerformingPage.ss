 <% include Sidebar %>

<div id="content" class="typography">

<style type="text/css">

.content-image {

	background: url(
	
	<% control ContentImage.SetWidth(354) %>
	
	$Filename
	
	<% end_control %>
	) no-repeat 0px 12px;
}

</style>

<% if ContentImage %>
 
<div class="content-image">
<div class="content-image-mask"></div>
</div><% end_if %> 

<h1>$Title</h1>

<p>$Content</p> 




</div>

<div class="clear"></div>
<div id="content-bottom"></div>
</div><!--/end content wrapper div -->