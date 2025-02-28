# UnoCSS Mingled Preset

<p align="center">
  <img src="https://raw.githubusercontent.com/softkittens/unocss-preset-mingled/main/logo.png" alt="UnoCSS Mingled Preset" width="180" />
</p>

<p align="center">
  A concise CSS language for <a href="https://github.com/unocss/unocss">UnoCSS</a> that embraces being mingled with your HTML
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/unocss-preset-mingled"><img src="https://img.shields.io/npm/v/unocss-preset-mingled.svg" alt="npm package"></a>
  <a href="https://github.com/softkittens/unocss-preset-mingled/blob/main/LICENSE"><img src="https://img.shields.io/github/license/softkittens/unocss-preset-mingled" alt="license"></a>
</p>

## ✨ Features

- 🔤 **A New CSS Language**: Not just utilities, but a concise syntax for expressing CSS directly
- � **Embrace the Mingle**: Designed to be comfortably mingled with your HTML markup
- �🚀 **Lightweight & Fast**: Minimal footprint with maximum functionality
- 🧩 **Intuitive Syntax**: Simple, memorable property-value pairs
- 🎨 **Themeable**: Works with CSS variables for easy customization
- 📱 **Responsive**: Built-in breakpoint system
- 🔌 **Zero Config**: Works out of the box with sensible defaults

## 📦 Installation

```bash
# npm
npm install unocss-preset-mingled -D

# yarn
yarn add unocss-preset-mingled -D

# pnpm
pnpm add unocss-preset-mingled -D
```

## 🛠️ Setup

Add the preset to your UnoCSS configuration:

```js
// uno.config.js
import { defineConfig } from 'unocss'
import { mingled } from 'unocss-preset-mingled'

export default defineConfig({
  presets: [
    mingled(),
    // ... other presets
  ],
})
```

## 🎯 Quick Start

Mingled is a CSS language that's meant to be mingled directly in your HTML. It uses an intuitive property:value syntax that closely mirrors CSS itself:

```html
<!-- A card component using Mingled language -->
<div class="p:16 r:8 b:#eee bg:white shadow:2|2|10|0|(0,0,0,0.1)">
  <h3 class="f:18 fw:bold mb:8">Card Title</h3>
  <p class="f:14 c:#666 mb:16">This is a simple card built with Mingled.</p>
  <button class="bg:blue c:white p:8|16 r:4 pointer">Learn More</button>
</div>
```

## 📚 Utility Reference

### Layout

#### Height and Width

- `h:{value}`, `w:{value}`: Set height or width
  - Values can be pixels (e.g., `h:200`), percentages (e.g., `w:50%`), or keywords (`full`, `screen`, `fit`)
- `min-h:{value}`, `min-w:{value}`: Set min-height or min-width
- `max-h:{value}`, `max-w:{value}`: Set max-height or max-width
- `size:{value}`: Set both width and height to the same value

Examples:

```html
<div class="h:200">Height 200px</div>
<div class="w:full">Width 100%</div>
<div class="min-h:screen">Minimum height 100vh</div>
<div class="max-w:fit">Maximum width fit-content</div>
<div class="size:50">50px × 50px square</div>
```

#### Flexbox

- `flex`: Set display to flex
- `flex-inline`: Set display to inline-flex
- `flex:{value}`, `flex-inline:{value}`, `flex-col:{value}`: Configure flex container
  - Single number for flex-grow: `flex:1`
  - `{justify}|{align}`: Set justify-content and align-items
    - Justify options: start, end, center, between, around, evenly
    - Align options: start, end, center, stretch, baseline
  - If only `center` is specified, both justify and align will be centered

Examples:

```html
<div class="flex:center">Horizontally and vertically centered</div>
<div class="flex:between|center">Space between, vertically centered</div>
<div class="flex-col:start|stretch">Column flex, start justified, stretched items</div>
<div class="flex:1">Flex grow 1</div>
<div class="flex-inline:center|baseline">Inline flex, centered with baseline alignment</div>
```

#### Positioning

- `abs:{top}|{right}|{bottom}|{left}`: Set absolute positioning
  - Values in pixels, omit a value to skip that side
- `bottom:{value}`, `top:{value}`, `left:{value}`, `right:{value}`: Set individual positions in pixels

Examples:

