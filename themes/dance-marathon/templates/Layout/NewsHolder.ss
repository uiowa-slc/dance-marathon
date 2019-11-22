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
					<% if $Sidebar %>
						<div class="sidebar-content sidebar-content--padding">
							$Sidebar
						</div>
					<% end_if %>
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
									<%-- Featured Image --%>
									<% if $FeaturedImage %>
										<a href="$Link">
											<img src="$FeaturedImage.ScaleWidth(150).URL" alt="$Title Featured Image" class="newsblock--featured right">
										</a>
									<% end_if %>
									<h3 class="newsblock-title"><a href="$Link">$Title</a></h3>
									<%-- Meta --%>
									<p class="entry-date">
										<span class="date">$PublishDate.format("MMMM d, YYYY")</span>
										<% if $Categories.exists %>
											<span class="bar">|</span>
											<% loop $Categories %>
												<a href="$Link" title="$Title">$Title</a><% if not Last %>, <% else %><% end_if %>
											<% end_loop %>
										<% end_if %>
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
