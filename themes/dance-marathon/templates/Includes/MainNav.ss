

<nav role="navigation" class="nav-wrapper no-print" aria-label="Main menu">
	<div class="container">
		<ul class="main-nav clearfix">
			<% loop Menu(1) %>
				<li class="main-nav__listitem $FirstLast <% if $LinkOrSection = "section" %>main-nav__listitem--active<% end_if %><% if Children %> main-nav__listitem--parent<% end_if %>">
					<a href="$Link" class="main-nav__anchor <% if Children %>main-nav__anchor--parent<% end_if %>">$MenuTitle</a>
					<% if Children %>
						<ul class="sublist">
							<% loop Children %>
								<li class="sublist__listitem $FirstLast <% if $LinkOrCurrent = "current" %>sublist__listitem--active<% end_if %>"><a href="$Link" class="sublist__anchor">$MenuTitle</a></li>
							<% end_loop %>
						</ul>
					<% end_if %>
				</li>
			<% end_loop %>
		</ul>
	</div>
</nav>
