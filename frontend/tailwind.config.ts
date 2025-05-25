import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal': 'var(--color-teal, #50C9B4)',
        'warm-coral': 'var(--color-warm-coral, #F2685E)',
        'muted-brick-red': 'var(--color-muted-brick-red, #C24D53)',
        'deep-black': 'var(--color-deep-black, #000000)',
        'retro-teal': 'var(--color-retro-teal, #4D7A7F)',
        'soft-cream': 'var(--color-soft-cream, #EFE5D5)',
        'charcoal-gray': 'var(--color-charcoal-gray, #4E5664)',
        'marigold-yellow': 'var(--color-marigold-yellow, #EAA221)',
      }
    }
  },
  plugins: [],
} satisfies Config;
