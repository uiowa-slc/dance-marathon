

<div id="main-content">
<div id="content-header"></div>
<div id="content-body-interior" class="typography">

<div id="sidebar">
<% include SideNavigationSimple %>
</div><!--end sidebar -->

<div id="content">

<div id="breadcrumbs">$Breadcrumbs </div>




<h1>$Title</h1>


<% control Children %>

<div class="profile-holder">

<img src="<% control FeatureImage %><% control SetWidth(157) %> $URL <% end_control %><% end_control %>" alt="$Title"/>
<h4><a href="$Link">$Title</a></h4>
<p class="description">$ProfileDescription</p>


</div>
<% end_control %>



$Content
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->
<div id="content-bottom"></div>

</div><!--end main-content-->


