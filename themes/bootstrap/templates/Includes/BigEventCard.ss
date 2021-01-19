<div class="card mt-4">
    <div class="row">

        <!-- Photo -->
        <% if $Event.Photo %>
            <div class="col-sm-3 col-md-4 order-sm-last d-flex align-items-center">
                <img src="{$Event.Photo.FocusFill(400,400).URL}" class="card-img" alt="$Title" loading="lazy">
            </div>
        <% end_if %>

        <div class="col-sm">
            <div class="card-body">
                <h3 class="card-title">
                    $Title<% if $Event.isOnline %> (Virtual)<% end_if %>
                </h3>
                <p>
                    <small>
                    <!-- Date -->
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

                    <!-- Location -->
                    <% if $Event.Location %>
                        <i class="fas fa-map-marker-alt mr-1"></i> $Event.Location
                        <br>
                    <% end_if %>

                    <!-- Virtual Event URL -->
                    <% if $Event.isOnline %>
                        <i class="fas fa-laptop-house"></i>Virtual Event<br>
                    <% end_if %>
                    </small>
                </p>

                <% if $Event.Content %>
                <p class="card-text">$Event.Content</p>
                <% end_if %>

                <!-- Virtual Event URL -->
                <% if $Event.OnlineLocationUrl %>
                    <a href="$Event.OnlineLocationUrl" class="btn btn-primary my-1" target="_blank" rel="noopener norefferer">Join Virtual Event</a>
                <% end_if %>
            </div>
        </div><!-- end .col -->
    </div><!-- end .row -->
</div><!-- end .list-item -->


