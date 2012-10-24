
<div id="main-content">
<div id="content-header"></div>
<div id="content-body-interior" class="typography">

<% include Sidebar %>

<div id="interior-content">

<div id="breadcrumbs">$Breadcrumbs </div>


<% if NewsImage %>
<div class="image">
<img src="<% control NewsImage %><% control SetWidth(386) %> $URL <% end_control %><% end_control %>" alt="$Title"/>
</div>
<% end_if %> 

<h1>$Title</h1>

<% if NewsDate %><p class="date">$NewsDate</p><% end_if %> 
<% if NewsLocation %><p class="location">$NewsLocation</p><% end_if %> 
$Content
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->
<div id="content-bottom"></div>

</div><!--end main-content-->
