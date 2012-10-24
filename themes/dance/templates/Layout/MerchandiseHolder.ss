

	<!-- Begin JavaScript -->
	<script type="text/javascript" src="$BaseHref/mysite/code/javascript/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="$BaseHref/mysite/code/javascript/jquery.coda-slider-2.0.js"></script>
		 <script type="text/javascript">
			$().ready(function() {
				$('#coda-slider-1').codaSlider();
			});
		 </script>
	<!-- End JavaScript -->
	
	
	
<div id="main-content">
<div id="content-header"></div>
<div id="content-body-interior" class="typography">

<div id="sidebar">
<% include SideNavigationSimple %>
</div><!--end sidebar -->

<div id="interior-content">

<div id="breadcrumbs">$Breadcrumbs </div>

$reserveSuccessMessage
<h1>$Title</h1>
$Content
	<% control Children %>	
<div class="merch" id="pos$Pos">

<h3><a href="$Link">$Title</a></h3>
<a href="$Link"><img src="<% control ContentImage %><% control SetWidth(200) %> $URL <% end_control %><% end_control %>" alt="$Title"/></a>
</div>
<% end_control %>


<div style="clear: left;"></div>

$Form
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->
<div id="content-bottom"></div>

</div><!--end main-content-->


