# cine.io Example Application Node.js

This is an example application in Node.js showing the capabilities of [cine.io](https://www.cine.io). It uses the [cine.io JS SDK](https://github.com/cine-io/js-sdk) and the [cine.io Node.js package](https://github.com/cine-io/cineio-node).


## How to Use

1. Sign up for your own API key at cine.io.
1. Set up your environment:

    ```term
    $ export CINE_IO_PUBLIC_KEY='<your cine.io project public key>'
    $ export CINE_IO_SECRET_KEY='<your cine.io project secret key>'
    ```

1. install your packages:
    ```term
    $ npm install
    ```

1. Run the server:
    ```term
    $ node index.js
    ```

### Deploy this app to heroku

```term
git clone git@github.com:cine-io/cineio-node-example-app.git
cd cineio-node-example-app/
heroku apps:create
git push heroku master
heroku addons:add cine
heroku open
```
