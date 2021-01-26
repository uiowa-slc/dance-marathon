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
       
		<div class="col-12 col-lg-10 offset-lg-1">
			<article id="content">
                $Content
                $Form
                $PageComments

                <% if $Children %>
                    <h2 class="text-center">Timeline</h2>
                    <section class="timeline py-4 my-4 my-lg-5">
                        <% loop $Children %>
                            <div class="timeline__block text-center">
                                <div class="timeline__year">
                                    <span class="cd-date2">$Year</span>
                                </div> 
                                <div class="timeline__content">
                                    <h2 class="mb-2">$AmountRaised</h2>
                                    <a href="$Link">
                                        <img src="$Logo.FocusFill(300,300).URL" loading="lazy" class="timeline__logo img-fluid" alt="$Year">
                                    </a>
                                </div>
                            </div>
                        <% end_loop %>
                    </section>
                <% end_if %>

			</article>
		</div>
	</div>
</main>