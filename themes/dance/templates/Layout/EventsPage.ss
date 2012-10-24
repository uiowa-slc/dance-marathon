 <% include Sidebar %>
    
<div id="content" class="typography">



<% if EventImage %>

<div class="content-image" style="background: url(<% control EventImage.SetWidth(354) %>$Filename<% end_control %>) no-repeat;">
<div class="content-image-mask"></div>
</div>

<% end_if %> 




<h1>$Title</h1>
<p class="event">
<% if EventDate %><strong>Performing:</strong> $EventDate.Format(F d&#44; Y), $EventTime<br /><% end_if %> 
<% if Location %><strong>Location:</strong> $Location<br /><% end_if %> 
<% if EventAges %><strong>Recommended For:</strong> $EventAges<br /><% end_if %> 
<% if EventWebsite %><strong>Website:</strong>  <a href="$EventWebsite" target="_blank">$EventWebsite</a><% end_if %> </p>
<p>$Content</p> 



</div>

<div class="clear"></div>
<div id="content-bottom"></div>
</div><!--/end content wrapper div -->