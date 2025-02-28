import { transformerVariantGroup } from 'unocss';

function pxToRem(value) {
  if (isNaN(value)) {
    return value;
  }
  return `${value / 16}rem`;
}

function handleColor(color) {
  if (color.includes('/')) {
    const [baseColor, opacity] = color.split('/');
    const opacityPercentage = parseInt(opacity);
    if (baseColor.startsWith('#')) {
      return `color-mix(in srgb, ${baseColor} ${opacityPercentage}%, transparent)`;
    }
    // For non-hex colors, assume it's a named color or will be a CSS variable
    return `color-mix(in srgb, var(--color-${baseColor}, ${baseColor}) ${opacityPercentage}%, transparent)`;
  }
  if (color.startsWith('#')) {
    return color;
  }
  return `var(--color-${color}, ${color})`;
}

function handleSpacing(value) {
  const parts = value.split('|').map((part) => (part === '' ? '0' : part));
  return parts.map(pxToRem).join(' ');
}

function handleFontWeight(weight) {
  const weights = {
    thin: 100,
    xlight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    xbold: 800,
    black: 900,
  };
  return weights[weight] || weight;
}

function handleFlex(value, type) {
  const direction = type === 'col' ? 'column' : 'row';
  const display = type === 'inline' ? 'inline-flex' : 'flex';

  const styles = { display, 'flex-direction': direction };

  if (!value) return styles;

  // If the value is a number, it's a flex-grow value
  if (!isNaN(value)) {
    return { flex: `${value.split('|').join(' ')}` };
  }

  const [justify, align] = value.split('|');

  const justifyOptions = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };

  const alignOptions = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    baseline: 'baseline',
  };

  if (justifyOptions[justify]) {
    styles['justify-content'] = justifyOptions[justify];
  }

  if (alignOptions[align]) {
    styles['align-items'] = alignOptions[align];
  }

  if (justify === 'center' && align === null) {
    styles['justify-content'] = 'center';
    styles['align-items'] = 'center';
  }

  return styles;
}

function handleBorder(value) {
  if (value === '0' || value === 'none') {
    return 'none';
  }
  const [color, width = '1', style = 'solid'] = value.split('|');
  return `${width}px ${style} ${handleColor(color)}`;
}

function parseSidelength(value) {
  switch (value) {
    case 'full':
      return `100%`;
    case 'screen':
      return `100vh`;
    case 'fit':
      return `fit-content`;
    default:
      return /^\d+$/.test(value) ? `${value}px` : `${value}`;
  }
}

