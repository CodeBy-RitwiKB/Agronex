# 🌸 Bloom Effect: The Engine-Only Guide

This guide explains how to use the **Bloom Engine** with your own custom icons, buttons, and styles. Use this if you want the "Majestic Bloom" transition but don't want to use our default Sun/Moon icons.

---

## 🚀 Using the Engine (`BloomReveal`)

The `BloomReveal` component is "headless"—it provides the animation logic but has zero styling of its own. You can wrap it around ANY button.

### 1. Simple Usage with Custom Icon
```jsx
import { BloomReveal } from '@bloom';
import { MyCustomIcon } from './MyIcons';

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <BloomReveal isDarkMode={isDark} onToggle={setIsDark}>
       {/* Use your own custom button and icon here */}
       <button className="my-custom-btn">
          <MyCustomIcon />
       </button>
    </BloomReveal>
  );
}
```

### 2. How it works
- **Mouse Detection**: `BloomReveal` automatically detects where you clicked your custom button and starts the circle from that exact pixel.
- **Theme Swap**: It handles the `document.startViewTransition` API for you, ensuring the new theme is "painted" inside the growing circle.
- **Zero Dependencies**: If you use `BloomReveal` instead of `ThemeToggle`, you **do not need** Framer Motion or Lucide React. You only need standard React.

---

## 🛠 Advanced Customization

### Changing the Animation Speed
Pass the `duration` prop (in seconds) to speed up or slow down the wash.
```jsx
<BloomReveal duration={3} ... />
```

### Supporting Older Browsers
The engine automatically detects browser support. If a user is on an old version of Safari or Internet Explorer, it will simply swap the theme instantly without the circle, so your app never breaks.

---
*Developed for total creative freedom by Ritwik Banerjee.*
