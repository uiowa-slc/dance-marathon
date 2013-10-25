<% control Home(5) %>
<div <% if First %>class="ui-tabs-panel" <% else %> class="ui-tabs-panel ui-tabs-hide"<% end_if %> id="tab$Pos" style="background: url(<% control FeatureImage.SetWidth(1501) %>$Filename<% end_control %>) no-repeat scroll 50% 0;">
   <div class="mask">
      <div class="tab-content">
         <% if ExternalLink %>
         <h2><a href="$ExternalLink">$Title</a></h2>
         <br />
         <% else %>
         <h2><a href="$Link">$Title</a></h2>
         <br />
         <% end_if %>
         <div class="summary">
            <p>$Content.Summary(25)</p>
            <span class="more">
            <% if ExternalLink %>
            <a href="$ExternalLink">Read More</a>
            <% else %>
            <a href="$Link">Read More</a>
            <% end_if %>
            </span>
         </div>
      </div>
      <!--end mask -->
   </div>
   <!--end tab content -->
</div>
<!--end tab 1 -->
<% end_control %>
<ul class="ui-tabs-nav">
   <% control Home(5) %>
   <li id="menu$Pos" <% if First %>class="ui-tabs-selected"<% end_if %>>
      <div class="thumbs"><a href="/#tab$Pos">$Title</a></div>
   </li>
   <% end_control %>
</ul>
</div><!--/end rotate div -->
<div id="main-content" />
<div class="col2">
   <div id="news" class="typography">
      <h3><a href="/news">News</a></h3>
      <ul>
      
		<% if EnableStream %>
			<li>
			<h4><a href="http://dancemarathon.uiowa.edu/ustream-embed-page/" class="streaming-link">We're Streaming the Big Event!</a></h4>
			<p class="date">February 1</p>
			<p><a href="http://www.965kisscountry.com/cc-common/mainheadlines3.html?feed=253340&article=10737876" target="_blank">View the stream on KISS Country 96.5 here &raquo;</a></p>
			<span class="more"><a href="http://dancemarathon.uiowa.edu/ustream-embed-page" class="streaming-link">View the stream now!</a></span>
			</li>
		<% end_if %>
         <% control News(4) %>
         <li>
            <!-- id = $ID -->
            <% if NewsImage %>
            <a href="$Link"><img class="right" src="<% control NewsImage %><% control SetWidth(107) %> $URL <% end_control %><% end_control %>" alt="$Title" /></a>
            <% end_if %> 
            <h4><a href="$Link">$Title</a></h4>
            <p class="date">$NewsDate</p>
            <p class="location">$NewsLocation</p>
            <p>$Content.Summary(50)</p>
            <p><span class="more"><a href="$Link">Read More</a></span></p>
         </li>
         <% end_control %>
      </ul>
   </div>
   <!--end news-->
   <div id="social-media">
      <div id="social-media-feed">
      	 <a class="twitter-timeline" href="https://twitter.com/UIDM" data-widget-id="379992527249494017">Tweets by @UIDM</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>




      </div>
      <!--end social media feed-->
      <ul>
         <li>
            <a title="Find us on Facebook" target="_blank" href="http://www.facebook.com/pages/University-of-Iowa-Dance-Marathon/34066727428?v=photos&amp;ref=ts"><img src="$ThemeDir/images/facebook.png" alt="Facebook" longdesc="http://www.facebook.com" /></a>
            <p><a title="Find us on Facebook" target="_blank" href="http://www.facebook.com/pages/University-of-Iowa-Dance-Marathon/34066727428?v=photos&amp;ref=ts">Facebook</a></p>
         </li>
         <li>
            <a title="Subscribe to our RSS Feed" href="http://dancemarathon.uiowa.edu/news/rss"><img src="$ThemeDir/images/rss.png" alt="RSS Feed" longdesc="http://www.facebook.com" /></a>
            <p><a title="Subscribe to our RSS Feed" href="http://dancemarathon.uiowa.edu/news/rss">RSS</a></p>
         </li>
         <li>
            <a title="Subscribe to our Newsletter" href="https://list.uiowa.edu/scripts/wa.exe?SUBED1=DANCE-MARATHON&amp;A=1/"><img src="$ThemeDir/images/newsletter.png" alt="Sign up for our Newsletter" longdesc="http://www.facebook.com" /></a>
            <p><a title="Subscribe to our Newsletter" href="https://list.uiowa.edu/scripts/wa.exe?SUBED1=DANCE-MARATHON&amp;A=1/">Newsletter</a></p>
         </li>
         <li>
            <a title="View our photos on Flickr" target="_blank" href="http://www.flickr.com/photos/dancemarathon/"><img src="$ThemeDir/images/flickr.png" alt="Flickr" longdesc="http://www.flickr.com" /></a>
            <p><a title="View our photos on Flickr" target="_blank" href="http://www.flickr.com/photos/dancemarathon/">Flickr</a></p>
         </li>
         <li>
            <a title="Follow us on Twitter" target="_blank" href="https://twitter.com/UIDM"><img src="$ThemeDir/images/twitter.png" alt="Twitter" longdesc="http://www.twitter.com" /></a>
            <p><a title="Follow us on Twitter" target="_blank" href="https://twitter.com/UIDM">Twitter</a></p>
         </li>
      </ul>
   </div>
   <!--end social media -->
</div>
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

   
<div class="why-dance">
	<h2><a href="home/why-do-you-dance/">Why Do You Dance?</a></h2>
	<iframe width="480" height="270" src="http://www.youtube.com/embed/65Q5yeu1PRk?list=UU_oZdt6ePqTGW-p4UR5dvkw&amp;hl=en_US" frameborder="0" allowfullscreen></iframe>
	<p><a href="home/why-do-you-dance/">Find out why others dance!</a></p>
</div>
</div>   <!--end col1-->
<div class="clear"></div>



<div class="action-links1">
   <h6 class="login"><a title="Dancer Login" target="_blank" href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Login">Login</a></h6>
   <p>Current Dancers<br />
      Login here. 
   </p>
</div>
<div class="action-links2">
   <h6 class="register"><a title="New Dancers sign up here" target="_blank" href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Activate">Register</a></h6>
   <p>New Dancers<br />
      Sign up here.  
   </p>
</div>
<div class="action-links3">
   <h6 class="donate"><a title="Donate to Dance Marathon" target="_blank" href="http://osl.iowa.uiowa.edu/dancemarathon/donate">Donate</a></h6>
   <p>Make your<br />
      donations here.  
   </p>
</div>
<div class="action-links4">
   <h6 class="sponsor"><a title="Sponsor Dance Marathon" href="sponsors/ways-to-get-involved/">Sponsor</a></h6>
   <p>Interested in<br />
      sponsoring DM? 
   </p>
</div>
<script type="text/javascript" src="http://twitter.com/javascripts/blogger.js"></script><script type="text/javascript" src="http://twitter.com/statuses/user_timeline/UIDM.json?callback=twitterCallback2&amp;count=1"></script>