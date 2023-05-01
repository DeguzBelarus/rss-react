// vite.config.ts
import { defineConfig } from "file:///F:/Courses_Front-end/RS-School/my-repo-react-public/rss-react/node_modules/vitest/dist/config.js";
import react from "file:///F:/Courses_Front-end/RS-School/my-repo-react-public/rss-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import viteTsconfigPaths from "file:///F:/Courses_Front-end/RS-School/my-repo-react-public/rss-react/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgrPlugin from "file:///F:/Courses_Front-end/RS-School/my-repo-react-public/rss-react/node_modules/vite-plugin-svgr/dist/index.mjs";
import istanbul from "file:///F:/Courses_Front-end/RS-School/my-repo-react-public/rss-react/node_modules/vite-plugin-istanbul/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false
    }),
    viteTsconfigPaths(),
    svgrPlugin()
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false
      }
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      provider: "istanbul",
      enabled: true,
      all: true,
      include: ["src/**/*"],
      exclude: ["src/types/*", "src/redux/types.ts"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxDb3Vyc2VzX0Zyb250LWVuZFxcXFxSUy1TY2hvb2xcXFxcbXktcmVwby1yZWFjdC1wdWJsaWNcXFxccnNzLXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxDb3Vyc2VzX0Zyb250LWVuZFxcXFxSUy1TY2hvb2xcXFxcbXktcmVwby1yZWFjdC1wdWJsaWNcXFxccnNzLXJlYWN0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9Db3Vyc2VzX0Zyb250LWVuZC9SUy1TY2hvb2wvbXktcmVwby1yZWFjdC1wdWJsaWMvcnNzLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHZpdGVUc2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xuaW1wb3J0IHN2Z3JQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgaXN0YW5idWwgZnJvbSAndml0ZS1wbHVnaW4taXN0YW5idWwnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBpc3RhbmJ1bCh7XG4gICAgICBjeXByZXNzOiB0cnVlLFxuICAgICAgcmVxdWlyZUVudjogZmFsc2UsXG4gICAgfSksXG4gICAgdml0ZVRzY29uZmlnUGF0aHMoKSxcbiAgICBzdmdyUGx1Z2luKCksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtaW5pZnlJbnRlcm5hbEV4cG9ydHM6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICBzZXR1cEZpbGVzOiBbJy4vc3JjL3NldHVwVGVzdHMudHMnXSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6ICdpc3RhbmJ1bCcsXG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgYWxsOiB0cnVlLFxuICAgICAgaW5jbHVkZTogWydzcmMvKiovKiddLFxuICAgICAgZXhjbHVkZTogWydzcmMvdHlwZXMvKicsICdzcmMvcmVkdXgvdHlwZXMudHMnXSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1YLFNBQVMsb0JBQW9CO0FBQ2haLE9BQU8sV0FBVztBQUNsQixPQUFPLHVCQUF1QjtBQUM5QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGNBQWM7QUFFckIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLElBQ0Qsa0JBQWtCO0FBQUEsSUFDbEIsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLHVCQUF1QjtBQUFBLE1BQ3pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVksQ0FBQyxxQkFBcUI7QUFBQSxJQUNsQyxVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxLQUFLO0FBQUEsTUFDTCxTQUFTLENBQUMsVUFBVTtBQUFBLE1BQ3BCLFNBQVMsQ0FBQyxlQUFlLG9CQUFvQjtBQUFBLElBQy9DO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
