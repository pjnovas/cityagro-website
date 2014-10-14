cityagro website
================

# How to

**[NodeJS](http://nodejs.org/) v0.10.x is required**  
**[MongoDB](https://www.mongodb.org/) v2.4.x is required**

### Install Dependencies and build client scripts

### Install [GruntJS](http://gruntjs.com/)
This will put the `grunt` command in your system path

In order to get started, you'll want to install grunt's command line interface (CLI) globally.

```bash
npm install -g grunt-cli
```

### Install Project Dependencies

```bash
npm install
```

------------

### Configurations
Create a `config.dev.json`, `config.test.json` or `config.prod.json`

------------

## Production/ Only run server

```bash
grunt prod
```

### Run Server

```bash
npm start
```

### Run Server with forever

```bash
NODE_ENV=production PORT=3800 forever start /usr/local/cityagro_website/bin/www
```


------------

## Development

### Run tests for Server API

```bash
npm test
```

### Compile Client project

```bash
grunt
```

or set a Watcher while you work

```bash
grunt w
```

### Run Server

```bash
npm start
```


#### What does this do?
1. Run Browserify inside the `/client` compiling the entire Backbone Application
2. Clean directory `/client/dist`
3. Add compilation files like `app.js`, `vendor.js`
4. Copy all files from `/client/dist` to `/public` so Website has access to it

