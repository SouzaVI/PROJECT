/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [ "./templates/**" ],
    plugins: [
        require('daisyui')
    ],
    daisyui: {
        themes: [ 'light' ],
    },
}

