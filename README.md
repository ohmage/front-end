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

####ohmage server

By default, it also requires the ohmage-3.0 [server] to be running on the same machine and
accessible at `/ohmage` on the same port.

HOW TO SERVE THE PROJECT
------------------------

If you are checking the project out for the first time you should install the npm and bower
dependencies.

    cd front-end && npm install && bower install

####Production

To build the app for production run

    ember build --environment=production

####Development

During development it is useful to use ember to serve the front end. It will automatically update
the page when it notices changes. It also won't minify the javascript which makes it easier to step
through the code in the browser.

    ember serve

You would then set up a reverse proxy in nginx to forward `/` to`http://localhost:4200/`

Example nginx config:

    location / {
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:4200/;
    }

    location /ohmage {
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:8080/ohmage;
    }

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