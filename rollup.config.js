import babel from 'rollup-plugin-babel';

export default {
  input: 'lib/qunit-current-url.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: ["@babel/preset-env"],
    })
  ],
  output: {
    file: 'vendor/qunit-current-url-dist.js',
    format: 'iife',
    sourcemap: true,
  },
}