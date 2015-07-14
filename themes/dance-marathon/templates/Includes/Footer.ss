<!-- Footer -->
<footer class="footer" role="contentinfo">
	<span class="stripes"></span>
	<div class="footer-social">
		<div class="container">
			<h4 class="connect-us"><img src="{$ThemeDir}/images/footer-dancers.gif" alt=""> Connect With Us</h4>
			<ul class="clearfix social-icons">
				<% if $SiteConfig.FacebookLink %>
					<li>
						<a href="$SiteConfig.FacebookLink" title="Facebook" target="_blank" class="icon-facebook"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.TwitterLink %>
					<li>
						<a href="$SiteConfig.TwitterLink" title="Twitter" target="_blank" class="icon-twitter"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.FlickrLink %>
					<li>
						<a href="$SiteConfig.FlickrLink" title="Flickr" target="_blank" class="icon-flickr"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.YoutubeLink %>
					<li>
						<a href="$SiteConfig.YoutubeLink" title="Youtube" target="_blank" class="icon-youtube2"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.InstagramLink %>
					<li>
						<a href="$SiteConfig.InstagramLink" title="Instagram" target="_blank" class="icon-instagram"></a>
					</li>
				<% end_if %>
			</ul>
			<a href="#" class="footer-donate">Donate</a>
		</div>
	</div>
	<div class="quicklinks">
		<div class="container">
			<div class="link-group">
				<% loop Menu(1).Limit(1) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
			<div class="link-group">
				<% loop Menu(1).Limit(1,1) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1,1) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
			<div class="link-group">
				<% loop Menu(1).Limit(1,2) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1,2) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
			<div class="link-group">
				<% loop Menu(1).Limit(1,4) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1,4) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
			<div class="link-group">
				<% loop Menu(1).Limit(1,5) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1,5) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
			<div class="link-group">
				<% loop Menu(1).Limit(1,7) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1,7) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
		</div>
	</div>
	<div class="footer-logos">
		<div class="container clearfix">
			<div class="logo-container">
				<a href="{$BaseHref}"><img src="{$ThemeDir}/images/footer-uidm.gif" alt=""></a>
			</div>
			<div class="logo-container">
				<a href="http://dancemarathon.com/" target="_blank"><img src="{$ThemeDir}/images/miracle-network-dm.png" alt=""></a>
			</div>
			<div class="logo-container">
				<a href="http://give.childrensmiraclenetworkhospitals.org/" target="_blank"><img src="{$ThemeDir}/images/miracle-network.png" alt=""></a>
			</div>
			<div class="logo-container">
				<a href="http://www.uichildrens.org/" target="_blank"><img src="{$ThemeDir}/images/childrens-hospital.png" alt=""></a>
			</div>
		</div>
	</div>
	<div class="copyright">
		<div class="container">
			<p>&copy; The University of Iowa 1995&ndash;2015. All rights reserved. <% if $SiteConfig.Address1 %>$SiteConfig.Address1 <% end_if %><% if $SiteConfig.Phone %>| $SiteConfig.Phone <% end_if %><% if $SiteConfig.Email %> | <a href="mailto:$SiteConfig.Email">$SiteConfig.Email</a><% end_if %>
		</div>
	</div>
</footer>