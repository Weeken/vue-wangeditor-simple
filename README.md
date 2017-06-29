# vue-wangeditor-simple


## 介绍--这个是基于**wangEditor**写成的vue插件

**wangEditor** —— 轻量级 web 富文本编辑器，配置方便，使用简单。支持 IE10+ 浏览器。

- 官网：[www.wangEditor.com](http://www.wangeditor.com/)
- 文档：[www.kancloud.cn/wangfupeng/wangeditor3/332599](http://www.kancloud.cn/wangfupeng/wangeditor3/332599)

![图片](http://images2015.cnblogs.com/blog/138012/201705/138012-20170530202905633-1840158981.png)


## How to use

```
npm install vue-wangeditor-simple --save

```

```
// main.js
import VueWangeditor from 'vue-wangeditor-simple'
Vue.use(VueWangeditor)
```
```
// app.vue
<div class="editor_wrap">
    <vue-wangeditor id="editor" :options="options" v-model="content"></vue-wangeditor>
    <vue-wangeditor id="editor1" :options="options1" v-model="content1"></vue-wangeditor>
</div>

data () {
    return {
      content1: '',
      options1: {
        width: 700,
        height: 500
      },
      content: '<p>edit here</p>',
      options: {
      width: 800, // 默认单位px
      height: 800, // 默认单位px
      // 更多配置项请看官网或者官网文档
        menus: [
          'head',  // 标题
          'bold',  // 粗体
          'italic',  // 斜体
          'underline',  // 下划线
          ...
        ],
        pasteText: true,
        uploadImgServer: 'https://up-z2.qbox.me/',
        ...
      }
    }
  }
```
#### github: [https://github.com/Weeken/vue-wangeditor-simple](https://github.com/Weeken/vue-wangeditor-simple)

