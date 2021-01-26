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
                <% if $Logo %>
                    <img src="$Logo.ScaleWidth(300).URL" alt="$Name" class="float-md-right mb-3 ml-md-3">
                <% end_if %>
                <% if $Year %>
                    <h4>Year: $Year</h4>
                <% end_if %>
                <% if $AmountRaised %>
                    <h4>Amount Raised: $AmountRaised</h4>
                <% end_if %>
                $Content
                $Form
    			$PageComments
			</article>
		</div>
	</div>
</main>

