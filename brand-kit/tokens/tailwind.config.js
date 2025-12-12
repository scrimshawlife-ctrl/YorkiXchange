/**
 * YorkiExchange Tailwind Configuration
 * Version 2.0.0
 *
 * Extend your existing tailwind.config.js with these YorkiExchange brand tokens.
 * Merge this configuration with your project's tailwind config.
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'yorkie-blue': '#1F6F9C',
        'midnight-charcoal': '#0E1A22',

        // Secondary Colors
        'warm-fur-tan': '#D8B58A',
        'soft-cream': '#F4EFE9',

        // Accent
        'collar-gold': '#E2B23C',

        // Utility Grays
        'gray': {
          100: '#F7F8F9',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },

        // Semantic
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'info': '#3B82F6',
      },

      fontFamily: {
        'headline': ['Montserrat', 'Poppins', 'Helvetica Neue', 'sans-serif'],
        'body': ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'mono': ['SF Mono', 'Consolas', 'Monaco', 'monospace'],
      },

      fontSize: {
        'xs': '0.75rem',      // 12px
        'sm': '0.875rem',     // 14px
        'base': '1rem',       // 16px
        'lg': '1.125rem',     // 18px
        'xl': '1.25rem',      // 20px
        '2xl': '1.5rem',      // 24px
        '3xl': '1.875rem',    // 30px
        '4xl': '2.25rem',     // 36px
        '5xl': '3rem',        // 48px
        '6xl': '3.75rem',     // 60px
      },

      fontWeight: {
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
      },

      lineHeight: {
        'tight': 1.25,
        'snug': 1.375,
        'normal': 1.5,
        'relaxed': 1.625,
        'loose': 2,
      },

      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },

      spacing: {
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
        '32': '8rem',     // 128px
      },

      borderRadius: {
        'none': '0',
        'sm': '0.25rem',    // 4px
        'md': '0.5rem',     // 8px
        'lg': '0.75rem',    // 12px
        'xl': '1rem',       // 16px
        '2xl': '1.5rem',    // 24px
        'full': '9999px',
      },

      boxShadow: {
        'sm': '0 1px 2px rgba(14, 26, 34, 0.08)',
        'md': '0 4px 8px rgba(14, 26, 34, 0.12)',
        'lg': '0 8px 16px rgba(14, 26, 34, 0.16)',
        'xl': '0 12px 24px rgba(14, 26, 34, 0.20)',
        '2xl': '0 24px 48px rgba(14, 26, 34, 0.24)',
        'inner': 'inset 0 2px 4px rgba(14, 26, 34, 0.06)',
      },

      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },

  plugins: [
    // YorkiExchange custom component classes
    function({ addComponents, theme }) {
      addComponents({
        '.btn-yorkie-primary': {
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.md'),
          fontFamily: theme('fontFamily.body'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.sm'),
          textTransform: 'uppercase',
          letterSpacing: theme('letterSpacing.wider'),
          backgroundColor: theme('colors.collar-gold'),
          color: theme('colors.midnight-charcoal'),
          boxShadow: theme('boxShadow.sm'),
          transition: `all ${theme('transitionDuration.base')} ${theme('transitionTimingFunction.smooth')}`,
          cursor: 'pointer',
          border: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme('spacing.2'),
          '&:hover': {
            backgroundColor: '#D4A02E',
            boxShadow: theme('boxShadow.md'),
            transform: 'translateY(-1px)',
          },
        },

        '.btn-yorkie-secondary': {
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.md'),
          fontFamily: theme('fontFamily.body'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.sm'),
          textTransform: 'uppercase',
          letterSpacing: theme('letterSpacing.wider'),
          backgroundColor: theme('colors.warm-fur-tan'),
          color: theme('colors.midnight-charcoal'),
          boxShadow: theme('boxShadow.sm'),
          transition: `all ${theme('transitionDuration.base')} ${theme('transitionTimingFunction.smooth')}`,
          cursor: 'pointer',
          border: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme('spacing.2'),
          '&:hover': {
            backgroundColor: '#CCA876',
            boxShadow: theme('boxShadow.md'),
          },
        },

        '.card-yorkie': {
          backgroundColor: theme('colors.soft-cream'),
          border: '1px solid rgba(14, 26, 34, 0.12)',
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.sm'),
          transition: `all ${theme('transitionDuration.base')} ${theme('transitionTimingFunction.smooth')}`,
          '&:hover': {
            boxShadow: theme('boxShadow.md'),
            transform: 'translateY(-2px)',
          },
        },

        '.input-yorkie': {
          backgroundColor: 'white',
          border: '2px solid rgba(14, 26, 34, 0.16)',
          borderRadius: theme('borderRadius.md'),
          padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.base'),
          color: theme('colors.midnight-charcoal'),
          transition: `all ${theme('transitionDuration.base')} ${theme('transitionTimingFunction.smooth')}`,
          width: '100%',
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.yorkie-blue'),
            boxShadow: '0 0 0 3px rgba(31, 111, 156, 0.1)',
          },
          '&::placeholder': {
            color: theme('colors.gray.400'),
          },
        },

        '.badge-yorkie-verified': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: theme('spacing.1'),
          padding: `${theme('spacing.1')} ${theme('spacing.3')}`,
          borderRadius: theme('borderRadius.full'),
          fontSize: theme('fontSize.xs'),
          fontWeight: theme('fontWeight.medium'),
          textTransform: 'uppercase',
          letterSpacing: theme('letterSpacing.wide'),
          backgroundColor: theme('colors.collar-gold'),
          color: theme('colors.midnight-charcoal'),
        },
      });
    },
  ],
};
