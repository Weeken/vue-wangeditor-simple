// Rollup plugins
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
// import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';
import url from "rollup-plugin-url"

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

export default {
  // 这是我们希望 Rollup 去执行的文件。
  // 在大多数项目中，这将是你主要的 JavaScript 文件，它负责一切的初始化工作并作为开始文件。
  input: 'src/index.js',

  output: {
    // 这是脚本程序执行后所存储的位置
    file: 'dist/vue-wangeditor-simple.js',

    // Rollup 支持多种输出格式。
    // 因为我们在浏览器中运行，我们希望使用立即调用的函数表达式(immediately-invoked function expression,IIFE)。
    // 关于其他的 format 选项以及什么场合你可能会需要它们，可以参考 Rollup’s wiki
    format: 'umd',
    name: 'main'
  },


  /*
    以下的设置项都是output共享的，如果不想共享，请写到output里面
    output: [
      { file: pkg.main, format: 'umd', name: 'MyLibrary' },
      { file: pkg.module, format: 'es' }
    ],

    // other output options specified here will be shared by
    // all outputs, unless overridden
    sourcemap: true
  */


  // 如果有 sourcemap 的话，那么在调试代码时会提供很大的帮助，
  // 这个选项会在生成文件中添加 sourcemap，来让事情变得更加简单。
  sourcemap: 'inline',

  external: [ 'wangeditor' ],

  globals: {
    wangeditor: 'wangeditor'
  },

  // babel
  plugins: [
    vue(),
    postcss({
      plugins: [
        simplevars(), // 这个插件允许你试用 Sass式的变量
        nested(), // 这个插件允许你使用嵌套的语法
        cssnext({ warnForDuplicates: false, }), // 这个插件可以让你使用更为现代甚至是面向未来的CSS语法（规则参考latest CSS specs）并将代码转换为可以在不支持这些语法的旧浏览器上使用。
        cssnano(),  // 这个插件可以将输出的CSS压缩和简化
        /*
            注意：我们需要为cssnext()传入{ warnForDuplicates:false }，
            因为cssnext()和cssnano()都会使用到Autoprefixer，这会触发一个警告。
            我们知道Autoprefixer会执行两次（在这个例子中不会带来什么不好的后果）并且不会报出警告，
            相比较放弃使用这两个插件，这样似乎会更好一些。
        */
      ],
      extensions: [ '.css' ],
    }),
    url({
      limit: 10 * 1024, // inline files < 10k, copy files > 10k
      include: ["**/*.svg","**/*.png","**/*.jpg","**/*.gif"], // defaults to .svg, .png, .jpg and .gif files
      emitFiles: true // defaults to true
    }),
    resolve({
      jsnext: true,   // 指定将 Node 包转换为 ES2015 模块
      main: true,    // main 和 browser 属性将使插件决定将哪些文件应用到 bundle。
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
    // eslint({
    //   exclude: [
    //     'src/styles/**',
    //   ]
    // }),
    replace({
      // 找到每一个 ENV 并用 process.env.NODE_ENV 去替换
      // 在 Node 应用或是 development 中我们会用传统的方式去设置环境。
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      // 'process.env.NODE_ENV': JSON.stringify( 'production' ),
      // 'process.env.VUE_ENV': JSON.stringify('browser')
    }),

    // 压缩代码
    (process.env.NODE_ENV === 'production' && uglify())
  ]
};
