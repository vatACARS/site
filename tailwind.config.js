const colors = require('tailwindcss/colors');

const linkHeadingStyles = {
  color: colors.gray[100],
  borderBottomColor: 'transparent',
  borderRadius: 3,
  boxShadow: `0 0 0 0.4rem transparent`,
  '&:hover': {
    color: 'none',
    borderBottomColor: 'transparent',
    background: colors.gray[100],
    boxShadow: `0 0 0 0.4rem ${colors.gray[100]}`,
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx,md,mdx}',
    './node_modules/flyonui/dist/js/*.js',
  ],
  flyonui: {
    themes: [{
      vatacars: {
        primary: "rgb(59 130 246)"
      },
    }],
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              background: 'rgba(205, 200, 255, 0.05)',
              code: {
                fontSize: '1rem',
              },
            },
            'h2 a': linkHeadingStyles,
            'h3 a': linkHeadingStyles,
            'h4 a': linkHeadingStyles,
            'h5 a': linkHeadingStyles,
            'h6 a': linkHeadingStyles,
            'h3 a:has(code)': {
              boxShadow: `0 0 0 0.3rem transparent`,
              '&:hover': {
                background: colors.teal[900],
                boxShadow: `0 0 0 0.3rem ${colors.teal[900]}`,
              },
            },
            figure: {
              margin: 0,
            },
            blockquote: {
              fontSize: '90%',
              color: colors.zinc[500],
              borderLeftColor: colors.zinc[700],
              'p::before': { display: 'none' },
              'p::after': { display: 'none' },
            },
            a: {
              textDecoration: 'none',
              borderBottom: `1px solid ${colors.pink[300]}`,
              color: colors.pink[200],
              borderRadius: 1,
              transitionProperty: 'color, border-color, background, box-shadow',
              transitionDuration: '0.18s',
              boxShadow: `0 0 0 0.2rem transparent`,
              '&:hover': {
                color: `${colors.zinc[900]}`,
                borderBottomColor: `${colors.pink[200]}`,
                background: colors.pink[200],
                boxShadow: `0 0 0 0.2rem ${colors.pink[200]}`,
              },
            },
            code: {
              color: '#86e1fc',
              '&::before': { content: `unset !important` },
              '&::after': { content: `unset !important` },
              fontWeight: 'normal',
            },
            'a code': {
              fontSize: '1em',
            },
            '[data-rehype-pretty-code-fragment]:nth-of-type(2) pre': {
              '[data-line]::before': {
                content: 'counter(line)',
                counterIncrement: 'line',
                display: 'inline-block',
                width: '1rem',
                marginRight: '1rem',
                textAlign: 'right',
                color: colors.slate[600],
              },
              '[data-highlighted-line]::before': {
                color: colors.slate[400],
              },
            },
          },
        },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("tailwindcss-animate"),
    require('flyonui'),
    require('flyonui/plugin'),
  ],
}