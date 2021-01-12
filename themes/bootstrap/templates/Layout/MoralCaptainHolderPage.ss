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
                <!-- Loop  Children -->
				<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
					<% loop $Children %>
                        <div class="col mb-4 d-flex align-items-stretch">
                            <div class="card">
                                <% if $Photo %>
                                    <img src="$Photo.FocusFill(300,350).URL" alt="$Title" class="card-img-top">
                                <% else %>
                                    <img src="{$ThemeDir}/dist/images/placeholder.jpg" alt="$Title" class="card-img-top">
                                <% end_if %>
                                <div class="card-body">
                                    <h5 class="card-title">$FirstName $LastName</h5>
                                    <p class="mb-0">
                                        <small>
                                            <% if $EmailAddress %>
                                                <a href="mailto:$EmailAddress" class="email">$EmailAddress</a>
                                            <% end_if %>
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
					<% end_loop %>
				</ul>
                <!-- end Loop -->
                $Form
    			$PageComments
			</article>
		</div>
	</div>
</main>
