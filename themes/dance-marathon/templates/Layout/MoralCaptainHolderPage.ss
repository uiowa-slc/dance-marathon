<main class="container main" role="main">

	<div class="row">
		<!-- Side Bar -->
		<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
			<div class="col-lg-4 col-lg-push-8 sidebar">
				<% include SideNav %>
			</div>
		<% end_if %>

		<div class="<% if $Children || $Parent %>col-lg-8 col-lg-pull-4 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
				$Content
				$Form

				<!-- Loop Council Members -->
				<ul class="councilholder justify justify-3">
					<% loop $Children %>
						<li class="justify-item">
							<% if $Photo %>
								<img src="$Photo.Fill(200,200).URL" alt="$Title" class="img">
								<% else %>
								<img src="{$ThemeDir}/dist/images/placeholder.png" alt="$Title" class="img">
							<% end_if %>
							<h4 class="title">$FirstName $LastName</h4>
							<p><% if $Position %><em class="position">$Position</em><% end_if %>
							<% if $EmailAddress %><a href="mailto:$EmailAddress" class="email">$EmailAddress</a><% end_if %></p>
						</li>
					<% end_loop %>
					<li class="justify-item filler"></li>
					<li class="justify-item filler"></li>
				</ul>
				<!-- end Loop Staff Members -->

			</section>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->
