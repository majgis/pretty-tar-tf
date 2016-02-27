# pretty-tar-tf

Pretty print data piped from `tar -tf` for npm packaged .tgz files.

It strips the package prefix.

If node_modules are included they are listed at the end and the files are 
omitted.

# install

    npm i -g pretty-tar-tf


## Usage

    tar -tf myapp-1.1.1.tgz | pretty-tar-tf
    
    package.json
    .npmignore
    README.md
    app.js
    index.js

    lib/
      api.js
      health.js
      log.js

    views/
      hello.hbs
      laborday.hbs
      partner.hbs


    node_modules/
      body-parser
      express
      express-handlebars
