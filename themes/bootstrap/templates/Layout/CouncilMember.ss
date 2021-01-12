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
                
                <!-- Position -->
                <% if $Position %>
                    <h2 class="position">$Position</h2>
                <% end_if %>

                <% if $Photo %>
                    <img src="$Photo.Fill(300,350).URL" alt="$Name" class="float-sm-right mb-4 ml-sm-4 img-thumbnail">
                <% end_if %>

                <!-- Email -->
                <% if $EmailAddress %>
                    <p class="my-3">
                        <a href="mailto:$EmailAddress" class="btn btn-primary"><i class="fas fa-envelope-open mr-2"> </i> $EmailAddress</a>
                    </p>
                <% end_if %>

                $Content
                $Form
    			$PageComments
			</article>
		</div>
	</div>
</main>




