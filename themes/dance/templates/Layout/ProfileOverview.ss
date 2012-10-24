

<div id="main-content">
<div id="content-header"></div>
<div id="content-body-interior" class="typography">

<div id="sidebar">
<% include SideNavigationSimple %>
</div><!--end sidebar -->

<div id="content">

<div id="breadcrumbs">$Breadcrumbs </div>


<% if ContentImage %>
<div class="image">
<img src="<% control ContentImage %><% control SetWidth(386) %> $URL <% end_control %><% end_control %>" alt="$Title"/>
</div>
<% end_if %> 

<h1>$Title</h1>

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
<li id="list$Pos" <% if First %>class="ui-corner-top ui-tabs-selected ui-state-active" <% else %> class="ui-corner-top ui-state-default"<% end_if %>><a href="#tabs-$Pos">$MenuTitle</a></li>
<% end_control %>
</ul>

<% control Dancers %>
<div class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="tabs-1" style="background: url(<% control FeatureImage.SetWidth(270) %>$Filename<% end_control %>) no-repeat scroll 400px 10px;">
<ul>
<li>
<h4><a href="$Link">$Title</a></h4>
<p class="description">$ProfileDescription</p>
<h5>$ProfileMajor</h5>
<h5>$ProfileAge</h5>
<br />
<p class="teaser">$Content.LimitWordCount(20)</p>
<span class="more"><a href="$Link">Read More</a></span></li>
</ul>
</div>
<% end_control %>

<% control Families %>
<div class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="tabs-2" style="background: url(<% control FeatureImage.SetWidth(270) %>$Filename<% end_control %>) no-repeat scroll 400px 10px;">
<ul>
<li>
<h4><a href="$Link">$Title</a></h4>
<p class="description">$ProfileDescription</p>
<h5>$ProfileMajor</h5>
<h5>$ProfileAge</h5>
<br />
<p class="teaser">$Content.LimitWordCount(20)</p>
<span class="more"><a href="$Link">Read More</a></span></li>
</ul>
</div>
<% end_control %>

<% control Leadership %>
<div class="ui-tabs-panel ui-widget-content ui-corner-bottom" id="tabs-3" style="background: url(<% control FeatureImage.SetWidth(270) %>$Filename<% end_control %>) no-repeat scroll 400px 10px;">
<ul>
<li>
<h4><a href="$Link">$Title</a></h4>
<p class="description">$ProfileDescription</p>
<h5>$ProfileMajor</h5>
<h5>$ProfileAge</h5><br />
<p class="teaser">$Content.LimitWordCount(20)</p>
<span class="more"><a href="$Link">Read More</a></span></li>
</ul>
</div><!--end tabs 3-->
<% end_control %>
</div><!-- end tabs -->

<!--end profiles--></div>

<div class="column">

<h2>View all DM Limelite Profiles</h2>

<div class="quadrant" id="pos1">
<h3>Dancer Profiles</h3>
<ul>
<% control ChildrenOf(DM-Dancers) %>
<li><a href="$Link">$Title</a></li>
<% end_control %>
</ul>
</div>

<div class="quadrant" id="pos2">
<h3>Family Profiles</h3>
<ul>
<% control ChildrenOf(DM-Families) %>
<li><a href="$Link">$Title</a></li>
<% end_control %>
</ul>
</div>


<div class="quadrant" id="pos3">
<h3>Leadership Profiles</h3>
<ul>
<% control ChildrenOf(DM-Leadership) %>
<li><a href="$Link">$Title</a></li>
<% end_control %>
</ul>
</div>

</div>



$Content
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->
<div id="content-bottom"></div>

</div><!--end main-content-->