```html
<div class="abs:10|20|30|40">Absolutely positioned div</div>
<div class="bottom:50">Bottom positioned div</div>
<div class="top:100">Top positioned div</div>
<div class="left:150">Left positioned div</div>
<div class="right:200">Right positioned div</div>
```

### Spacing

#### Margin

- `m:{value}`: Set margin on all sides
  - Use `|` to separate values for top, right, bottom, left
- `mx:{value}`, `my:{value}`: Set horizontal or vertical margins
- `mt:{value}`, `mr:{value}`, `mb:{value}`, `ml:{value}`: Set individual margins

Examples:

```html
<div class="m:10">Margin 10px on all sides</div>
<div class="m:12|16">Margin 12px on top and bottom, 16px on left and right</div>
<div class="m:12|16|8|6">Margin 12px on top, 16px on right, 8px on bottom, 6px on left</div>
<div class="mx:20">Horizontal margin 20px</div>
<div class="my:16">Vertical margin 16px</div>
<div class="mb:30">Bottom margin 30px</div>
<div class="ml:40">Left margin 40px</div>
```

#### Padding

- `p:{value}`: Set padding on all sides
  - Use `|` to separate values for top, right, bottom, left
- `px:{value}`, `py:{value}`: Set horizontal or vertical padding
- `pt:{value}`, `pr:{value}`, `pb:{value}`, `pl:{value}`: Set individual padding

Examples:

```html
<div class="p:10">Padding 10px on all sides</div>
<div class="p:12|16">Padding 12px on top and bottom, 16px on left and right</div>
<div class="p:12|16|8|6">Padding 12px on top, 16px on right, 8px on bottom, 6px on left</div>
<div class="px:20">Horizontal padding 20px</div>
<div class="py:16">Vertical padding 16px</div>
<div class="pb:30">Bottom padding 30px</div>
<div class="pl:40">Left padding 40px</div>
```

### Typography

- `f:{size}`: Set font size in pixels (converted to rem)
- `fw:{weight}`: Set font weight
  - Numeric values or keywords (thin, xlight, light, normal, medium, semibold, bold, xbold, black)
- `bold`, `semi`, `regular`, `medium`: Shorthand for common font weights
- `tt:{transform}`: Set text transform (uppercase, lowercase, capitalize)
- `upper`, `lower`, `capitalize`: Shorthand for text transforms
- `ta:{alignment}`: Set text alignment (left, right, center, justify)
- `lh:{value}`: Set line height
  - Numeric values (e.g., `lh:1.5`) or pixel values (e.g., `lh:24`)
- `ff:{family}`: Set font family
- Use predefined variables or inherit (e.g., `ff:sans`, `ff:inherit`)
- CSS variables should be defined with the `--font-` prefix

Example:

```css
:root {
  --font-sans: 'Helvetica', sans-serif;
  --font-serif: 'Georgia', serif;
}
```

```html
<p class="ff:sans">This text uses the sans-serif font.</p>
<p class="ff:serif">This text uses the serif font.</p>
```

### Colors

- `c:{color}`: Set text color
- `bg:{color}`: Set background color
- Colors can be:
  - Hex values (e.g., `c:#ff0000`)
  - CSS variable names (e.g., `c:primary` will use `--color-primary`)
  - Opacity values using `/` (e.g., `c:#ff0000/50` or `c:primary/50` for 50% opacity)
- When using opacity, the color-mix() function is used for better browser compatibility
- For named colors, CSS variables are automatically prefixed with `--color-`

Examples:

```html
<div class="c:#ff0000">Red text</div>
<div class="bg:primary">Background using --color-primary</div>
<div class="c:#00ff00/50">50% opacity green text</div>
<div class="bg:blue/75">75% opacity blue background</div>
<div class="c:gray/20">20% opacity gray text</div>
```

### Borders

- `b:{color}|{width}|{style}`: Set border on all sides
  - Color: Hex value or CSS variable name (same as color utilities)
  - Width: Default is 1px if omitted
  - Style: Default is solid if omitted
- `b:none` or `b:0`: Remove border
- Examples of valid formats:
  - `b:#ff0000`: 1px solid red border
  - `b:primary|2px`: 2px solid border using --color-primary
  - `b:#000|3px|dashed`: 3px dashed black border
  - `b:gray/50|1px`: 1px solid border with 50% opacity gray
