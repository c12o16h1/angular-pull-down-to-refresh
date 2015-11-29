# angular-pull-down-to-refresh
Pull down to refresh for mobile

## Installation
+ Install with [bower](http://bower.io/)

``` bash
$ bower install angular-pull-down-to-refresh --save
```
+ Include the required files:

``` html
<link rel="stylesheet" href="bower_components/angular-pull-down-to-refresh/angular-pull-down-to-refresh.css">
<script src="bower_components/angular-pull-down-to-refresh/angular-pull-down-to-refresh.js"></script>
```
+ Inject the `c12o16h1.pullDownToRefresh` module into your app:

``` javascript
angular.module('myApp', ['c12o16h1.pullDownToRefresh']);
```
## Usage

``` html
<div class="container-fluid">
    <div class="container-panel" pull-down-to-refresh="pathReload()">
    </div>
</div>
```

``` javascript
'use strict';
myApp
    .controller('Test', ['$scope','$timeout',  function($scope, $timeout) {
        $scope.pathReload = function(){
            $timeout(function(){
                $window.location.reload();
            },50);
        };
    }]);
```

## Authors

**Yurii Kovalenko**

+ http://github.com/c12o16h1

## Copyright and license

  The MIT License

  Copyright (c) 2015 Yurii Kovalenko

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
