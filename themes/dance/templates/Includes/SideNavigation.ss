<div id="side-navigation">
<% if Parent %>
<% control Level(1) %>
<h3 class="navigation"><a href="$Link">$Title</a></h3>
<% end_control %>
<% else %>
<h3 class="navigation">$Title</h3>
<% end_if %>
<% if Menu(2) %>
	<ul>
		<% control Menu(2) %>
		<li class="$LinkingMode<% if FirstLast %> $FirstLast<% end_if %>">
			<% if LinkingMode = current %>
				<span class="item selected">$MenuTitle</span>
			<% else %>				
				<a class="item" href="$Link" title="View more on $Title">$MenuTitle</a>
			<% end_if %>
			<% if Children %>
			<% if InSection(home) %>
			
			<% else %>
				
					<ul class="sub-navigation">
						<% control Children %>
						<li class="$LinkingMode<% if FirstLast %> $FirstLast<% end_if %>">
							<% if LinkingMode = current %>
								<span class="item selected">$MenuTitle</span>
							<% else %>
								<a class="item" href="$Link" title="View more on $Title">$MenuTitle</a>
							<% end_if %>
						</li>
						<% end_control %>
					</ul>
					
			<% end_if %>
				
			<% end_if %>
		</li>
		<% end_control %>
	</ul>
<% end_if %>

</div>