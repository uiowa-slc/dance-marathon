
<div id="main-content">
<div id="content-header"></div>



<div id="content-body-interior" class="typography">

<% include Sidebar %>

<div id="content">



<!--<div class="quote-sponsors">
<a href="$BaseHref/sponsors/where-does-the-money-go/"><img src="$ThemeDir/images/sponsors-home.png" alt="Where does the money go?" title="Where does the money go?" longdesc="http://dancemarathon.org" /> </a></div>-->
<br />
<h1>$Title</h1>


<div id="sponsors-header">

<h2 class="underline"><a href="$Link">Why sponsor Dance Marathon?</a></h2>

<ul class="sponsors">
<li><strong>DM reaches</strong> over 29,745 students, 6,000 hospital staff and patients, nearly 400 families and is actively participating in lots of community events.<br /><a href="$BaseHref/sponsors/who-does-dm-reach/">Read More</a></li>
<li><strong>Numerous ways</strong> to get involved: gifts, in-kind, Dancer Incentive Program, community events ... You can choose the one works best for you!<br /><a href="$BaseHref/sponsors/ways-to-get-involved/"/>Read More</a></li>
<li><strong>Sponsorship levels</strong> give DM sponsors great flexibility - from $500 WISH to $15,000 MIRACLE, choose your level today!<br /><a href="$BaseHref/sponsors/sponsorship-levels/">Read More</a></li>
</ul>

<h3><a href="/home/contact-us">Contact</a> us if you would like to be a sponsor!</h3>
</div><!--end sponsors header-->






<div class="column2">

<h2 class="underline">Current Sponsors</h2>

<h3>Thanks to our Major Sponsors</h3>
<br />
<div id="sponsors-box">
<% control ChildrenOf(Sponsor-Logo-Holder) %>
<a href="$SponsorLink" target="blank"><img src="<% control ContentImage %><% control PaddedImage(150,122) %> $URL <% end_control %><% end_control %>" class="left" alt="$Title"/> </a>
<% end_control %>
<div style="clear: left"></div>
</div><!-- end sponsors-->
</div><!--end column-->

</div><!--end content-->


<% include SocialMedia %>
</div><!--end content body-->

<div id="content-bottom"></div>

</div><!--end main-content-->

