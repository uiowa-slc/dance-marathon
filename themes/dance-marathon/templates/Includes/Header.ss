<!-- Header -->
<header class="header" role="banner">
	<div class="container">
		<% with Page("home") %>
			<% if $Countdown %>
				<div class="countdown">
					<span id="clock">$CountdownDate.TimeDiffIn("days")</span>
					until the Big Event on February 1-2, 2019.
				</div>
			<% end_if %>
		<% end_with %>
		<a href="{$BaseHref}" class="logo">
			<img src="{$ThemeDir}/images/dm_logo.png" alt="University of Iowa Dance Marathon">
		</a>
		<div class="clearfix top-nav">
			<a href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Activate" class="top-register">Register</a>
			<a href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Login" class="top-login">Login</a>
			<a href="https://donate.dancemarathon.uiowa.edu" class="top-donate">Donate</a>
		</div>
		<span class="shifter-handle">Menu</span>
	</div>
</header>
<% include MainNav %>
