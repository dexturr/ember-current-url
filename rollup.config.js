import babel from 'rollup-plugin-babel';

export default {
  input: 'vendor/qunit-current-url.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: ["@babel/preset-env"],
    })
  ],
  output: {
    file: 'lib/qunit-current-url-dist.js',
    format: 'iife',
    sourcemap: true,
  },
}