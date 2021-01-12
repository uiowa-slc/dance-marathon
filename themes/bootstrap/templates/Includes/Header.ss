<header class="header">
    <div class="container-xl">
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
                <a href="{$BaseUrl}" class="d-flex justify-content-center justify-content-md-start">
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
                            <% loop $Menu(1) %>
                            <li class="nav-item $LinkingMode nav-item<% if $isCurrent || $isSection %> active<% end_if %><% if Children %> dropdown<% end_if %>">
                                <a class="nav-link<% if Children %> dropdown-toggle<% end_if %>" href="$Link"  <% if Children %> id="navbarDropdown$Pos" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"<% end_if %> >$MenuTitle.XML</a>

                                <% if Children %>
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
