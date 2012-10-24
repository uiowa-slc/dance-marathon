

<% control Home(5) %>



<div <% if First %>class="ui-tabs-panel" <% else %> class="ui-tabs-panel ui-tabs-hide"<% end_if %> id="tab$Pos" style="background: url(<% control FeatureImage.SetWidth(1501) %>$Filename<% end_control %>) no-repeat scroll 50% 0;">

<div class="mask">
<div class="tab-content">

<% if ExternalLink %>
<h2><a href="$ExternalLink">$Title</a></h2><br />
<% else %>
<h2><a href="$Link">$Title</a></h2><br />
<% end_if %>



<div class="summary">
<p>$Content.Summary(25)</p>
<span class="more">
<% if ExternalLink %>
<a href="$ExternalLink">Read More</a>
<% else %>
<a href="$Link">Read More</a>
<% end_if %>
</span></div>
</div><!--end mask -->
</div><!--end tab content -->
</div><!--end tab 1 -->
<% end_control %>





<ul class="ui-tabs-nav">


<% control Home(5) %>

<li id="menu$Pos" <% if First %>class="ui-tabs-selected"<% end_if %>>
<div class="thumbs"><a href="/#tab$Pos">$Title</a></div>

</li>
<% end_control %>
</ul>


</div><!--/end rotate div -->

<div id="main-content">
<div class="col2">
<div id="news" class="typography">
<h3><a href="/news">News</a></h3>
<ul>
<% control News %>
<li>
<!-- id = $ID -->
<% if NewsImage %>
<a href="$Link"><img class="right" src="<% control NewsImage %><% control SetWidth(107) %> $URL <% end_control %><% end_control %>" alt="$Title"/></a>
<% end_if %> 
<h4><a href="$Link">$Title</a></h4>
<p class="date">$NewsDate</p>
<p class="location">$NewsLocation</p>
$getSummaryHTML(Content,30)
<span class="more"><a href="$Link">Read More</a></span></li>
<% end_control %>
</ul>

</div>
<!--end news-->
<div id="social-media">
<div id="social-media-feed">
<script charset="utf-8" src="http://widgets.twimg.com/j/2/widget.js"></script>
<script>
new TWTR.Widget({
  version: 2,
  type: 'profile',
  rpp: 1,
  interval: 30000,
  width: 300,
  height: 300,
  theme: {
    shell: {
      background: '#333333',
      color: '#ffffff'
    },
    tweets: {
      background: '#000000',
      color: '#ffffff',
      links: '#4aed05'
    }
  },
  features: {
    scrollbar: false,
    loop: false,
    live: false,
    behavior: 'all'
  }
}).render().setUser('UIDM').start();
</script>
</div>
<!--end social media feed-->
<ul>
<li><a title="Find us on Facebook" target="_blank" href="http://www.facebook.com/pages/University-of-Iowa-Dance-Marathon/34066727428?v=photos&ref=ts"><img src="$ThemeDir/images/facebook.png" alt="Facebook" longdesc="http://www.facebook.com" /></a>
<p><a title="Find us on Facebook"  target="_blank" href="http://www.facebook.com/pages/University-of-Iowa-Dance-Marathon/34066727428?v=photos&ref=ts">Facebook</a></p>
</li>
<li><a title="Subscribe to our RSS Feed" href="http://dancemarathon.uiowa.edu/news/rss"><img src="$ThemeDir/images/rss.png" alt="RSS Feed" longdesc="http://www.facebook.com" /></a>
<p><a title="Subscribe to our RSS Feed" href="http://dancemarathon.uiowa.edu/news/rss">RSS</a></p>
</li>
<li><a title="Subscribe to our Newsletter" href="https://list.uiowa.edu/scripts/wa.exe?SUBED1=DANCE-MARATHON&A=1/"><img src="$ThemeDir/images/newsletter.png" alt="Sign up for our Newsletter" longdesc="http://www.facebook.com" /></a>
<p><a title="Subscribe to our Newsletter" href="https://list.uiowa.edu/scripts/wa.exe?SUBED1=DANCE-MARATHON&A=1/">Newsletter</a></p>
</li>
<li><a title="View our photos on Flickr" target="_blank" href="http://www.flickr.com/photos/dancemarathon/"><img src="$ThemeDir/images/flickr.png" alt="Flickr" longdesc="http://www.flickr.com" /></a>
<p><a title="View our photos on Flickr" target="_blank" href="http://www.flickr.com/photos/dancemarathon/">Flickr</a></p>
</li>
<li><a title="Follow us on Twitter" target="_blank" href="https://twitter.com/UIDM"><img src="$ThemeDir/images/twitter.png" alt="Twitter" longdesc="http://www.twitter.com" /></a>
<p><a title="Follow us on Twitter" target="_blank" href="https://twitter.com/UIDM">Twitter</a></p>
</li>
</ul>
</div>
<!--end social media --></div>
<!--end co12-->
<div class="col1">
<div id="ftk">

