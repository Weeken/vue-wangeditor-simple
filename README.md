# vue-wangeditor-simple


## 这个是基于**wangeditor v3.0+ 版本**写成的vue插件

**wangEditor** —— 轻量级 web 富文本编辑器，配置方便，使用简单。支持IE10+浏览器。

- 官网：[www.wangEditor.com](http://www.wangeditor.com/)
- 文档：[https://www.kancloud.cn/wangfupeng/wangeditor3/332599](https://www.kancloud.cn/wangfupeng/wangeditor3/332599)


## How to use

```
npm install vue-wangeditor-simple --save

// main.js
import VueWangeditor from 'vue-wangeditor-simple'
Vue.use(VueWangeditor)

// app.vue
<div class="editor_wrap">
    <vue-wangeditor id="editor" :options="options" v-model="content" :text.sync="text"></vue-wangeditor>
    <vue-wangeditor id="editor1" :options="options1" v-model="content1" :text.sync="text1"></vue-wangeditor>
</div>

data () {
    return {
      content1: '', // 包含html标签
      text1: '', // 不含html标签，纯文本
      options1: {
        width: '900px',
        height: '500px',
      },
      content: '<p>edit here</p>',
      text: '',
      options: {
      width: '90%', // 自定义单位，字符串
      height: '800px', // 自定义单位，字符串
      // 更多配置项请看官网或者官网文档
        menus: [
        width: '900px',
      height: '500px',
      menus: [
        'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'underline',  // 下划线
          ...
        'redo',  // 重复
        /* ---- 新增 ---- */
        'clearStyle', //清除文字的样式
        'clearFormat', //清除文字的格式
        'clearAll', //一键清空编辑器
        'fullscreen' // 全屏
      ],
        ],
        pasteFilterStyle: true,  // 打开/关闭粘贴样式的过滤
        ...
      }
    }
  }
```

## 新增

### 1、clearStyle: 清除编辑器内所有文字的样式（无法撤销undo）
- 等同于粘贴样式的过滤的作用，去除标签内的style，class属性以及\<style>标签
- 文档里说 **pasteFilterStyle配置暂时对 IE 无效** ，处理方法有两个：

	1) 在配置里添加pasteTextHandle方法，然后再里面添加处理，如：

	```
	pasteTextHandle (content) {
  		let isIE = 'ActiveXObject' in window
  		let styleReg = / style=\"(.*?)\"/g
  		let classReg = / class=\"(.*?)\"/g
  		let styleTagReg = /<style>[\s\S]*?<\/style>/g
  		return isIE ? content.replace(styleReg, '').replace(classReg, '').replace(styleTagReg, '') : content
	},
	```

	2) 就是在配置menus里添加 **clearStyle** ，复制进去后手动清除样式

### 2、clearFormat: 清除格式（无法撤销undo）
- 这功能会把所有的文字格式化为正文，即把所有HTML标签替换为\<p>标签
- 排版可能会有错乱（应该只是换行了而已）

### 3、clearAll: 一键清空编辑器功能

### 4、fullscreen: 全屏/退出全屏功能
