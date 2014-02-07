<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>$Title - Dance Marathon $Now.Year - The University of Iowa</title>
<% base_tag %>

<link rel="stylesheet" type="text/css" href="$ThemeDir/css/styles.css" />
<link rel="stylesheet" type="text/css" href="$ThemeDir/css/reset.css" />
<link href='http://fonts.googleapis.com/css?family=Anton' rel='stylesheet' type='text/css'>

<!--[if IE 7]><style type='text/css'>@import url($ThemeDir/css/ie7.css);</style><![endif]-->

<link rel="SHORTCUT ICON" href="$ThemeDir/images/favicon.ico" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript" src="$BaseHref/mysite/code/javascript/hoverIntent.js"></script>
<script type="text/javascript" src="$BaseHref/mysite/code/javascript/superfish.js"></script>
<script type="text/javascript">
	jQuery(function(){
		jQuery('ul.sf-menu').superfish();
	});
</script>	
<script src="$BaseHref/mysite/code/javascript/ui_002_002.js" type="text/javascript"></script>
<script src="$BaseHref/mysite/code/javascript/ui.js" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
            $(function() {
               jQuery('#rotate > ul').tabs({ fx: { opacity: 'toggle' } }).tabs('rotate', 8000);
            });
//]]>
</script> <script type="text/javascript" src="$BaseHref/mysite/code/javascript/ui_002.js">
</script> <script type="text/javascript" src="$BaseHref/mysite/code/javascript/days_left.js">

</script>

<% if NotHomePage %>
<style type="text/css">
#rotate {background:url($BaseHref/themes/dance/images/interior-background.jpg) no-repeat scroll 50% 0;}
</style>
<% end_if %>

<% if URLSegment = home %>

<link rel="stylesheet" type="text/css" href="$ThemeDir/css/ui.css" />
<script type="text/javascript" src="$BaseHref/mysite/code/javascript/hoverIntent.js">
</script>

<script src="$BaseHref/mysite/code/javascript/ui_002_002.js" type="text/javascript">
</script> <script src="$BaseHref/mysite/code/javascript/ui.js" type="text/javascript">
</script> <script type="text/javascript">
//<![CDATA[
            $(function() {
               jQuery('#rotate > ul').tabs({ fx: { opacity: 'toggle' } }).tabs('rotate', 8000);
            });
//]]>
</script> <script type="text/javascript" src="$BaseHref/mysite/code/javascript/ui_002.js"></script>

<% end_if %>
<link rel="stylesheet" type="text/css" href="{$ThemeDir}/vendor/magnific/magnific-popup.css" media="screen" />
<script type="text/javascript" src="{$ThemeDir}/vendor/magnific/magnific.js"></script>


<script type="text/javascript">
	$(document).ready(function() {

    $('.streaming-link').magnificPopup({
      type:'iframe',
      closeBtnInside: true

    });
	});

  <% if URLSegment == home %>
    $(document).ready(function() {
      jQuery(".streaming-link").trigger('click');
    });
  <% end_if %>

</script>


<% if CurrentMember %>

<style type="text/css">
div.edit-box {
  margin: 0;
  font-size: 80% /*smaller*/;
  font-weight: bold;
  line-height: 1.1;
  text-align: center;
  position: fixed;
  top: 2em;
  left: auto;
  width: 8.5em;
  right: 2em;
}
div.edit-box p {
  margin: 0; 
  padding: 0.3em 0.4em;
  font-family: Arial, sans-serif;
  background: #900;
  border: thin outset #900;
  color: white;
}

div.edit-box a, div.edit-box em { display: block; margin: 0 0.5em }
div.edit-box a, div.edit-box em { border-top: 2px groove #900 }
div.edit-box a:first-child { border-top: none }
div.edit-box em { color: #CFC }

div.edit-box a:link { text-decoration: none; color: white }
div.edit-box a:visited { text-decoration: none; color: #CCC }
div.edit-box a:hover { background: black; color: white }
</style>

<% end_if %>

</head>
<body>
<% if ClassName = HomePage %>
<div class="hidden"><a href="/#tab1">Skip to main content</a></div>
<% else %>
<div class="hidden"><a href="#main-content">Skip to main content</a></div>
<% end_if %>
<div id="container">
<div id="rotate">
<div id="header-wrapper">
<div id="header">
<div id="header-top">
<p class="uiowa"><a title="The University of Iowa" href="http://www.uiowa.edu">The University of Iowa</a></p>
<p class="countdown">
<script type="text/javascript">
//<![CDATA[
countdown(2014,2,7)
//]]>
</script>
<!--<span><% control Page(Home) %>$YearTotal<% end_control %> raised!</span>-->
<% control Page(home) %>
<% if EnableStream %>
<a href="stream/?popup=1" class="streaming-link">View the stream live!</a>
<% end_if %>
<% end_control %>
</p>


<!--<p class="donate"><a title="Donate to Dance Marathon" target="_blank" href="http://osl.iowa.uiowa.edu/dancemarathon/donate">Donate</a></p>-->

<p class="header-links">

	<a title="Donate to Dance Marathon" target="_blank" href="http://osl.iowa.uiowa.edu/dancemarathon/donate">Donate</a>
	<a target="_blank" href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Login">Login</a>

</p>

<a target="_blank" href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Activate"><img src="$ThemeDir/images/registerbutton.png" class="registerbutton" /></a>
</div>
<!--end header-top-->
<h1 class="logo"><a title="Dance Marathon" href="/">Dance Marathon</a></h1>


<% include Navigation %>



</div><!--end header-->
</div><!--end header wrapper-->



$Layout


<div class="footer">


<div class="dm-sponsors"><a href="http://www.uihealthcare.com/depts/uichildrenshospital/index.html" target="_blank"><img src="$ThemeDir/images/uichildrenshospital.png" alt="University of Iowa Children's Hospital" title="University of Iowa Children's Hospital" longdesc="http://www.uihealthcare.com/depts/uichildrenshospital/index.html" /></a> <a href="/dancers/dance-marathon-the-marathon" target="_blank"><img src="$ThemeDir/images/dm-themarathon.png" alt="Dance Marathon The Marathon" title="Dance Marathon The Marathon" longdesc="http://www.dancemarathon.org/" /></a></div>
<a href="/"><img src="$ThemeDir/images/footerlogo.png" alt="Dance Marathon" title="Dance Marathon" class="logo" longdesc="http://dancemarathon.org" /></a>
<p class="footer-contact">145 Iowa Memorial Union • Iowa City, IA 52242 • (319) 353-2094 • <a href="mailto:dance-marathon@uiowa.edu">dance-marathon@uiowa.edu</a></p>
$SearchForm

  <ul class="menu">
       <% control Menu(1) %>
                <li class="$URLSegment"><a href="$Link">$MenuTitle</a>
                  <% if Children %>  <ul>
                        <% control Children %>
                            <li><a href="$Link">$Title</a></li>
                        <% end_control %>
                    </ul><% end_if %></li>
            <% end_control %>
      </ul>


<p class="copywright">&copy; <a href="http://www.uiowa.edu/">The University of Iowa</a> 1995 - $Now.Year. All rights reserved.</p>
</div><!--end footer-->
</div><!--/end container div -->

<% if CurrentMember %>
<div class="edit-box">
<p><a href="$BaseHref/admin/show/{$ID}">Edit this page</a></p>
</div>
<% end_if %>  
</div>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-426753-22']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</body>
</html>