- `bt:{value}`, `br:{value}`, `bb:{value}`, `bl:{value}`: Set border on specific sides (top, right, bottom, left)
- `r:{value}`: Set border radius
  - Single value for all corners: `r:10`
  - Multiple values using pipe separator for top-left, top-right, bottom-right, bottom-left: `r:10|5|20|15`

Examples:

```html
<div class="b:#fafafa">Default 1px solid border</div>
<div class="b:primary|2px|dotted">2px dotted border using primary color</div>
<div class="b:#000/50|3px">3px border with 50% opacity black</div>
<div class="b:none">No border</div>
<div class="bt:#333 bb:#333">Borders on top and bottom only</div>
<div class="r:10">10px border radius on all corners</div>
<div class="r:10|20|10|20">Different border radius on each corner</div>
```

### Miscellaneous

- `cursor:{value}`: Set cursor style
- `pointer`: Shorthand for `cursor:pointer`
- `o:{value}`: Set opacity (0 to 1)
- `of:{value}`, `ofx:{value}`, `ofy:{value}`: Set overflow (hidden, auto, scroll, visible)
- `ofh`: Shorthand for `overflow:hidden`
- `z:{value}`: Set z-index
- `appearance:{value}`: Set appearance property
- `none`: Shorthand for `appearance:none`
- `scroll:hide`: Hide scrollbars while maintaining scroll functionality
- `hide`: Shorthand for `display:none`
- `block`, `inline`, `inline-block`: Set display property
- `rel`: Shorthand for `position:relative`
- `fixed:{top}|{right}|{bottom}|{left}`: Set fixed positioning with optional values in pixels
- `outline:{value}`: Set outline property

```html
<button class="pointer">Clickable button</button>
<div class="o:0.5">50% opacity element</div>
<div class="of:auto h:300">Scrollable container</div>
<div class="ofx:scroll ofy:hidden">Horizontal scroll only</div>
<div class="ofh w:200">Hidden overflow, fixed width</div>
<div class="z:10">Element with z-index 10</div>
<div class="hide">Hidden element</div>
<div class="block">Block-level element</div>
<div class="inline">Inline element</div>
<div class="rel">Relatively positioned element</div>
<div class="fixed:10|20|0|0">Fixed element with positioning</div>
<div class="outline:none">Element without outline</div>
```

### Text Decoration and Formatting

- `td:{value}`: Set text decoration (none, underline, line-through)
- `underline`: Shorthand for `text-decoration:underline`
- `line-through`: Shorthand for `text-decoration:line-through`
- `no-underline`: Shorthand for `text-decoration:none`
- `nowrap`: Prevent text wrapping
- `ellipsis`: Add ellipsis to truncated text
- `pre-wrap`: Set white-space to pre-wrap

```html
<span class="underline">Underlined text</span>
<span class="line-through">Strikethrough text</span>
<span class="td:none">No text decoration</span>
<div class="nowrap">This text will not wrap</div>
<div class="w:200 ellipsis">This text will be truncated with an ellipsis if it's too long</div>
<pre class="pre-wrap">Preformatted text that wraps</pre>
```

### Transform and Positioning

- `translate:{x}|{y}`: Transform element using translate
  - Values can be in pixels or percentages
  - Example: `translate:50%|0` or `translate:20|-10`

```html
<div class="translate:50%|0">Shifted right by 50%</div>
<div class="translate:-10|20">Shifted left 10px and down 20px</div>
```

### SVG Utilities

- `stroke:{color}|{width}`: Set SVG stroke color and optionally width
  - Example: `stroke:blue|2` for blue stroke with 2px width

```html
<svg class="stroke:blue|2">
  <!-- SVG content -->
</svg>
<svg class="stroke:primary">
  <!-- SVG with primary color stroke -->
</svg>
```

## Usage Tips

1. Combine multiple classes for complex styles:

   ```html
   <div class="flex:center|center bg:primary c:white p:20 r:10">Centered, padded, rounded box with background</div>
   ```

2. Use the important flag (`!`) when you need to override other styles:

   ```html
   <div class="w:100%!">This width will always be 100%</div>
   ```

3. Leverage CSS variables for consistent theming:

   ```html
   <div class="c:primary bg:secondary">Text in primary color on secondary background</div>
   ```

