
<div id="main-content">
<div id="content-header"></div>
<div id="content-body-interior" class="typography">

<div id="sidebar">
<% include SideNavigationSimple %>
</div><!--end sidebar -->

<div id="interior-content">

<div id="breadcrumbs">$Breadcrumbs </div>

<h1>$Title</h1>
$Content
<% if ContentImage %>

<a href="$ContentImage.URL" target="_blank"><img src="<% control ContentImage %><% control SetWidth(386) %> $URL <% end_control %><% end_control %>" alt="$Title" id="merch-item-image" /></a>

<% end_if %> 


$MerchReserveForm

</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->
<div id="content-bottom"></div>

</div><!--end main-content-->

