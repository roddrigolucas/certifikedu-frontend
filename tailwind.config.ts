import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        ecstasy: {
          '50': 'hsl(37, 100%, 96%)',
          '100': 'hsl(38, 100%, 92%)',
          '200': 'hsl(34, 100%, 83%)',
          '300': 'hsl(33, 100%, 72%)',
          '400': 'hsl(29, 100%, 61%)',
          '500': 'hsl(27, 100%, 53%)',
          '600': 'hsl(23, 95%, 48%)',
          '700': 'hsl(20, 93%, 40%)',
          '800': 'hsl(17, 84%, 34%)',
          '900': 'hsl(18, 79%, 28%)',
          '950': 'hsl(15, 86%, 15%)',
        },
        'blue-zodiac': {
          '50': 'hsl(215, 75%, 97%)',
          '100': 'hsl(211, 68%, 93%)',
          '200': 'hsl(212, 72%, 87%)',
          '300': 'hsl(210, 71%, 78%)',
          '400': 'hsl(212, 70%, 68%)',
          '500': 'hsl(216, 67%, 60%)',
          '600': 'hsl(220, 61%, 53%)',
          '700': 'hsl(223, 56%, 48%)',
          '800': 'hsl(225, 52%, 40%)',
          '900': 'hsl(223, 48%, 33%)',
          '950': 'hsl(225, 42%, 17%)',
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        blink: 'blink 1.5s ease-in-out infinite',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
