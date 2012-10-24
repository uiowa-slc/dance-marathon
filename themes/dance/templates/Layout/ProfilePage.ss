

<div id="main-content">
<div id="content-header"></div>
<div id="content-body-interior" class="typography">

<div id="sidebar">
<% include SideNavigationSimple %>
</div><!--end sidebar -->

<div id="content">

<div id="breadcrumbs">$Breadcrumbs </div>


<h1>$Title</h1>

<img class="profile-right" src="<% control FeatureImage %><% control SetWidth(257) %> $URL <% end_control %><% end_control %>" alt="$Title"/>
<p class="description">$ProfileDescription</p>

<h5>$ProfileMajor</h5>
<h5>$ProfileAge</h5>
<br />


$Content
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->
<div id="content-bottom"></div>

</div><!--end main-content-->


