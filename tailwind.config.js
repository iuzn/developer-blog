const { boxShadow } = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode: 'class',
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
    }
  },
  variants: {
    extend: {
      borderWidth: ['group-hover', 'first'],
      borderRadius: ['responsive', 'hover', 'focus', 'group-hover'],
      textDecoration: [ 'hover', 'group-hover'],
      boxShadow: ['active', 'focus']
    },
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
    translate: ['hover', 'focus', 'group-hover'],
    opacity: ['hover', 'group-hover'],
    scale: ['hover', 'group-hover']
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}
