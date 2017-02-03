<!doctype html>
<html class="no-js" lang="en">
    <head>
        <title>Livestream from the IMU</title>
        <% base_tag %>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="$Content.LimitCharacters(150)">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="1800">
    <style>
    body{
        margin: 0;
        background: black;
    }

    </style>
    $OpenGraph
    <% include TwitterCard %>
    <title>$Title | $SiteConfig.Title</title>
    <!-- Typekit -->
    <% include TypeKit %>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Place favicon.ico in the root directory -->
    </head>
    <body>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script src="//content.jwplatform.com/players/tO9PdlBo-7EaCFiXK.js"></script>
        <script>
            jwplayer().on('play', function(e) {
                qualities = jwplayer().getQualityLevels();
                if(qualities.length > 1){
                    jwplayer().setCurrentQuality(2);
                }
            });
        </script>
        <% include GoogleAnalytics %>
    </body>
</html>