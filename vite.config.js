import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from 'tailwindcss';
import apply from 'postcss-apply';
import autoprefixer from "autoprefixer";
import { name, version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    /**
     * Include preset to use Tailwind3's JIT compiler with Vite's included CSS
     * configuration while autoprefixing as needed.
     */
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        apply()
      ],
    }
  },
  build: {
    /**
     * Create a single bundle consisting of all imports to the `entry` file.
     * Use the `name` and `version` from package.json to generate a unique name.
     * @see https://vitejs.dev/config/#build-bundler
     */
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: name,
      // we can build a super complex filename
      // fileName: (format) => `${name}.${version}.${format}.js`,
      // or we can just...
      fileName: (format) => `${name}${format === 'umd' ? '.umd' : ''}.js`
    },
    /**
     * Externalize our peer dependencies from the bundle explicitly.
     * @remark Dependencies will be included in bundle if not listed below!
     */
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        compact: true,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // Rename default stylesheet to follow JS filename convention.
        // Uncomment this for a semver filename instead of 'style.css'
        // assetFileNames: (assetInfo) => {
          // const isStylesheet = assetInfo.name === 'style.css';
          // return isStylesheet ? `${name}-${version}.min.css` : assetInfo.name
        // },
      },
    },
  },
});
