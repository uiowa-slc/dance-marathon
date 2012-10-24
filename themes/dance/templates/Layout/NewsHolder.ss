

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
<% control allNews %>
<li>
<% if NewsImage %>
<a href="$Link"><img class="right" src="<% control NewsImage %><% control SetWidth(107) %> $URL <% end_control %><% end_control %>" alt="$Title"/></a>
<% end_if %> 
<h2><a href="$Link">$Title</a></h2>
<% if NewsDate %><p class="date">$NewsDate</p><% end_if %> 
<% if NewsLocation %><p class="location">$NewsLocation</p><% end_if %> 
$getSummaryHTML(Content, 15)
<span class="more">
<a href="$Link">More</a>
</span>
</li>
<% end_control %>
</ul>

  <% if allNews.MoreThanOnePage %>
<p class="pageNumbers">
<% if allNews.PrevLink %>
<a href="$allNews.PrevLink"><< Prev</a> |
<% end_if %>

<% control allNews.Pages %>
<% if CurrentBool %>
<strong>$PageNum</strong>
<% else %>
<a href="$Link" title="Go to page $PageNum">$PageNum</a>
<% end_if %>
<% end_control %>

<% if allNews.NextLink %>
| <a href="$allNews.NextLink">Next >></a>
<% end_if %>
</p>
<% end_if %> 
</div>
<!--end news-->




</div>



<div class="clear"></div>
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->

<div id="content-bottom"></div>

</div><!--end main-content-->

