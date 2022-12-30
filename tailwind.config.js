/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",


    ],
  },
  plugins: [
    require('flowbite/plugin', 'tw-elements/dist/plugin')
  ]
}
