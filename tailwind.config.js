/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [ "./templates/**" ],
    plugins: [
        require("@tailwindcss/typography"),
        require('daisyui')
    ],
    daisyui: {
        themes: [ 'light' ],
    },
}

