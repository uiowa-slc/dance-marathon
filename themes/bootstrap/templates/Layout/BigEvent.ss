<% include Header %>

<!-- Photo Slideshow -->
<section class="hero-wrapper">
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
</section>

<main class="container-xl my-3 my-md-5">
    <% if $EnableStream %>
    <div class="row">
        <div class="col-lg-12">

            <div class="">
                <% if $StreamCode %>
                    $StreamCode.RAW
                <% end_if %>

            </div>
                <h1>$Title</h1>
                $Content
        </div>
    <% end_if %>
    </div>
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

                <% if not $EnableStream %>
                <h1>$Title</h1>
                $Content
                <% end_if %>
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
                                <a class="nav-link" id="dancers-tab" data-toggle="tab" href="#dancers-leadership" role="tab" aria-controls="dancers-leadership" aria-selected="false">For Dancers and Leadership</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="families-tab" data-toggle="tab" href="#families" role="tab" aria-controls="families" aria-selected="false">For Families</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="alumni-tab" data-toggle="tab" href="#alumni" role="tab" aria-controls="alumni" aria-selected="false">For Alumni</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="remote-tab" data-toggle="tab" href="#remote" role="tab" aria-controls="remote" aria-selected="false">Remote Activities</a>
                            </li>
                        </ul>

                        <div class="tab-content" id="myTabContent" >
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">


                               <% if $UpcomingEvents %>
                                    <div class="event-list">
                                        <% loop $UpcomingEvents %>
                                            <% include BigEventCard %>
                                        <% end_loop %>
                                    </div>
                                <% else %>
                                    <p><% _t('NOEVENTS','There are no events') %>.</p>
                                <% end_if %>

                            </div>
                            <div class="tab-pane fade" id="dancers-leadership" role="tabpanel" aria-labelledby="dancers-tab">
                                <% if $EventsByCategory("dancers and leadership") %>
                                    <div class="event-list">
                                        <% loop $EventsByCategory("dancers and leadership") %>
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
                            <div class="tab-pane fade" id="remote" role="tabpanel" aria-labelledby="remote-tab">
                                <% if $EventsByCategory("remote") %>
                                    <div class="event-list">
                                        <% loop $EventsByCategory("remote") %>
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

