# wp-angular-gulp

A bare-bones blog app running on AngularJS and Gulp designed to work with the Wordpress [JSON REST API](http://wp-api.org).

## Demo

coming soon...

This project is initiated with intention of testing Gulp over Grunt, later on integrated with AngularJS and WPApi to give
the full application picture.

Here is an outline of the folder structure:

```
./src
   |- app               // The Angular app itself.
   |   |- about         // The various sections are in their
   |   |- blog          // own folders
   |   |- post
   |   |- home
   |
   |- index.jade
   |- css              // All styling for the app. Each section has its own
                        // .less file, which are imported into the main.less file.

./dist                  // minified, concatenated distribution build created by Gulp.
```
