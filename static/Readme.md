# Static site generator

This is the home for the source files used to build the HTML file in the
public folder.

## Setup

```sh
npm i
```

## Generate HTML files

```sh
make
```

## Where do the files go?

Into the `/public` folder in the root of the project.

## What about the asset folder in /public?

The asset folder (js/css files) continue to be built by webpack.

## What about the img folder in /public?

The img files remain in `/public/img`. Metalsmith writes the html files
but leaves the rest of the directory alone.
