/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')()
require('dotenv').config()

module.exports = removeImports({
  reactStrictMode: true,
  env: {
    HACKMD_API_TOKEN: process.env.HACKMD_API_TOKEN,
    HACKMD_API_BASE_URL: process.env.HACKMD_API_BASE_URL,
  },
})
