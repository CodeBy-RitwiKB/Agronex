# 🌸 Bloom Effect (Theme Transition)

A premium, high-fidelity Radial Bloom theme transition library for React.

## Deployment to NPM

To turn this into a real NPM package, follow these steps:

### 1. Initialize Package
Create a new directory and run:
```bash
npm init -y
```

### 2. Add Dependencies
Add these to your `package.json` as `peerDependencies`:
```json
"peerDependencies": {
  "react": "^18.0.0",
  "framer-motion": "^10.0.0",
  "lucide-react": "^0.200.0"
}
```

### 3. Build Configuration
Use a library-mode bundler like Vite. Your `vite.config.js` should look like this:
```javascript
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'AgrinexBloom',
      fileName: (format) => `agrinex-bloom.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'framer-motion', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'framer-motion': 'FramerMotion',
          'lucide-react': 'LucideReact'
        }
      }
    }
  }
})
```

### 4. Publish
```bash
npm publish --access public
```

---
*Created with ❤️ by Ritwik*
