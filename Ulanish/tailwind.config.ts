import type { Config } from 'tailwindcss';
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        deep: 'var(--deep)',
        accent: 'var(--accent)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        whatsapp: 'var(--green)',
      },
      maxWidth: { site: '1280px' },
      borderRadius: { card: '12px' },
    },
  },
  plugins: [],
} satisfies Config;
