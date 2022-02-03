# PRISM Typescript/Tailwind/Vite POC

## Dev Quickstart

`yarn & yarn dev` To install dependencies and launch a dev server:

`yarn build` Will transpile ES and UMD flavors of modules - both are available for consumption. Notably, [UMD modules](https://github.com/umdjs/umd) which are capable of working everywhere, be it in the client, on the server or elsewhere. This includes compatability with `require` and `import` syntaxes with special-casing to handle CommonJS compatability.

## Using in a project

`import 'dist/style.css' from 'prism-tw-poc' // 14.5k (gzipped: 3.26K)`
`import { Box, Button, Text } from 'prism-tw-poc' // 4.3k (gzipped: 1.6K)`

## Development Folders

### `/lib`

This is where your main component library code lives. Only the contents of this folder will be included with a build output.

### `/src`

This is where a ViteJS powered SPA resides with full access to your library. This is useful for development iteration. This is not included in the build output.


## Tech Stack

- [Tailwind3](https://tailwindcss.com/docs/configuration)
