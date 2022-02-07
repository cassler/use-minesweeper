# Minesweeper React

## Demo Quickstart

`yarn & yarn dev` To install dependencies and launch a dev server on Vite.

`yarn build` Will transpile ES and UMD flavors of modules - both are available for consumption. Notably, [UMD modules](https://github.com/umdjs/umd) which are capable of working everywhere, be it in the client, on the server or elsewhere. This includes compatability with `require` and `import` syntaxes with special-casing to handle CommonJS compatability.

## Using in a project

`yarn install useMinesweeper`

To use as a custom hook with your own markup:

`import { useMinesweeper } from '@cassler/minesweeper`

To use the included component

`import { Minesweeper } from '@cassler/minesweeper'`

## Development Folders

This is where a ViteJS powered SPA resides with full access to your library. This is useful for development iteration. This is not included in the build output.


## Tech Stack

- [Tailwind3](https://tailwindcss.com/docs/configuration)
