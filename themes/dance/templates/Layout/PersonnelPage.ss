<style type="text/css">

#rotate {background:url($BaseHref/themes/dance/images/interior-background.jpg) no-repeat scroll 50% 0;}
</style>

<div id="main-content">
<div id="content-header"></div>
<div id="content-body-interior" class="typography">

<% include Sidebar %>

<div id="interior-content">

<div id="breadcrumbs">$Breadcrumbs </div>


<h1>$Title</h1>

<ul class="personnel">
<% control Children %>	
<li>
<img src="<% control ContentImage %><% control SetWidth(100) %> $URL <% end_control %><% end_control %>" alt="$Title"/>
<p class="name"><a href="$Link">$Title</a></p>
<p class="title">$PersonnelTitle</p>
<p><a hrf="mailto:$PersonnelEmail">$PersonnelEmail</a></p>
</li>
<% end_control %>
</ul>
	


$Content
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->
<div id="content-bottom"></div>

</div><!--end main-content-->


