# vue-wangeditor-simple


## 这个是基于**wangeditor v3.0+ 版本**写成的vue插件

**wangEditor** —— 轻量级 web 富文本编辑器，配置方便，使用简单。支持IE10+浏览器。

- 官网：[www.wangEditor.com](http://www.wangeditor.com/)
- 文档：[https://www.kancloud.cn/wangfupeng/wangeditor3/332599](https://www.kancloud.cn/wangfupeng/wangeditor3/332599)


## 安装及使用

```
npm install vue-wangeditor-simple --save

// main.js
import VueWangeditor from 'vue-wangeditor-simple'
Vue.use(VueWangeditor)

// app.vue
<div class="editor_wrap">
    <vue-wangeditor id="editor" :options="options" v-model="content" :init-content="initContent" :disabled="true"></vue-wangeditor>
    <vue-wangeditor id="editor1" :options="options1" v-model="content1" @get-text="getText"></vue-wangeditor>
</div>

data () {
    return {
      initContent: '<p>要初始化的内容</p>'
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
        'insertCode', //插入带类名的代码
        // <pre class="className"><code class="className">hellow world</code></pre>
        'fullscreen' // 全屏
      ],
        ],
        pasteFilterStyle: true,  // 打开/关闭粘贴样式的过滤
        ...
      }
    }
  }
```

## 优化

- props 新增```init-content```，传入要初始化的内容
- 由于之前版本都是检测v-model的变化，会影响输入，故将两者分开。



- 2018-11-11 update：
- props 新增```disabled```，控制编辑器的可编辑状态
- 2019-3-28 update:
- 移除```:text.sync="text"```，新增```@get-text="getText"```，使用事件代替```.sync```
```
getText (text) {
  console.log(text)
}
  ```

## 新增

### 1、clearStyle: 清除编辑器内所有文字的样式（无法撤销）
- 等同于粘贴样式的过滤的作用，去除标签内的style，class属性以及\<style>标签
- 文档里说 **pasteFilterStyle，pasteTextHandle配置暂时对 IE 无效** ，可以在配置menus里添加 **clearStyle** ，复制进去后手动清除样式，可以清除word文档复制过来的样式（在IE已测试）。
- 若有清除不了的，请报issues。


### 2、clearFormat: 清除格式（无法撤销）
- 这功能会把所有的文字格式化为正文，即把所有HTML标签替换为\<p>标签
- 排版可能会有错乱（应该只是换行了而已），请自行调整

### 3、clearAll: 一键清空编辑器功能
- 一键清空编辑器的所有内容

### 4、fullscreen: 全屏/退出全屏功能

### 5、insertCode: 插入带类名的代码
```
  <pre class="className"><code class="className">hellow world</code></pre>
```
为了方便在网页中使用插件(prismjs)来显示代码高亮

#### 欢迎前来[star](https://github.com/Weeken/vue-wangeditor-simple)或[issues](https://github.com/Weeken/vue-wangeditor-simple/issues)
