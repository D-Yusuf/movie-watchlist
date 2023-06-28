// vite.config.js
export default {
    build: {
      outDir: 'dist', // Specify the output directory for the bundled files
      rollupOptions: {
        input: {
          main: './index.html', // The entry point of your application
          watchlist: './public/watchlist.html', // Additional entry points for multiple pages
        //   utils: './public/utils.js' // Additional entry points for multiple pages
        },
        // output: {
        //   entryFileNames: '[name].[hash].js', // Customize the output file names
        //   chunkFileNames: '[name].[hash].js' // Customize the output chunk names
        // }
      }
    }
  }
  