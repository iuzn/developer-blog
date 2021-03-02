const { boxShadow } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './pages/*.tsx',
    './pages/**/*.tsx',
    './components/*.tsx',
    './components/**/*.tsx',
    './components/*.js',
    './components/**/*.js',
    './pages/*.js',
    './components/footer-box/*.js'
  ],
  theme: {
    extend: {
      orderOpacity: ['active'],
      spacing: {
        '2/3': '66.66666667%'
      },
      animation: {
        enter: 'enter 200ms ease-out'
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        }
      }
    },
    borderRadius: {
      default: '4px',
      medium: '8px',
      large: '24px',
      full: '9999px'
    },
    container: {
      padding: '1rem',
      center: true
    },
    boxShadow: {
      ...boxShadow,
      xs: '0 2px 2px rgba(0,0,0,0.02)',
      sm: '0 4px 4px rgba(0,0,0,0.02)'
    },
    colors: {
      primary: 'var(--c-primary)',
      secondary: 'var(--c-yellow)',
      'secondary-20': 'var(--c-yellow-20)',
      'secondary-40': 'var(--c-yellow-40)',
      'secondary-60': 'var(--c-gradient)',
      'secondary-80': 'var(--c-yellow-80)',
      'text-color': 'var(--c-text-color)'
    }
  },
  variants: {
    extend: {
      borderWidth: ['group-hover', 'first', 'group-focus'],
      borderRadius: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus','focus-visible'],
      textDecoration: ['hover', 'group-hover', 'group-focus'],
      boxShadow: ['active', 'focus','focus-visible']
    },
    fontSize: ['group-hover', 'hover', 'group-focus'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    translate: ['hover', 'focus', 'group-hover', 'group-focus'],
    opacity: ['hover', 'group-hover', 'group-focus'],
    scale: ['hover', 'group-hover', 'group-focus']
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}