<h3><a href="/dancers/history-tradition">$YearTotal</a></h3>
<p>Dance Marathon provides emotional and financial support for patients and their families treated at University of Iowa Children's Hospital.</p>
</div>



<!--end ftk-->
<script type="text/javascript">
//<![CDATA[
        $(function() {
                jQuery("#tabs").tabs({
                        event: 'mouseover'
                });
        });
//]]>
</script>
<div id="profiles">

<div class="ui-tabs ui-widget ui-widget-content ui-corner-all" id="tabs">
<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
<% control ChildrenOf(DM-Limelite) %>

<li id="list$Pos" <% if First %>class="ui-corner-top ui-tabs-selected ui-state-active" <% else %> class="ui-corner-top ui-state-default"<% end_if %>><a href="#tabs-$Pos" onClick="window.location.href='http://dancemarathon.uiowa.edu/home/dm-limelite/'">$MenuTitle</a></li>
<% end_control %>
</ul>

<% control Dancers %>
<div class="ui-tabs-panel ui-widget-content ui-corner-bottom" id="tabs-1" style="background: url(<% control FeatureImage.SetWidth(270) %>$Filename<% end_control %>) no-repeat scroll 200px 10px;">
<ul>


<li>

<h4><a href="$Link">$Title</a></h4>
<p class="description">$ProfileDescription</p>
<br />
<h5>$ProfileMajor</h5>
<h5>$ProfileAge</h5>
<br />
<p class="teaser">$Content.LimitWordCount(20)</p>
<span class="more"><a href="$Link">Read More</a></span></li>

</ul>
</div>
<% end_control %>

<% control Families %>
<div class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="tabs-2" style="background: url(<% control FeatureImage.SetWidth(270) %>$Filename<% end_control %>) no-repeat scroll 200px 10px;">
<ul>
<li>
<h4><a href="$Link">$Title</a></h4>
<p class="description">$ProfileDescription</p>
<br />
<h5>$ProfileMajor</h5>
<h5>$ProfileAge</h5>
<br />
<p class="teaser">$Content.LimitWordCount(20)</p>
<span class="more"><a href="$Link">Read More</a></span></li>

</ul>
</div>
<% end_control %>

<% control Leadership %>
<div class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="tabs-3" style="background: url(<% control FeatureImage.SetWidth(270) %>$Filename<% end_control %>) no-repeat scroll 200px 10px;">
<ul>

<li>

<h4><a href="$Link">$Title</a></h4>
<p class="description">$ProfileDescription</p>
<br />
<h5>$ProfileMajor</h5>
<h5>$ProfileAge</h5>
<br />
<p class="teaser">$Content.LimitWordCount(20)</p>
<span class="more"><a href="$Link">Read More</a></span></li>

</ul>
</div><!--end tabs 3-->
<% end_control %>
</div><!-- end tabs -->



<!--end profiles--></div>

<!--end col1--></div>
<div class="clear"></div>

<div class="action-links1">
<h6 class="login"><a title="Dancer Login" target="_blank" href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Login">Login</a></h6>
<p>Current Dancers<br />
Login here. </p>
</div>

<div class="action-links2">
<h6 class="register"><a title="New Dancers sign up here" target="_blank" href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Activate">Register</a></h6>
<p>New Dancers<br />
Sign up here.  </p>
</div>

<div class="action-links3">
<h6 class="donate"><a title="Donate to Dance Marathon" target="_blank" href="http://osl.iowa.uiowa.edu/dancemarathon/donate">Donate</a></h6>
<p>Make your<br />
donations here.  </p>
</div>

<div class="action-links4">
<h6 class="sponsor"><a title="Sponsor Dance Marathon" href="sponsors/ways-to-get-involved/">Sponsor</a></h6>
<p>Interested in<br />
sponsoring DM? </p>
</div>



<script type="text/javascript" src="http://twitter.com/javascripts/blogger.js">
</script><script type="text/javascript" src="http://twitter.com/statuses/user_timeline/UIDM.json?callback=twitterCallback2&amp;count=1">
</script>