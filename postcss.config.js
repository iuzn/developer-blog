module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    'postcss-nested',
    'postcss-focus-visible',
['postcss-custom-media' ,
    {
      importFrom: [
        {
          customMedia: {'--ms': '(min-width: 200px)'}
        },
        {
          customMedia: {'--m': '(min-width: 350px)'}
        },
        {
          customMedia: {'--t': '(min-width: 850px)'}
        },
        {
          customMedia: {'--d': '(min-width: 1280px)'}
        }
      ]
    }
]
]
}