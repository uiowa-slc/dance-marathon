<div class="dm-sponsors"><a href="http://www.uihealthcare.com/depts/uichildrenshospital/index.html" target="_blank"><img src="$ThemeDir/images/uichildrenshospital.png" alt="University of Iowa Children's Hospital" title="University of Iowa Children's Hospital" longdesc="http://www.uihealthcare.com/depts/uichildrenshospital/index.html" /></a> 

<!--<a href="http://www.goodsearch.com/" target="_blank"><img src="$ThemeDir/images/goodsearch.png" alt="Good Search" title="Good Search" longdesc="http://www.goodsearch.com/" /></a> -->


<a href="http://www.dancemarathon.org/" target="_blank"><img src="$ThemeDir/images/dm-themarathon.png" alt="Dance Marathon The Marathon" title="Dance Marathon The Marathon" longdesc="http://www.dancemarathon.org/" /></a></div>
<a href="/"><img src="$ThemeDir/images/footerlogo.png" alt="Dance Marathon" title="Dance Marathon" class="logo" longdesc="http://dancemarathon.org" /></a>
<p class="footer-contact">145 Iowa Memorial Union • Iowa City, IA 52242 • (319) 353-2094 • <a href="mailto:dance-marathon@uiowa.edu">dance-marathon@uiowa.edu</a></p>

<ul class="menu">
    <% control Menu(1) %>
                <li class="$URLSegment"><a href="$Link">$Title</a>
                    <ul>
                        <% control Children %>
                            <li><a href="$Link">$Title</a></li>
                        <% end_control %>
                    </ul></li>
            <% end_control %>
</ul>
<p class="copywright">© <a href="http://www.uiowa.edu/">The University of Iowa</a> 2010. All rights reserved.</p>
</div>
