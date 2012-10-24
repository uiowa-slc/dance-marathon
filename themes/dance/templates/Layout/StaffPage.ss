 <% include Sidebar %>
    
<div id="content" class="typography">
<style type="text/css">

.content-image {

	background: url(
	
	<% control StaffImage.SetWidth(354) %>
	
	$Filename
	
	<% end_control %>
	) no-repeat 0px 10px;
}

</style> 

<% if StaffImage %>
<div class="content-image">
<div class="content-image-mask"></div>
</div>
<% end_if %> 

<h1>$Title</h1>
<p class="event">
<% if StaffTitle %><strong>Title:</strong> $StaffTitle<br /><% end_if %>
<% if StaffEmail %><strong>Email: </strong><a href="mailto:$StaffEmail">$StaffEmail</a></p><% end_if %>
<p>$Content</p> 



</div>

<div class="clear"></div>
<div id="content-bottom"></div>
</div><!--/end content wrapper div -->