<!-- new bootstrap-project template base: -->

<% include Header %>

<main class="container-xl my-5">
    <div class="row">
        <div class="<% if $Menu(2) %>col-lg-8 col-xl-9 <% else %>col-md-10 offset-md-1<% end_if %>">

            <article id="content">

                <h1>$Title</h1>
                $Content
                $Form
                $PageComments
            </article>


        </div>
        <% if $Menu(2) %>
            <% include SideBar %>
        <% end_if %>
    </div>
</main>


<!-- old template: -->
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

				<% if $SponsorTypes %>
					<% loop $SponsorTypes %>
						<% if $Sponsors %>
							<br />
							<h2>$Title</h2>
							<ul class="sponsors">
								<% loop $Sponsors %>
									<li class="sponsors__item">
										<% if $Website %>
											<a href="$Website">
										<% end_if %>
										<img src="$SponsorLogo.ScaleWidth(200).URL" alt="$Title">
										<% if $Website %>
											</a>
										<% end_if %>
									</li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				<% end_if %>


				<% if $UncategorizedSponsors %>
				<hr style="margin-top: 100px" />
				<ul class="sponsors">
					<% loop $UncategorizedSponsors %>
						<li class="sponsors__item">
							<% if $Website %><a href="$Website"><% end_if %>
							<img src="$SponsorLogo.ScaleWidth(200).URL" alt="$Title">
							<% if $Website %></a><% end_if %>
						</li>
					<% end_loop %>
				</ul>
				<% end_if %>

				$Content
				$Form

			</section>
			<% include ChildPages %>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->

