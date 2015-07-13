<main class="container main" role="main">
	<div class="row">

		<!-- Side Bar -->
		<div class="col-lg-4 col-lg-push-8">
			<% include SideNav %>
		</div>

		<!-- Main Content -->
		<div class="col-lg-8 col-lg-pull-4">
			<section id="main-content" tabindex="-1">
				<div class="councilmember <% if $Position %>position<% end_if %>">
					<h1 class="title">$Title</h1>
					<!-- Position -->
					<% if $Position %>
						<h3 class="position">$Position</h3>
					<% end_if %>
					<hr />
					<% if $Photo %>
						<img src="$Photo.CroppedImage(300,300).URL" alt="$Name" class="councilmember-img">
					<% end_if %>

					<!-- Email & Phone -->
					<% if $EmailAddress || $PhoneNumber %>
						<ul class="details">
							<% if $EmailAddress %><li><strong>Email:</strong> <a href="mailto:$EmailAddress">$EmailAddress</a></li><% end_if %>
						</ul>

					<% end_if %>

					$Content
					$Form
				</section>
			</div>

			<!-- Loop Sub Pages -->
			<% include ChildPages %>

		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->
<br />