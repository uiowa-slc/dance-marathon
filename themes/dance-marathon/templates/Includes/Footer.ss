<!-- Footer -->
<footer class="footer" role="contentinfo">
	<span class="stripes"></span>
	<div class="footer-social">
		<div class="container">
			<h4 class="connect-us"><img src="{$ThemeDir}/dist/images/footer-dancers.gif" alt="Connect with us"> Connect With Us</h4>
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
						<a href="$SiteConfig.YoutubeLink" title="Youtube" target="_blank" class="icon-youtube"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.InstagramLink %>
					<li>
						<a href="$SiteConfig.InstagramLink" title="Instagram" target="_blank" class="icon-instagram"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.PinterestLink %>
					<li>
						<a href="$SiteConfig.PinterestLink" title="Pinterest" target="_blank" class="icon-pinterest"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.WordpressLink %>
					<li>
						<a href="$SiteConfig.WordpressLink" title="Wordpress" target="_blank" class="icon-wordpress"></a>
					</li>
				<% end_if %>
			</ul>
			<a href="https://donate.dancemarathon.uiowa.edu" class="footer-donate">Donate</a>
		</div>
	</div>
	<div class="footerlinks">
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
				<a href="{$BaseHref}"><img src="{$ThemeDir}/dist/images/footer-uidm.gif" alt="University of Iowa Dance Marathon"></a>
			</div>
			<div class="logo-container">
				<a href="http://dancemarathon.com/" target="_blank"><img src="{$ThemeDir}/dist/images/miracle-network-dm.png" alt="Miracle Network Dance Marathon"></a>
			</div>
			<div class="logo-container">
				<a href="http://give.childrensmiraclenetworkhospitals.org/" target="_blank"><img src="{$ThemeDir}/dist/images/miracle-network.png" alt="Childrens miracle network logo"></a>
			</div>
			<div class="logo-container">
				<a href="http://www.uichildrens.org/" target="_blank"><img src="{$ThemeDir}/dist/images/childrens-hospital.png" alt="University of Iowa Stead Family Childrens Hospital"></a>
			</div>
		</div>
	</div>
	<div class="copyright">
		<div class="container">
        <p>&copy; 1995 - $Now.Year <a href="http://www.uiowa.edu/" target="_blank">The University of Iowa</a>. All Rights Reserved. <a href="http://www.uiowa.edu/homepage/online-privacy-information" class="footer__bar-link" target="_blank" rel="noopener">Privacy Information</a> <a href="https://opsmanual.uiowa.edu/community-policies/nondiscrimination-statement" class="footer__bar-link" target="_blank" rel="noopener">Nondiscrimination Statement</a> <a href="https://uiowa.edu/accessibility" target="_blank" class="footer__bar-link" >Accessibility</a> Created by <a href="https://slc.studentlife.uiowa.edu/" target="_blank" rel="noopener">Student Life Communications</a></p>
		</div>
	</div>
</footer>
