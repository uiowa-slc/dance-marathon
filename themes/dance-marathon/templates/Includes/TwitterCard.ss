<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@UIDM">
<meta name="twitter:creator" content="@UIDM">
<meta name="twitter:title" content="$Title.ATT">
<meta name="twitter:description" content="$Content.NoHTML">
<% if $Photo %>
<meta name="twitter:image" content="$Photo.AbsoluteURL">
<% else_if $ClassName == "StreamingPage" %>
<meta name="twitter:image" content="{$absoluteBaseURL}{$ThemeDir}images/og-stream.jpg">
<% else %>
<meta name="twitter:image" content="{$absoluteBaseURL}{$ThemeDir}images/opengraph-default.jpg">
<% end_if %>