<% include Header %>

<main class="container-xl my-3 my-md-5">
    <% if not $Photo %>
        <div class="row">
            <div class="col">
                <div class="content-header mb-4">
                    $Breadcrumbs
                    <h1>$Title</h1>
                </div>
            </div>
        </div>
    <% end_if %>
    <div class="row">
		<div class="col-md-12">
			<div id="content">
                <% if $Query %>
                    <p class="searchQuery">You searched for &quot;{$Query}&quot;</p>
                    <% if $Results %>
                        <ul id="SearchResults">
                            <% loop $Results %>
                            <li>
                                <h4>
                                    <a href="$Link">
                                        <% if $MenuTitle %>
                                        $MenuTitle
                                        <% else %>
                                        $Title
                                        <% end_if %>
                                    </a>
                                </h4>
                                <div class="results-url">$AbsoluteLink</div>
        						<% if $Content %>
        							$Content.Summary(25)
        						<% end_if %>
                            </li>
                            <% end_loop %>
                        </ul>
                    <% else %>
                        <p>Sorry, your search query did not return any results.</p>
                    <% end_if %>

                    <% if $Results.MoreThanOnePage %>
                        <nav aria-label="Previous Shows Navigation">
                            <ul class="pagination justify-content-center my-4">
                                <% if $Results.NotFirstPage %>
                                    <li class="page-item">
                                        <a class="page-link previous" aria-label="Previous" href="$Results.PrevLink">
                                            Previous
                                        </a>
                                    </li>
                                <% end_if %>

                                <% loop $Results.PaginationSummary(4) %>
                                    <li class="page-item <% if not $Link || $CurrentBool %>disabled<% end_if %>">
                                        <% if $Link %>
                                            <a class="page-link<% if $CurrentBool %> bg-dark text-white<% end_if %>" href="$Link">$PageNum</a>
                                        <% else %>
                                            <span class="page-link">...</span>
                                        <% end_if %>
                                    </li>
                                <% end_loop %>

                                <% if $Results.NotLastPage %>
                                    <li class="page-item">
                                        <a class="page-link next" href="$Results.NextLink" aria-label="Next">
                                            Next
                                        </a>
                                    </li>
                                <% end_if %>
                            </ul>
                        </nav>
                    <% end_if %>

                    <% else %>

                        <p>No search term specified. Please enter a search term below:</p>
                        $SearchForm
                        <hr />
                <% end_if %>
			</div>
		</div>
	</div>
</main>
