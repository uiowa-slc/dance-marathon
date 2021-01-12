<% include Header %>

<main class="container-xl my-3 my-md-5">
    <div class="row">
        <div class="col">
            <div class="content-header mb-4">
                $Breadcrumbs
                <h1>$Title</h1>
            </div>
        </div>
    </div>
    <div class="row">
        <% if $Menu(2) %>
            <% include SideBar %>
        <% end_if %>
        
		<div class="<% if $Menu(2) %>col-lg-8 col-xl-9<% else %>col-md-10 offset-md-1<% end_if %>">
            <article id="content">
                <% if $FamilyPhoto %>
                    <img src="$FamilyPhoto.ScaleWidth(400).URL" alt="$Name" class="img-thumbnail float-md-right mb-3 ml-md-3">
                <% end_if %>
                $Content
                $Form
    			$PageComments
			</article>
		</div>
	</div>
</main>
