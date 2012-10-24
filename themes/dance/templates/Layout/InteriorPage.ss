

<div id="main-content">
<div id="content-header"></div>
<div id="content-body-interior" class="typography">

<% include Sidebar %>

<div id="interior-content">

<div id="breadcrumbs">$Breadcrumbs </div>


<% if ContentImage %>
<div class="image">
<img src="<% control ContentImage %><% control SetWidth(386) %> $URL <% end_control %><% end_control %>" alt="$Title"/>
<% if ImageCaption %>
<p>$ImageCaption.LimitWordCount(8)</p>
<% end_if %> 

</div>
<% end_if %> 

<h1>$Title</h1>



$Content
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->
<div id="content-bottom"></div>

</div><!--end main-content-->