export function mingled() {
  return {
    name: 'mingled',
    transformers: [transformerVariantGroup()],
    theme: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },

    rules: [
      // Height
      [/^h:(.+)$/, ([, s]) => ({ height: parseSidelength(s) })],
      [/^min-h:(.+)$/, ([, s]) => ({ 'min-height': parseSidelength(s) })],
      [/^max-h:(.+)$/, ([, s]) => ({ 'max-height': parseSidelength(s) })],

      // Width
      [/^w:(.+)$/, ([, s]) => ({ width: parseSidelength(s) })],
      [/^min-w:(.+)$/, ([, s]) => ({ 'min-width': parseSidelength(s) })],
      [/^max-w:(.+)$/, ([, s]) => ({ 'max-width': parseSidelength(s) })],

      // Size
      [
        /^size:(.+)$/,
        ([, s]) => ({
          width: parseSidelength(s),
          height: parseSidelength(s),
        }),
      ],

      // Color rules
      [/^c:(.+)$/, ([, v]) => ({ color: handleColor(v) })],
      [/^bg:(.+)$/, ([, v]) => ({ 'background-color': handleColor(v) })],

      // Margin rules
      [
        /^m:(.+)$/,
        ([, s]) => ({ margin: handleSpacing(s) }),
        {
          autocomplete: 'm:(0|4|8|12|16|20|24|28|32|36|40|44|48)',
        },
      ],
      [
        /^mx:(.+)$/,
        ([, s]) => ({
          'margin-left': pxToRem(s),
          'margin-right': pxToRem(s),
        }),
      ],
      [
        /^my:(.+)$/,
        ([, s]) => ({
          'margin-top': pxToRem(s),
          'margin-bottom': pxToRem(s),
        }),
      ],
      [/^mt:(.+)$/, ([, s]) => ({ 'margin-top': pxToRem(s) })],
      [/^mr:(.+)$/, ([, s]) => ({ 'margin-right': pxToRem(s) })],
      [/^mb:(.+)$/, ([, s]) => ({ 'margin-bottom': pxToRem(s) })],
      [/^ml:(.+)$/, ([, s]) => ({ 'margin-left': pxToRem(s) })],

      // Padding rules
      [
        /^p:(.+)$/,
        ([, s]) => ({ padding: handleSpacing(s) }),
        {
          autocomplete: 'p:(0|4|8|12|16|20|24|28|32|36|40|44|48)',
        },
      ],
      [
        /^px:(.+)$/,
        ([, s]) => ({
          'padding-left': pxToRem(s),
          'padding-right': pxToRem(s),
        }),
      ],
      [
        /^py:(.+)$/,
        ([, s]) => ({
          'padding-top': pxToRem(s),
          'padding-bottom': pxToRem(s),
        }),
      ],
      [/^pt:(.+)$/, ([, s]) => ({ 'padding-top': pxToRem(s) })],
      [/^pr:(.+)$/, ([, s]) => ({ 'padding-right': pxToRem(s) })],
      [/^pb:(.+)$/, ([, s]) => ({ 'padding-bottom': pxToRem(s) })],
      [/^pl:(.+)$/, ([, s]) => ({ 'padding-left': pxToRem(s) })],

      // Font size rule
      [/^f:(\d+)$/, ([, s]) => ({ 'font-size': pxToRem(s) })],

      // Line height rule
      [
        /^lh:(\d+(?:\.\d+)?)$/,
        ([, value]) => ({
          'line-height': Number.isInteger(Number(value)) ? `${value}px` : value,
        }),
      ],

      // Font weight rule (accepts numbers and strings)
      [/^fw:(\w+|\d+)$/, ([, w]) => ({ 'font-weight': handleFontWeight(w) })],
      [/^bold$/, () => ({ 'font-weight': 'bold' })],
      [/^semi$/, () => ({ 'font-weight': '600' })],
      [/^regular$/, () => ({ 'font-weight': '400' })],
      [/^medium$/, () => ({ 'font-weight': '500' })],

      // Font family rule
      [
        /^ff:(\w+)$/,
        ([, v]) => ({
          'font-family': v === 'inherit' ? 'inherit' : `var(--font-${v}, ${v})`,
        }),
      ],

      [/^pre-wrap$/, () => ({ 'white-space': 'pre-wrap' })],

      // Flex rules
      [/^flex(?:-?(col|inline))?(?::(.+))?$/, ([, type, value]) => handleFlex(value, type)],
      [/^flex-wrap$/, () => ({ 'flex-wrap': 'wrap' })],
      [/^gap:(\d+)$/, ([, s]) => ({ gap: `${s}px` })],

      // Display rule
      [/^block$/, () => ({ display: 'block' })],
      [/^inline$/, () => ({ display: 'inline' })],
      [/^inline-block$/, () => ({ display: 'inline-block' })],

      // Text transform rule
      [/^tt:(\w+)$/, ([, t]) => ({ 'text-transform': t })],
      [/^upper$/, () => ({ 'text-transform': 'uppercase' })],
      [/^lower$/, () => ({ 'text-transform': 'lowercase' })],
      [/^capitalize$/, () => ({ 'text-transform': 'capitalize' })],

      // Text decoration rule
      [/^td:(\w+)$/, ([, t]) => ({ 'text-decoration': t })],
      [/^underline$/, () => ({ 'text-decoration': 'underline' })],
      [/^line-through$/, () => ({ 'text-decoration': 'line-through' })],
      [/^no-underline$/, () => ({ 'text-decoration': 'none' })],

      // Cursor rule
      [/^cursor:(\w+)$/, ([, c]) => ({ cursor: c })],
      [/^pointer$/, () => ({ cursor: 'pointer' })],

      // Text align rule
      [/^ta:(left|right|center|justify)$/, ([, t]) => ({ 'text-align': t })],
      [/^nowrap$/, () => ({ 'white-space': 'nowrap' })],
      [/^ellipsis$/, () => ({ overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' })],

      // Border rules
      [/^b:(.+)$/, ([, v]) => ({ border: handleBorder(v) })],
      [/^bb:(.+)$/, ([, v]) => ({ 'border-bottom': handleBorder(v) })],
      [/^bt:(.+)$/, ([, v]) => ({ 'border-top': handleBorder(v) })],
      [/^br:(.+)$/, ([, v]) => ({ 'border-right': handleBorder(v) })],
      [/^bl:(.+)$/, ([, v]) => ({ 'border-left': handleBorder(v) })],

      // Border radius - supports 1-4 values in clockwise order (top-left, top-right, bottom-right, bottom-left)
      [
        /^r:(\d+)(?:\|(\d+))?(?:\|(\d+))?(?:\|(\d+))?$/,
        ([, tl, tr, br, bl]) => {
          const topLeft = `${tl}px`;
          const topRight = tr ? `${tr}px` : topLeft;
          const bottomRight = br ? `${br}px` : topLeft;
          const bottomLeft = bl ? `${bl}px` : topRight;

          return {
            'border-radius': `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`,
          };
        },
      ],

      // Outline
      [/^outline:(.+)$/, ([, v]) => ({ outline: v })],

      // Opacity
      [/^o:(\d+(?:\.\d+)?)$/, ([, s]) => ({ opacity: s })],

      // Overflow
      [/^of:(\w+)$/, ([, v]) => ({ overflow: v })],
      [/^ofx:(\w+)$/, ([, v]) => ({ 'overflow-x': v })],
      [/^ofy:(\w+)$/, ([, v]) => ({ 'overflow-y': v })],

      // Overflow hidden
      [/^ofh$/, () => ({ overflow: 'hidden' })],

      // Shadow
      [
        /^shadow:(-?\d+)\|(-?\d+)\|(-?\d+)\|(-?\d+)\|\(([^)]+)\)$/,
        ([, x, y, blur, spread, color]) => {
          return { 'box-shadow': `${x}px ${y}px ${blur}px ${spread}px rgba(${color})` };
        },
      ],

      // Z-index
      [/^z:(\d+)$/, ([, s]) => ({ 'z-index': s })],

      // Appearance
      [/^appearance:(\w+)$/, ([, v]) => ({ appearance: v })],
      [/^none$/, () => ({ appearance: 'none' })],
      [/^hide$/, () => ({ display: 'none' })],

      // Position utilities
      [/^rel$/, () => ({ position: 'relative' })],

      // Absolute position
      [
        /^abs:([^|]*)?(?:\|([^|]*)?(?:\|([^|]*)?(?:\|([^|]*))?)?)?$/,
        ([, top, right, bottom, left]) => {
          const formatUnit = (val) => (val ? (val.includes('%') ? val : `${val}px`) : undefined);
          return {
            position: 'absolute',
            top: formatUnit(top),
            right: formatUnit(right),
            bottom: formatUnit(bottom),
            left: formatUnit(left),
          };
        },
      ],

      // Fixed position
      [
        /^fixed:(\d+)?(?:\|(\d+))?(?:\|(\d+))?(?:\|(\d+))?$/,
        ([, top, right, bottom, left]) => ({
          position: 'fixed',
          top: top ? `${top}px` : undefined,
          right: right ? `${right}px` : undefined,
          bottom: bottom ? `${bottom}px` : undefined,
          left: left ? `${left}px` : undefined,
        }),
      ],

      // bottom, top, left, right
      [/^bottom:(\d+)$/, ([, s]) => ({ bottom: `${s}px` })],
      [/^top:(\d+)$/, ([, s]) => ({ top: `${s}px` })],
      [/^left:(\d+)$/, ([, s]) => ({ left: `${s}px` })],
      [/^right:(\d+)$/, ([, s]) => ({ right: `${s}px` })],

      // translate
      [
        /^translate:(-?\d+(?:\.\d+)?%?)?(\|(-?\d+(?:\.\d+)?%?))?$/,
        ([, x, , y]) => {
          const formatValue = (val) => (val ? (val.includes('%') ? val : `${val}px`) : '0');
          return {
            transform: `translate(${formatValue(x)}, ${formatValue(y)})`,
          };
        },
      ],

      // svg
      [
        /^stroke:([\w]+)(?:\|(\d+))?$/,
        ([, c, w]) => ({
          stroke: c,
          'stroke-width': w ? `${w}px` : undefined,
        }),
      ],

      // Hide scrollbar
      [
        /^scroll:hide$/,
        () => ({
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }),
      ],
    ],
    variants: [
      // Pseudo-class variant
      (matcher) => {
        const pseudoClasses = ['hover', 'focus', 'active', 'visited', 'disabled', 'focus-within'];
        for (const pseudo of pseudoClasses) {
          if (matcher.endsWith(`:${pseudo}`)) {
            return {
              matcher: matcher.slice(0, -(pseudo.length + 1)),
              selector: (s) => `${s}:${pseudo}`,
            };
          }
        }
        return matcher;
      },

      (matcher) => {
        if (matcher.endsWith('!')) {
          return {
            matcher: matcher.slice(0, -1),
            body: (body) => {
              const addImportant = (value) => (typeof value === 'string' ? `${value} !important` : value);

              if (typeof body === 'string') return addImportant(body);
              if (Array.isArray(body)) return body.map(([k, v]) => [k, addImportant(v)]);
              return Object.fromEntries(Object.entries(body).map(([k, v]) => [k, addImportant(v)]));
            },
          };
        }
      },

      (matcher, { theme }) => {
        const match = matcher.match(/^(.+)@(sm|md|lg|xl)$/);
        if (match) {
          const [, className, breakpoint] = match;
          return {
            matcher: className,
            handle: (input, next) => {
              const bp = theme.breakpoints[breakpoint];
              return next({
                ...input,
                parent: `${input.parent ? `${input.parent} $$ ` : ''}@media (min-width: ${bp})`,
              });
            },
          };
        }
      },
    ],
  };
}
