<% include HeaderPhoto %>


<% if SelectedTag %>
	<!-- ========= BEGIN SELECTED TAG CONTENT ========= -->
	<main class="container main" role="main">
		<div class="row">
			<!-- Side Bar -->
			<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
				<div class="col-lg-4 col-lg-push-8 sidebar">
					<% include SideNav %>
				</div>
			<% end_if %>

			<!-- Main Content -->
			<div class="<% if $Children || $Parent %>col-lg-8 col-lg-pull-4 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
				<section id="main-content" tabindex="-1">
					<h2 class="cat-heading-title"><% _t('BlogHolder_ss.VIEWINGTAGGED', 'Viewing entries tagged with') %> '$SelectedTag'</h2>
					<!-- Loop News -->
					<div class="newsholder-entries">
						<% loop PaginatedList(20) %>
							<div class="newsblock clearfix <% if $Photo %>withphoto<% end_if %>">
								<div class="newsblock-info">
									<h4 class="newsblock-title"><a href="$Link">$Title</a></h4>
									<p>$Content.LimitCharacters(100)</p>
								</div>
							</div>
						<% end_loop %>
					</div>
					<% include NewsPagination %>
				</section>
			</div><!-- end .col -->

		</div><!-- end .row -->
	</main><!-- END .container -->
<% else %>

	<!-- ========= BEGIN FEATURED CONTENT ========= -->
	<main class="container main" role="main">
		<div class="row">
			<!-- Side Bar -->
			<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
				<div class="col-lg-4 col-lg-push-8 sidebar">
					<% include SideNav %>
				</div>
			<% end_if %>

			<!-- Main Content -->
			<div class="<% if $Children || $Parent %>col-lg-8 col-lg-pull-4 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
				<section id="main-content" tabindex="-1">
					<h1>$Title</h1>
					$Content
					$Form
					<!-- Loop News -->
					<div class="newsholder-entries">
						<% loop PaginatedList %>
							<div class="newsblock clearfix <% if $Photo %>withphoto<% end_if %>">
								<div class="newsblock-info">
									<% if $FeaturedImagePhoto %>
										<a href="$Link">
											<img src="$FeaturedImage.CroppedImage(120,120).URL" alt="$Title" class="right">
										</a>
									<% end_if %>
									<h3 class="newsblock-title"><a href="$Link">$Title</a></h3>
									<p class="entry-date">
										Posted on <time datetime="$PublishDate.format(c)" itemprop="datePublished">$PublishDate.format(F d Y)</time>
									</p>
									<p class="entry-content">$Content.LimitCharacters(150)</p>
								</div>
							</div>
						<% end_loop %>
					</div>
					<% include NewsPagination %>
				</section>
			</div><!-- end .col -->

		</div><!-- end .row -->
	</main><!-- end .container -->
<% end_if %>