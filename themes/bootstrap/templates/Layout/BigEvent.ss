<% include Header %>

<!-- Photo Slideshow -->
<div class="hero-wrapper">
    <div class="hero-carousel">
        <% if $TopPhotoOne %>
            <div class="home-heroimg carousel-cell" data-flickity-bg-lazyload="$TopPhotoOne.FocusFill(1500,350).URL"></div>
        <% end_if %>
        <% if $TopPhotoTwo %>
            <div class="home-heroimg carousel-cell" data-flickity-bg-lazyload="$TopPhotoTwo.FocusFill(1500,350).URL"></div>
        <% end_if %>
        <% if $TopPhotoThree %>
            <div class="home-heroimg carousel-cell" data-flickity-bg-lazyload="$TopPhotoThree.FocusFill(1500,350).URL"></div>
        <% end_if %>
    </div>
</div>

<main class="container-xl my-3 my-md-5">
    <div class="row">

        <!-- Sidebar -->
        <div class="col-lg-4 col-xl-3 order-lg-last">
            <% if $Sidebar %>
                <div class="sidebar-content">
                    $Sidebar
                </div>
            <% end_if %>
        </div>

		<div class="col-lg-8 col-xl-9">
            <article id="content">
                <% if $EnableStream %>
                    <div class="">
                        <% if $StreamCode %>
                            $StreamCode.RAW
                        <% else %>
                            <script src="https://cdn.jwplayer.com/players/z2z9XSYM-7EaCFiXK.js"></script>
                        <% end_if %>
                        <div class="share-sheet">
                            <p class="share-sheet__text">Share:
                                <a class="share-sheet__button share-sheet__button--fb icon-facebook" href="javascript:window.open('http://www.facebook.com/sharer/sharer.php?u={$absoluteBaseURL}stream', '_blank', 'width=400,height=500');void(0);" title="Facebook"></a>
                                <a  href="https://twitter.com/intent/tweet?text={$absoluteBaseURL}stream" target="_blank" class="share-sheet__button share-sheet__button--twitter icon-twitter" title="Twitter"></a>
                            </p>
                        </div>
                    </div>
                <% end_if %>

                <h1>$Title</h1>
                $Content
                $Form
                $PageComments
                <div class="row">
                    <div class="col">
                        <hr class="my-5" />
                        <h2 class="mb-2">Events</h2>


                        <!-- Nav tabs -->
                        <ul class="nav nav-pills " id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">All Events</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="dancers-tab" data-toggle="tab" href="#dancers" role="tab" aria-controls="dancers" aria-selected="false">For Dancers</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="leadership-tab" data-toggle="tab" href="#leadership" role="tab" aria-controls="leadership" aria-selected="false">For Leadership</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="families-tab" data-toggle="tab" href="#families" role="tab" aria-controls="families" aria-selected="false">For Families</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="alumni-tab" data-toggle="tab" href="#alumni" role="tab" aria-controls="alumni" aria-selected="false">For Alumni</a>
                            </li>
                        </ul>

                        <div class="tab-content" id="myTabContent" >
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">


                               <% if $AllEvents %>
                                    <div class="event-list">
                                        <% loop $AllEvents %>
                                            <% include BigEventCard %>
                                        <% end_loop %>
                                    </div>
                                <% else %>
                                    <p><% _t('NOEVENTS','There are no events') %>.</p>
                                <% end_if %>

                            </div>
                            <div class="tab-pane fade" id="dancers" role="tabpanel" aria-labelledby="dancers-tab">
                                <% if $EventsByCategory("dancers") %>
                                    <div class="event-list">
                                        <% loop $EventsByCategory("dancers") %>
                                            <% include BigEventCard %>
                                        <% end_loop %>
                                    </div>
                                <% else %>
                                    <p><% _t('NOEVENTS','There are no events') %>.</p>
                                <% end_if %>
                            </div>
                            <div class="tab-pane fade" id="leadership" role="tabpanel" aria-labelledby="leadership-tab">
                                <% if $EventsByCategory("leadership") %>
                                    <div class="event-list">
                                        <% loop $EventsByCategory("leadership") %>
                                            <% include BigEventCard %>
                                        <% end_loop %>
                                    </div>
                                <% else %>
                                    <p><% _t('NOEVENTS','There are no events') %>.</p>
                                <% end_if %>
                            </div>
                            <div class="tab-pane fade" id="families" role="tabpanel" aria-labelledby="families-tab">
                                <% if $EventsByCategory("families") %>
                                    <div class="event-list">
                                        <% loop $EventsByCategory("families") %>
                                            <% include BigEventCard %>
                                        <% end_loop %>
                                    </div>
                                <% else %>
                                    <p><% _t('NOEVENTS','There are no events') %>.</p>
                                <% end_if %>
                            </div>
                            <div class="tab-pane fade" id="alumni" role="tabpanel" aria-labelledby="alumni-tab">
                                <% if $EventsByCategory("alumni") %>
                                    <div class="event-list">
                                        <% loop $EventsByCategory("alumni") %>
                                            <% include BigEventCard %>
                                        <% end_loop %>
                                    </div>
                                <% else %>
                                    <p><% _t('NOEVENTS','There are no events') %>.</p>
                                <% end_if %>
                            </div>
                        </div>

                    </div>
                </div>
			</article>
		</div>
	</div>
</main>

