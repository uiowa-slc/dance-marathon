<div class="card mt-4">
    <div class="row">

        <!-- Photo -->
        <%-- <% if Photo %> --%>
            <div class="col-sm-3 col-md-4 order-sm-last">
                <img src="https://via.placeholder.com/400" class="card-img" alt="" loading="lazy">
                <%-- <img src="{$Event.PagePhoto.FocusFill(400,400).URL}" class="card-img" alt="$Title" loading="lazy"> --%>
            </div>
        <%-- <% end_if %> --%>
        
        <div class="col-sm">
            <div class="card-body">
                <h3 class="card-title">
                    Title Goes Here<% if $Event.VirtualEventLink %>(Virtual)<% end_if %>
                </h3>
                <p>
                    <small>
                    
                    <!-- Date -->
                    <i class="fas fa-calendar-alt"></i> Mon, Oct. 15, 2018<br>
                    <% if $DateRange %>
                        <i class="fas fa-calendar-alt"></i> $DateRange<br>
                    <% end_if %>

                    <!-- Time -->
                    <i class="fas fa-clock"></i> 5:00pm — 8:00pm<br>
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
                    
                    <!-- Location -->
                    <i class="fas fa-map-marker-alt mr-1"></i> Event Location<br>
                    <% if $Event.EventLocation %>
                        <i class="fas fa-map-marker-alt mr-1"></i> $Event.EventLocation
                    <% end_if %>

                    <!-- Virtual Event URL -->
                    <i class="fas fa-laptop-house"></i> Virtual Event<br>
                    <% if $Event.VirtualEventLink %>
                        <i class="fas fa-laptop-house"></i>Virtual Event<br>
                    <% end_if %>
                    </small>
                </p>

                <!-- Content -->
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                <% with Event %>
                    <p class="card-text">$Content</p>
                <% end_with %>

                                
                <!-- Virtual Event URL -->
                <a href="#" class="btn btn-primary my-1" target="_blank" rel="noopener norefferer">Join Virtual Event</a>
                <% if $Event.VirtualEventLink %>
                    <a href="$Event.VirtualEventLink" class="btn btn-primary my-1" target="_blank" rel="noopener norefferer">Join Virtual Event</a>
                <% end_if %>
            </div>
        </div><!-- end .col -->
    </div><!-- end .row -->
</div><!-- end .list-item -->


