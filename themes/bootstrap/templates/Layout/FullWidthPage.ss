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
		<!-- Main Content -->
		<div class="col-md-10 col-md-offset-1">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
				$Content
				$Form
			</section>
			<% include ChildPages %>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->

