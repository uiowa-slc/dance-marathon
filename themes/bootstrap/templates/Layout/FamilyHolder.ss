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
		<div class="col-12">
			<article id="content">
                $Content

                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-4">
                    <% loop $Children %>
                        <div class="col mb-4 d-flex align-items-stretch">
                            <div class="card">
                                <% if $FamilyPhoto %>
                                    <a href="$Link" >
                                        <img src="$FamilyPhoto.FocusFill(600,400).URL" alt="$Title" class="card-img-top">
                                    </a>
                                <% else %>
                                    <a href="$Link" >
                                        <img src="{$ThemeDir}/dist/images/placeholder-landscape.jpg" alt="$Title" class="card-img-top">
                                    </a>
                                <% end_if %>
                                <div class="card-body">
                                    <p>$Title</p>
                                    <a href="$Link" class="btn btn-primary">Meet The Family</a>
                                </div>
                            </div>
                        </div>
                    <% end_loop %>
                </div>
                $Form
    			$PageComments
			</article>
		</div>
	</div>
</main>

