
<div id="main-content">
<div id="content-header"></div>
<div id="content-body-interior" class="typography">


<div id="interior-content">

<div id="breadcrumbs">$Breadcrumbs </div>


<% if ContentImage %>
<div class="image">
<img src="<% control ContentImage %><% control SetWidth(386) %> $URL <% end_control %><% end_control %>" alt="$Title"/>
</div>
<% end_if %> 

<h1>$Title</h1>
 <% if Query %>
    <p class="searchQuery"><strong>You searched for &quot;{$Query}&quot;</strong></p>
  <% end_if %>
 
  <% if Results %>
    <ul id="SearchResults">
      <% control Results %>
        <li>
          <a class="searchResultHeader" href="$Link">
            <% if MenuTitle %>
              $MenuTitle
            <% else %>
              $Title
            <% end_if %>
          </a>
          $Content.Summary(50)
         
        </li>
      <% end_control %>
    </ul>
  <% else %>
    <p>Sorry, your search query did not return any results.</p>
  <% end_if %>
 
  <% if Results.MoreThanOnePage %>
    <div id="PageNumbers">
      <% if Results.NotLastPage %>
        <a class="next" href="$Results.NextLink" title="View the next page">Next</a>
      <% end_if %>
      <% if Results.NotFirstPage %>
        <a class="prev" href="$Results.PrevLink" title="View the previous page">Prev</a>
      <% end_if %>
      <span>
        <% control Results.Pages %>
          <% if CurrentBool %>
            $PageNum
          <% else %>
            <a href="$Link" title="View page number $PageNum">$PageNum</a>
          <% end_if %>
        <% end_control %>
      </span>
      <p>Page $Results.CurrentPage of $Results.TotalPages</p>
    </div>
  <% end_if %>
</div><!--end content-->

<% include SocialMedia %>
</div><!--end content body-->
<div id="content-bottom"></div>

</div><!--end main-content-->

