/**
 * Design tokens for the L&DaaS Pitch Configurator
 * Based on ansrsource Brand Guidelines (May 2025)
 */

export const designTokens = {
  colors: {
    // Primary brand colors
    primary: {
      DEFAULT: '#DA3C04', // Dark Orange - Primary brand color, integrity
      dark: '#DA3C04',
      medium: '#F26902', // Bright Orange - Innovation
      light: '#F8B50C', // Yellow - Optimism and clarity
    },

    // Secondary brand colors
    secondary: {
      DEFAULT: '#127295', // Teal - Collaboration
      dark: '#003366', // Midnight Blue - Professionalism
      light: '#21A3B1', // Light Teal - Continuous learning
    },

    // Neutral colors
    neutral: {
      DEFAULT: '#2C2F30', // Charcoal - Excellence
      charcoal: '#2C2F30',
      gray: '#8C8C8C', // Medium Gray
      lightGray: '#EAEAEA', // Light Gray
      white: '#FFFFFF',
      black: '#000000',
    },

    // Semantic colors
    success: {
      DEFAULT: '#21A3B1',
    },
    warning: {
      DEFAULT: '#F8B50C',
    },
    error: {
      DEFAULT: '#DA3C04',
    },
    info: {
      DEFAULT: '#127295',
    },
  },

  typography: {
    fontFamily: {
      heading: ['Mont', 'system-ui', '-apple-system', 'sans-serif'],
      body: ['Mont', 'Arial', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['Consolas', 'Monaco', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px - Body text minimum
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px - Subheadings minimum
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px - Headings minimum
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
      '5xl': ['3rem', { lineHeight: '1' }],         // 48px
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },

  spacing: {
    0: '0px',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },

  borderRadius: {
    none: '0px',
    sm: '0.25rem',    // 4px
    DEFAULT: '0.375rem', // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    none: '0 0 #0000',
  },

  transitions: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
    },
    timing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
