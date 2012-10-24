 <% include Sidebar %>




<div id="content" class="typography">

<h1>$Title</h1>

$Content

<div class="get_involved">
<% control Children %>


<div class="event-box">

<% if ContentImage %>
 
<div class="event-image" style="background: url(<% control ContentImage.SetWidth(240) %>$Filename<% end_control %>) no-repeat 0px 0px;"><div class="event-image-mask"></div></div>
<% end_if %> 

<h2><a href="$Link">$Title</a></h2>

<p>$Content.LimitWordCount(30)</p> 
<span class="more">
<a href="$Link">Read More</a>
</span>
</div>
<% end_control %>
</div>

</div>

<div class="clear"></div>
<div id="content-bottom"></div>
</div><!--/end content wrapper div -->
    
   