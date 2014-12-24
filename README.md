angular-masonry-directive
=========================

A very simple and 100% compatible masonry directive for AngularJS ... do you know how to use masonry? Good! You know how to use this

This directive is meant for the raw masonry lib and not the jQuery one.

# How to use

> First you include it on your app

```html
<script src="angular-masonry-directive.js"></script>
```

> Then setup your app

```javascript
var myApp = angular.module('MyApp',['masonry']);
```

> And then just use it (note that the masonry directive uses the same pattern as the masonry directive uses http://masonry.desandro.com/

```html
<div masonry='{ "transitionDuration" : "0.4s" , "itemSelector" : ".tile"}'>
  <!-- items -->
  <div masonry-tile ng-repeat="item in items">
        
  </div>
</div>
```
