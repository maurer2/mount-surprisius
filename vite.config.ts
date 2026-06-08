import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import type { Logger } from 'babel-plugin-react-compiler';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [
        reactCompilerPreset({
          logger: {
            logEvent(filename, event) {
              switch (event.kind) {
                case 'CompileSuccess': {
                  console.log(`✅ Compiled: ${filename}`);
                  break;
                }
                case 'CompileError': {
                  console.log(`❌ Skipped: ${filename}`);
                  break;
                }
                default: {
                }
              }
            },
          } satisfies Logger,
        }),
      ],
    }),
  ],
  server: {
    port: 5173,
    strictPort: false,
  },
});
