front-end
=========

The repo for the 3.x browser front-end.

DEPENDENCIES
------------

####Node.js

To run the front-end you will need node and a few other things. You can get node from [nodejs.org]
or the package manager of choice (including [homebrew] on OSX).

    brew install node

####ember-cli

You should install ember-cli globally using npm

    npm install -g ember-cli

This will allow you to run `ember` on the command line

####Bower

Bower is used to manage front-end dependencies. It can also be installed with npm

    npm install -g bower

####PhantomJS

To run the integration tests you will need [PhantomJS]. If you are on a Mac, you can install it
via [homebrew].

    brew install phantomjs

HOW TO SERVE THE PROJECT
------------------------

If you are checking the project out for the first time you should install the npm and bower
dependencies, and then serve it with the ember command.

    cd front-end && npm install && bower install
    ember serve

By default, it also requires the ohmage-3.0 [server] to be running on the same machine. This can
be set up by starting tomcat and ember, and using nginx to reverse proxy the `/ohmage` prefix
to tomcat. (tomcat, and nginx can also both be installed with [homebrew])

CONTRIBUTE
----------

If you would like to contribute code to the ohmage front-end you can do so through
GitHub by forking the repository and sending a pull request.

You may [file an issue](https://github.com/ohmage/front-end/issues/new) if you find bugs or would
like to add a new feature.

LICENSE
-------

    Copyright (C) 2014 ohmage

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

[nodejs.org]: http://nodejs.org/
[PhantomJS]: http://phantomjs.org/
[homebrew]: http://brew.sh/
[server]: https://github.com/ohmage/server/tree/ohmage-3.0