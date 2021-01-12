<% include Header %>

<!-- Photo Image Feature -->
<% if $Photo %>
    <% include FeaturedImage %>
<% end_if %>

<main class="container-xl my-3 my-md-5">
    <% if not $Photo %>
        <div class="row">
            <div class="col">
                <div class="content-header mb-4">
                    $Breadcrumbs
                    <h1>$Title</h1>
                </div>
            </div>
        </div>
    <% end_if %>
    <div class="row">
        <% if $Menu(2) %>
            <% include SideBar %>
        <% end_if %>
        
		<div class="<% if $Menu(2) %>col-lg-8 col-xl-9<% else %>col-md-10 offset-md-1<% end_if %>">
			<article id="content">
                $Content
                $Form
                $PageComments
                <% if $SponsorTypes %>
					<% loop $SponsorTypes %>
						<% if $Sponsors %>
                            <h2>$Title</h2>
                            <br />
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
								<% loop $Sponsors %>
									<div class="col mb-4">
										<% if $Website %><a href="$Website"><% end_if %>
										    <img src="$SponsorLogo.ScaleWidth(200).URL" alt="$Title">
										<% if $Website %></a><% end_if %>
									</div>
								<% end_loop %>
                            </div>
                            <hr />
						<% end_if %>
					<% end_loop %>
				<% end_if %>


				<% if $UncategorizedSponsors %>
				<hr style="margin-top: 100px" />
				<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
					<% loop $UncategorizedSponsors %>
						<div class="col mb-4">
							<% if $Website %><a href="$Website"><% end_if %>
							    <img src="$SponsorLogo.ScaleWidth(200).URL" alt="$Title">
							<% if $Website %></a><% end_if %>
						</div>
					<% end_loop %>
				</div>
				<% end_if %>
			</article>
		</div>
	</div>
</main>



