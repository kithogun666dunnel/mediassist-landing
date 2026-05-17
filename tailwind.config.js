/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // serif mapped to DM Sans — operational headings, not editorial
        serif: ['"DM Sans"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', '"Courier New"', 'monospace'],
      },
      colors: {
        navy:   '#0f172a',   // slate-900 — darker, denser anchor
        blue:   '#1e40af',   // blue-800 — deep institutional blue
        sky:    '#475569',   // slate-600 — muted, for labels and secondary text
        accent: '#2563eb',   // blue-600 — clean professional, replaces teal
        pale:   '#f1f5f9',   // slate-100 — neutral surface, no blue tint
        light:  '#f8fafc',   // slate-50  — neutral light, no blue tint
      },
      letterSpacing: {
        heading: '-0.025em',
      },
    },
  },
  plugins: [],
}
