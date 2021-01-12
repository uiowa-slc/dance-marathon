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
                
                <% if $EventList %>
                    <% loop $EventList %>
                        <% include EventCard %>
                    <% end_loop %>
                <% else %>
                    <p>No events are currently listed. Please check back soon.</p>
                <% end_if %>

			</article>
		</div>
	</div>
</main>