

<div id="main-content">
<div id="content-header"></div>
<div id="content-body-interior" class="typography">

<div id="sidebar">
<% include SideNavigationSimple %>
</div><!--end sidebar -->

<div id="interior-content">

<div id="breadcrumbs">$Breadcrumbs </div>


<h1>$Title</h1>

<ul class="personnel">
<% control Children %>	
<li>
<img src="<% control ContentImage %><% control SetWidth(100) %> $URL <% end_control %><% end_control %>" alt="$Title"/>
<p class="name">$Title</p><br />
<p class="title">$PersonnelTitle</p><br />
<p><a href="mailto:$PersonnelEmail">$PersonnelEmail</a></p>
</li>
<% end_control %>
</ul>
	


$Content
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->
<div id="content-bottom"></div>

</div><!--end main-content-->


