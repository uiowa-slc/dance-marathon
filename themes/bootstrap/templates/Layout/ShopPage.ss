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
                <hr />
                <% if $ShopItems %>
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                        <% loop $ShopItems %>
                            <div class="col mb-4 d-flex align-items-stretch">
                                <div class="card">
                                    <% if $Image %>
                                        <img src="$Image.Pad(300,300).URL" alt="$Title" class="card-img-top">
                                    <% end_if %>
                                    <div class="card-body">
                                        <h5 class="card-title">$Title</h5>
                                        <% if $Price %>
                                            <p><small>$Price</small></p>
                                        <% end_if %>
                                        <% if $ShopURL %>
                                            <a href="$ShopURL" class="btn btn-primary">Shop Online</a>
                                        <% end_if %>
                                    </div>
                                </div>
                            </div>
                        <% end_loop %>
                    </div>
                <% end_if %>    


				<% if $SecondaryContent %>
					$SecondaryContent
				<% end_if %>

                <!-- Loop Items Not For Sale -->
                <% if $Items %>
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                        <% loop $Items %>
                            <div class="col mb-4 d-flex align-items-stretch">
                                <div class="card">
                                    <% if $Image %>
                                        <img src="$Image.Pad(300,300).URL" alt="$Title" class="card-img-top">
                                    <% end_if %>
                                    <div class="card-body">
                                        <h5 class="card-title">$Title</h5>
                                    </div>
                                </div>
                            </div>
                        <% end_loop %>
                    </div>
                <% end_if %>
				<!-- end Loop Items Not For Sale -->
			</article>
		</div>
	</div>
</main>

