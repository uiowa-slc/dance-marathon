

<div id="main-content">
<div id="content-header"></div>

<div id="content-body-interior" class="typography">

<% include Sidebar %>

<div id="content">




<br />
<h1>$Title</h1>


<div class="feature-image"  style="background: url(<% control ContentImage.SetWidth(700) %>$Filename<% end_control %>) no-repeat 0px 0px;">

<div class="quote">
$FamiliesQuote
</div>

</div><!--end feature image-->



<script type="text/javascript">
//<![CDATA[
        $(function() {
                $("#tabs").tabs({
                        event: 'mouseover'
                });
        });
//]]>
</script>



<h2>Get Involved</h2>


<div class="quadrant" id="pos1">
<h3>DM Scholarship</h3>
<ul>
<li>One thing that Dance Marathon allocates money for is a scholarship fund for our sponsored children! </li>
 <li>If you are interested in filling out an application, click <a href="/assets/DM-18/DMScholarshipApplication-updated-February-2011.doc">here</a> to download the Dance Marathon Scholarship Application Form!</li>
</ul>
</div>

<div class="quadrant" id="pos2">
<h3>Fundraising page<br /> for families</h3>

<ul>
<li>To help everyone reach their fundraising goals, we will be helping families create fundraising sites!</li>
<li>  They're free to make for any family.  Check back here by the end of the Summer for further details!</li>
</ul>
</div>

<div class="quadrant" id="pos3">
<h3>Share your<br /> family's story!</h3>
<ul>
<li>Do you have a story that you would like to share with us?</li>
<li>Please e-mail <a href="mailto:dm.websitechair@gmail.com">dm.websitechair@gmail.com</a> or fill out this <a href="/families/share-your-story/">form</a>.</li>
</ul>
</div>

<div class="column">
<h2>Our Challenge</h2>
<p>In honor of the 20th annual Dance Marathon, this year we are challenging University of Iowa Dance Marathon families to raise $20,000...we know you can do it! There are over 500 families involved with Dance Marathon. All it takes is 200 families raising $100 each. Our UI Dance Marathon families hit their fundraising goal last year, and we are excited to see it happen again this year!
 </p>

</div>

<div class="wrapper">
<h2 class="orange">Gallery</h2>

<div class="merchandise">


<object width="442" height="306" data="http://www.flickr.com/apps/slideshow/show.swf?v=71649" type="application/x-shockwave-flash">
<param name="flashvars" value="offsite=true&amp;lang=en-us&amp;page_show_url=%2Fphotos%2Fdancemarathon%2Fsets%2F72157624342927206/%2Fshow%2F&amp;page_show_back_url=%2Fphotos%2Fdancemarathon%2Fsets%2F72157624342927206/%2F&amp;set_id=72157624342927206&amp;jump_to=" />
<param name="allowFullScreen" value="true" />
<param name="src" value="http://www.flickr.com/apps/slideshow/show.swf?v=71649" />
<param name="allowfullscreen" value="true" />
</object>



</div></div>





<div class="wrapper">
<h2><a href="/news">Announcements</a></h2>
<div id="news" class="interior-page">



<ul>
<% control News(3) %>
<% if NewsType = Dancers %>

<% else %>

<li>
<h3><a href="$Link">$Title</a></h3>
<p>$Content.Summary(25)</p>
<span class="more">
<a href="$Link">More</a>
</span>
</li>
<% end_if %>
<% end_control %>
</ul>
</div>
<!--end news-->




</div>


<div class="wrapper">
<h2 class="orange">Video</h2>

<div class="merchandise green">


<object width="442" height="306"><param name="movie" value="http://www.youtube.com/p/A19EB886D14CD834?hl=en_US&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/p/A19EB886D14CD834?hl=en_US&fs=1" type="application/x-shockwave-flash" width="442" height="306" allowscriptaccess="always" allowfullscreen="true"></embed></object>



</div></div>




</div><!--end content-->


<% include SocialMedia %>
</div><!--end content body-->

<div id="content-bottom"></div>

</div><!--end main-content-->

