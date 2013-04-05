

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

<% include Sidebar %>

<div id="content">




<br />
<h1>$Title</h1>

<div class="feature-image"  style="background: url(<% control ContentImage.SetWidth(700) %>$Filename<% end_control %>) no-repeat 0px 0px;">

<div class="quote">
$DancersQuote

</div>

</div><!--end feature image-->




<h2>Why Dance?</h2>

<div class="quadrant" id="pos1">
<h3>It's a Great<br /> Social Opportunity</h3>
<ul>
<li>As a first year student you will be able to meet lots of people.</li>
<li>Each Dancer is assigned a Morale Group, where they will meet fellow dancers.</li>
<li>Can make life long friends.</li>
</ul>
</div>

<div class="quadrant" id="pos2">
<h3>Fulfill Your<br /> Civic Duty</h3>
<ul>
<li>Show employers that you are community service minded.</li>
<li>Be a part of an organization that makes a difference.</li>
<li>You'll be helping kids who need it most.</li>
</ul>
</div>


<div class="quadrant" id="pos3">
<h3>Leadership<br /> Opportunities</h3>
<ul>
<li>Leadership roles for every major.</li>
<li>Gain valuable experience that employers are looking for.</li>
<li>Looks great on your resume.</li>
</ul>
</div>

<!--<div class="quadrant" id="pos4">
<h3>It's What You Make It</h3>
<img class="right" src="$ThemeDir/images/thumbnail.jpg" alt="Dance Marathon" title="Dance Marathon" longdesc="http://dancemarathon.org" />
<ul>
<li>You can be as involved as you like.</li>
<li>Fulfills the new initiative, Pick One, which calls for every first year student to get involved with one organization.</li>
<li>Dance Marathon is Fun!</li>
</ul>
</div>-->

<% if ChildrenOf(merchandise) %>
<div class="wrapper">
<h2 class="orange"><a href="/merchandise">Merchandise</a></h2>
<div class="merchandise">
	

<div class="coda-slider-wrapper">
	<div class="coda-slider preload" id="coda-slider-1">
	
	
	<% control ChildrenOf(merchandise) %>	

			<div class="panel">
			<div class="panel-wrapper">
			
<img src="<% control ContentImage %><% control SetWidth(300) %> $URL <% end_control %><% end_control %>" alt="$Title"/>

			</div>
			
		
		</div>
		
	<% end_control %>
	
		
	</div><!-- .coda-slider -->
</div><!-- .coda-slider-wrapper -->

	
		<!--<a href="/merchandise"><img class="right" src="$ThemeDir/images/reserve.png" alt="Reserve Now"/></a>
		<p>Check out our new merchandise and old favorites and reserve yours to pick up at the first dancer meeting!  </p>-->
		<p>Merchandise is coming soon!</p>
			
</div><!--end merchandise-->

</div>
<% end_if %>


<div class="wrapper">
<h2><a href="/news">Announcements</a></h2>

<div id="news">




<ul>
<% control News %>
<% if NewsType = Families %>

<% else %>
<li>
<h3><a href="$Link">$Title</a></h3>

$getSummaryHTML
<span class="more">
<a href="$Link">More</a>
</span>
</li>
<% end_if %>
<% end_control %></ul>


</div>
<!--end news-->


</div>



<div class="wrapper">
<h2 class="orange">Video</h2>

<div class="merchandise green">


<object width="442" height="306"><param name="movie" value="http://www.youtube.com/p/A19EB886D14CD834?hl=en_US&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/p/A19EB886D14CD834?hl=en_US&fs=1" type="application/x-shockwave-flash" width="442" height="306" allowscriptaccess="always" allowfullscreen="true"></embed></object>



</div></div>






<div class="clear"></div>
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->

<div id="content-bottom"></div>

</div><!--end main-content-->

