## Percolation
This is a demo of percolation in a 2D mesh.

It uses d3.js, and contains a build system that makes it easy to deploy onto a blog.

## Installation

    git clone https://github.com/mvanaltvorst/percolation
    cd percolation
    npm install

## Technical details
The `src/` directory contains the actual JavaScript code, with `index.js` being the entry point.
In `dist/index.html`, you can find the HTML.

During development, you can use `npm run dev` to run the development server, 
available on `localhost:8080`. 

## Deploy
To deploy, run `npm run build`. This transpiles all javascript into the `src/` directory into a single file: `dist/main.js`. After this, you can deploy this code to e.g. a blog. 

Note that this bundle contains a copy of the `d3` library. If you want to deploy multiple demos like these on the same page, it would be more efficient to import this library only once. 

## Purpose of transpilation
It would be easier to directly write your JavaScript code into `dist/main.js`. The advantage of this system using webpack that transpiles the `src/` directory into a single bundle is that you can use modern JavaScript ES6 features on older browsers: webpack simply translates your modern JavaScript into JavaScript that does not use modern features. This system also makes it possible to split your code into multiple files.