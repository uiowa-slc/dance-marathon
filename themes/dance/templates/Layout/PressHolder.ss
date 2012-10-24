

<div id="main-content">
<div id="content-header"></div>

<div id="content-body-interior" class="typography">

<% include Sidebar %>

<div id="content">



<br />
<h1>$Title</h1>


<div class="news-page">
<div id="news">




<ul>
<% control allChildren %>
<li>

<h2><a href="$Link">$Title</a></h2>
<% if PressLink %><p class="date"><a href="$PressLink">$PressLink</a></p><% end_if %> 

<span class="more">
<a href="$Link">More</a>
</span>
</li>
<% end_control %>
</ul>

</div>
<!--end news-->




</div>



<div class="clear"></div>
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->

<div id="content-bottom"></div>

</div><!--end main-content-->