4. Quickly prototype layouts and adjust spacing:

   ```html
   <header class="flex:between|center px:20 py:10">
     <logo class="h:40"></logo>
     <nav class="flex gap:10"></nav>
   </header>
   ```

5. Use media queries for responsive design:

   ```html
   <div class="w:100%@sm w:50%@md w:33%@lg">Responsive width</div>
   ```

   Note: To use media query variants, you need to define CSS variables for breakpoints:

   ```css
   :root {
     --media-sm: 640px;
     --media-md: 768px;
     --media-lg: 1024px;
     --media-xl: 1280px;
   }
   ```

6. Hide scrollbars while maintaining scroll functionality:

   ```html
   <div class="h:300 of:auto scroll:hide">Content with hidden scrollbars</div>
   ```

7. Apply pseudo-selectors like `:hover`, `:focus`, `:active`, and `:visited`:
   You can add these pseudo-selectors to any utility class by appending them to the end with a colon:

   ```html
   <button class="bg:blue c:white bg:darkblue:hover outline:none:focus">Hover and focus styles</button>
   <a class="c:blue c:purple:visited"> Link with visited state </a>
   ```

   This feature allows you to easily add interactive styles to your elements.

8. Combine multiple features:
   You can use `!important`, pseudo-selectors, and media queries together:

   ```html
   <div class="w:100%@sm! hover:bg:blue@md! active:c:white@lg!">
     Responsive, interactive element with important rules
   </div>
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)

## Acknowledgments

This preset is inspired by [mastercss](https://css.master.co/) and was first implemented for React Native as [mingled](https://github.com/softkittens/mingled). Like Master CSS, Mingled aims to be a new language for CSS rather than just a collection of utility classes, while maintaining compatibility with the UnoCSS ecosystem.

## 💡 Why Mingled?

The name "Mingled" reflects our philosophy: CSS properties and values should be comfortably mingled with your HTML, creating a seamless development experience. Unlike traditional separation of concerns, Mingled embraces the reality that styles and markup often evolve together.

Mingled isn't just a collection of utility classes—it's a concise language for expressing CSS directly in your HTML. The syntax is designed to be intuitive and closely mirror CSS itself, but with less verbosity.

**Comparison with other approaches:**

| Concept | Traditional CSS | Tailwind CSS | Mingled |
|---------|----------------|--------------|---------|
| Philosophy | Separation of concerns | Utility-first | CSS as a language in HTML |
| Padding | `padding: 16px;` | `p-4` | `p:16` |
| Margin | `margin: 16px;` | `m-4` | `m:16` |
| Text color | `color: blue;` | `text-blue-500` | `c:blue` |
| Flex center | `display: flex; justify-content: center; align-items: center;` | `flex justify-center items-center` | `flex:center` |
| Border | `border: 1px solid #eee;` | `border border-gray-200` | `b:#eee` |

## 🔄 Migration from Tailwind

If you're coming from Tailwind CSS, here's a quick reference to help you translate common utilities:

| Tailwind | Mingled |
|----------|---------|
| `p-4` | `p:16` |
| `px-4` | `px:16` |
| `mt-2` | `mt:8` |
| `text-lg` | `f:18` |
| `font-bold` | `fw:bold` or `bold` |
| `text-blue-500` | `c:blue` |
| `bg-gray-100` | `bg:#f5f5f5` |
| `flex items-center justify-between` | `flex:between\|center` |
| `rounded-lg` | `r:8` |
| `hover:bg-blue-600` | `bg:darkblue:hover` |

## 🧪 Examples

### Responsive Layout

```html
<div class="flex:between|center flex-col:center@sm">
  <div class="w:50% w:100%@sm p:16">
    <h2 class="f:24 f:20@sm mb:16">Left Column</h2>
    <p class="f:16 lh:1.5">Content goes here...</p>
  </div>
  <div class="w:50% w:100%@sm p:16">
    <h2 class="f:24 f:20@sm mb:16">Right Column</h2>
    <p class="f:16 lh:1.5">More content here...</p>
  </div>
</div>
```

### Interactive Button

```html
<button class="
  p:8|16 
  r:4 
  bg:blue 
  c:white 
  b:none 
  pointer 
  bg:darkblue:hover 
  transform:scale(0.98):active
">
  Click Me
</button>
```
