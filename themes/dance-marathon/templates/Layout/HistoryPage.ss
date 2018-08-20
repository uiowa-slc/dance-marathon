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
			<div class="history">
				<ul class="history__list">
					<% loop $Photos %>
						<li class="history__item">
							<a href="$Photo.SetWidth(1000).URL" data-fancybox="historyimg" data-caption="$Photo.Title">
								<img src="$Photo.CroppedFocusedImage(600,400).URL" alt="$Photo.Title" class="history__img">
							</a>
						</li>
					<% end_loop %>
				</ul>
			</div>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->

