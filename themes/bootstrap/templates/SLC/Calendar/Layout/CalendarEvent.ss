<% include Header %>

<main class="container-xl my-3 my-md-5">
    <div class="row">
        <div class="col">
            <div class="content-header mb-4">
                $Breadcrumbs
                <h1>$Title</h1>
            </div>
        </div>
    </div>
    <div class="row">
		<div class="col-lg-8">
            <article id="content">
                <% if $IsLateNight %>
                    <img class="float-left w-50 mr-4 mb-4" alt="Late Night Programs Flag" role="presentation" src="$ThemeDir/dist/images/latenightbanner.png" />
                <% end_if %>

                <% if $Image.URL %>
                    <img class="float-left w-50 mr-4 mb-4" src="$Image.ThumbURL" alt="Poster for this event. Please read the event description for more information." loading="lazy" />
                <% end_if %>
				<% if $Dates || $Venue || $Location || $OnlineLocationUrl || $isOnline %>


                <% loop $DateTimes %>
					<p class="m-0">                    <!-- Date -->
                    <% if $DateRange %>
                        <i class="fas fa-calendar-alt"></i> $DateRange<br>
                    <% end_if %>

                    <!-- Time -->
                    <% if $TimeRange %>
                        <% if AllDay %>
                            <% _t('ALLDAY','All Day') %>
                            <% else %>
                            <% if StartTime %>
                                <i class="fas fa-clock"></i> $TimeRange
                            <% end_if %>
                        <% end_if %>
                        <br>
                    <% end_if %>
                        </p>
                <% end_loop %>
                    <p>
                   <% if $isOnline %>
                    <strong>Location:</strong> Online <i aria-hidden="true" class="fas fa-laptop-house"></i><br />
                    <% else %>

    					<% if $Venue.Title || $Location %>
    					<strong> Location: </strong>
    						<span itemprop="location">
    							<% if $Location %> $Location<% if $Venue.Title %>,<% end_if %> <% end_if %>
    							<% if $Venue.Title %>
    								<% with $Venue %>
    									$Title
    								<% end_with %>
    							<% end_if %>
    						</span>
    					<% end_if %>
                    <% end_if %>
					</p>
				<% end_if %>
                <% if $OnlineLocationUrl %>
                    <% if $OnlineLocationType == "Zoom" %>
                        <p><a class="btn btn-primary btn-zoom" href="$OnlineLocationUrl" rel="noopener" target="_blank">Zoom link <i aria-hidden="true" class="fas fa-video"></i></a></p>
                    <% else %>
                        <p><a class="btn btn-primary" href="$OnlineLocationUrl" rel="noopener" target="_blank">Virtual event link <i aria-hidden="true" class="fas fa-external-link-alt"></i></a></p>
                    <% end_if %>
                <% end_if %>

				<div class="content">$Content</div>

				<% if $Dates.Count > 1 %>
					<h2>All dates for this event:</h2>
					<ul>
						<% loop $Dates %>
							<li><% include DateTimesList %></li>
						<% end_loop %>
					</ul>
				<% end_if %>

				<% if $Sponsor %>
						<p>Sponsored by: $Sponsor</strong></p>
                <% end_if %>

                <% if $ContactEmail %>
                    <hr />
                    <p>Questions about this event?
                        <% if $ContactName %>
                            <a href="mailto:$ContactEmail" class="report-problem-link">Contact {$ContactName}.</a>
                        <% else %>
                            <a href="mailto:$ContactEmail" class="report-problem-link">Email {$ContactEmail}.</a>
                        <% end_if %>
                        </a>
                    </p>
                <% end_if %>

				<p><i>Individuals with disabilities are encouraged to attend all University of Iowa–sponsored events.

				<% if $ContactName %>

					<% if $ContactPhone && $ContactEmail %>
						If you are a person with a disability who requires a reasonable accommodation in order to participate in this program, please contact {$ContactName} in advance at <a href="tel:{$ContactPhone}">{$ContactPhone}</a> or <a href="mailto:{$ContactEmail}">{$ContactEmail}</a>.
					<% else_if $ContactEmail %>
						If you are a person with a disability who requires a reasonable accommodation in order to participate in this program, please contact {$ContactName} in advance at <a href="mailto:{$ContactEmail}">{$ContactEmail}</a>.
					<% else_if $ContactPhone %>
						If you are a person with a disability who requires a reasonable accommodation in order to participate in this program, please contact {$ContactName} in advance at <a href="tel:{$ContactPhone}">{$ContactPhone}</a>.
					<% end_if %>
				<% else %>
						If you are a person with a disability who requires a reasonable accommodation in order to participate in this program, please contact the Office of the Vice President for Student Life in advance at <a href="tel:319-335-3557">319-335-3557</a> or <a href="mailto:vp-student-life@uiowa.edu">vp-student-life@uiowa.edu</a>.
				<% end_if %>

				</i>
				</p>
                $Form
    			$PageComments
			</article>
        </div>
        <div class="col-lg-4">
            <div class="border-left pl-4">


                <% if $Cost %>
                    <p><strong>Cost:</strong><br /> $Cost </p>
                <% end_if %>

                <% if $Sponsor %>
                    <p><strong>Sponsor:</strong><br /> $Sponsor </p>
                <% end_if %>

                <% if $MoreInfoLink %>
                    <p><a href="$MoreInfoLink" class="btn btn-secondary" target="_blank">Event website <i aria-hidden="true" class="fas fa-external-link-alt"></i></a></p>
                <% end_if %>

                <% if $UiCalendarLink %>
                    <p>
                        <% if $UiCalendarLink %>
                            <a href="$UiCalendarLink" class="btn btn-secondary mb-2" target="_blank">View on the UI Events Calendar <i aria-hidden="true" class="fas fa-external-link-alt"></i></a>
                        <% end_if %>
                        <%-- <a class="btn btn-secondary" href="$CalendarLink">Add to your calendar <i aria-hidden="true" class="fas fa-calendar-alt"></i></a> --%>
                    </p>
                <% end_if %>


                <% if $Categories %>
                    <p>Categorized under:<br />
                    <% loop $Types %>
                        <a href="$Link" class="btn btn-outline-secondary btn-sm m-1">$Title</a>
                    <% end_loop %></p>
                <% end_if %>
            </div>
        </div>
	</div>
</main>
