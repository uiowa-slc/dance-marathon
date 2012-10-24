<div id="sidebar">

<% include SideNavigation %>
<script src="$BaseHref/mysite/code/javascript/slideshow.js" type="text/javascript"></script>


<!--<div id="ftk">

<h3><a href="/">$1,058,658.16 For the Kids</a></h3>
<p>Dance Marathon provides emotional and financial support for patients and their families treated at University of Iowa Children's Hospital.</p>

</div>-->

<% if InSection(dancers) %>

<div id="slideshow">
<% control ChildrenOf(Sponsor-Logo-Holder) %>
<img src="<% control ContentImage %><% control PaddedImage(146, 119) %> $URL <% end_control %><% end_control %>" <% if First %>class="active"<% end_if %> alt="$Title"/> 
<% end_control %>
</div>

<% end_if %>


<% if InSection(families) %>

<div id="slideshow">
<% control ChildrenOf(Sponsor-Logo-Holder) %>
<img src="<% control ContentImage %><% control PaddedImage(146, 119) %> $URL <% end_control %><% end_control %>" <% if First %>class="active"<% end_if %> alt="$Title"/> 
<% end_control %>
</div>

<% end_if %>

<% if InSection(news) %>

<div id="twitter">
<ul id="twitter_update_list"></ul>
<p><a title="Follow us on Twitter" target="_blank" href="https://twitter.com/UIDM"><img src="$ThemeDir/images/twitter.png" alt="Twitter" longdesc="http://www.twitter.com" /></a>
<a title="Follow us on Twitter" target="_blank" href="https://twitter.com/UIDM">Twitter</a></p>

</div>

<script type="text/javascript" src="http://twitter.com/javascripts/blogger.js">
</script><script type="text/javascript" src="http://twitter.com/statuses/user_timeline/UIDM.json?callback=twitterCallback2&amp;count=1">
</script>

<% end_if %>




</div><!--end sidebar -->

