<% include HeaderPhoto %>
<main class="container main" role="main">

	<div class="row">
		<!-- Side Bar -->
		<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
			<div class="col-lg-4 col-lg-push-8 sidebar">
				<% include SideNav %>
			</div>
		<% end_if %>

		<!-- Main Content -->
		<div class="<% if $Children || $Parent %>col-lg-8 col-lg-pull-4 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>

				<ul class="justify justify-4">
					<% loop $SponsorEntrys %>
						<li class="justify-item">
							<% if $Website %><a href="$Website"><% end_if %>
							<img src="$SponsorLogo.SetWidth(200).URL" alt="$Title">
							<% if $Website %></a><% end_if %>
						</li>
					<% end_loop %>
					<li class="justify-item filler"></li>
				</ul>

				$Content
				$Form

			</section>
			<% include ChildPages %>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->

