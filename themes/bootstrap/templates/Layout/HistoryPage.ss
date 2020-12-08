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
		<div class="col-xl-10 col-xl-offset-1">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
				$Content
				$Form
			</section>
		</div>
	</div>
	<div class="row">
		<div class="col-xl-12">

			<div class="flexslider history">
				<ul class="slides history__list">
					<% loop $Photos %>
						<li>
							<img src="$Photo.FocusFill(1140,700).URL" alt="$Photo.Title">
						</li>
					<% end_loop %>
				</ul>
			</div>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->

