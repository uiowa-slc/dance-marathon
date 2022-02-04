<header class="header">
    <div class="container-xl">
        <% with $SiteConfig %>
			<% if $Countdown %>
                <div class="row">
                    <div class="col-12">
                        <div class="text-center text-light my-2">

                            <% if $CountdownDate.IsToday %>
                                <span class="badge badge-primary">
                                    <span class="countdown">
                                        <strong id="clock">The Big Event is today!</strong>
                                    </span>
                                </span>
                            <% else_if $CountdownDate.InPast %>

                            <% else %>
                                <span class="badge badge-primary">
                                    <span class="countdown">
                                        <strong id="clock">$CountdownDate.TimeDiffIn("days")</strong>
                                        until the Big Event.
                                    </span>
                                </span>
                            <% end_if %>
                        </div>
                    </div>
                </div>
			<% end_if %>
		<% end_with %>
        <div class="row">
            <div class="col-12 col-md-6 order-md-last d-flex align-items-center justify-content-center justify-content-md-end">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link btn btn-sm btn-dark" href="https://dance.dancemarathon.uiowa.edu/">Register</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link btn btn-sm btn-dark" href="https://dance.dancemarathon.uiowa.edu/Profile">Login</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link btn btn-sm btn-primary" href="https://donate.dancemarathon.uiowa.edu">Donate</a>
                    </li>
                </ul>
            </div>
            <div class="col-12 col-md-6">
                <a href="{$BaseUrl}" class="d-block text-center text-md-left">
                    <img src="{$ThemeDir}/dist/images/logo.png" alt="Scope Productions" class="header__logo py-3" />
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <nav class="navbar navbar-expand-lg navbar-dark px-0" aria-label="Site Navigation">
                    <a class="navbar-brand d-lg-none" href="{$BaseUrl}" aria-label="Menu">
                        <span class="">Menu</span>
                    </a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse " id="navbarText">
                        <ul class="navbar-nav w-100 justify-content-between">
                            <% with Page("home") %>
                                <% if $EnableStream %>
                                    <li class="nav-item">
                                        <a class="nav-link" href="$Link">

                                            <svg aria-hidden="true" aria-labelledby="title" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-broadcast" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 0 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707z"/><path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg> Livestream</a></li>
                                <% end_if %>
                            <% end_with %>

                            <% loop $Menu(1) %>
                            <li class="nav-item $LinkingMode nav-item<% if $isCurrent || $isSection %> active<% end_if %><% if Children && $ShowChildrenInDropdown %> dropdown<% end_if %>">
                                <a class="nav-link<% if Children && $ShowChildrenInDropdown %> dropdown-toggle<% end_if %>" href="$Link"  <% if Children && $ShowChildrenInDropdown %> id="navbarDropdown$Pos" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"<% end_if %> >$MenuTitle.XML</a>

                                <% if Children && $ShowChildrenInDropdown %>
                                    <div class="dropdown-menu shadow-sm" aria-labelledby="navbarDropdown$Pos">
                                        <a class="dropdown-item" href="$Link">$MenuTitle</a>
                                        <% loop Children %>
                                            <a class="dropdown-item" href="$Link">$MenuTitle</a>
                                        <% end_loop %>
                                    </div>
                                <% end_if %>

                            </li>
                        <% end_loop %>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</header>
