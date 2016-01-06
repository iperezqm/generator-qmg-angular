<!DOCTYPE html>
<%%= generatedFileWarning %>
<html lang="en" ng-app="<%= angularModule %>">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <title ng-bind="state.current.data.title + ' | <%= applicationTitle %>'"><%= applicationTitle %></title>
        <link href="css/<%= outfileName %>.css" rel="stylesheet">
    </head>
    <body>
        <!-- Google Tag Manager -->
        <noscript><iframe src="//www.googletagmanager.com/ns.html?id=<%%= googleTagManagerId %>"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager -->
        <div ui-view>
        </div>
        <script src="js/dependencies.js"></script>
        <script src="js/app.js"></script>
        <script src="js/config.js"></script>
        <script src="js/templates.js"></script>
    </body>
</html>
