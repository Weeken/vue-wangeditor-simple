<template lang="html">
  <div :id="id"></div>
</template>

<script>
import E from 'wangeditor'
import { fullscreen } from '../plugins/fullscreen'
import { clearStyle } from '../plugins/clearStyle'
// import {editorOptions} from './mixins/editor-option.js'
// import '../plugins/fullscreen/wangEditor-fullscreen-plugin.css'
export default {
  name: 'VueWangeditor',
  mixins: [fullscreen, clearStyle],
  props: {
    options: {
      type: Object,
      default:  _ => { return {} }
    },
    id: String,
    value: String
  },
  data () {
    return {
      isInit: false,
      editor: {},
      content_: '',
      text: ''
    }
  },
  watch: {
    content_ (val) {
      // return the content to parent component
      this.$emit('input', val)
      this.text = this.editor.txt.text()
      this.$emit('update:text', this.text)
    },
    value (val) {
      if (!this.isInit) {
        // init content_
        this.editor.txt.html(val)
        this.isInit = true
      }
      this.content_ = val
    }
  },
  methods: {
    setContent (html) {
      this.content_ = html
    }
  },
  mounted () {
    this.editor = new E('#' + this.id)

    // init change event
    this.editor.customConfig.onchange = html => {
      this.setContent(html)
    }

    // init props options
    Object.keys(this.options).map(property => {
      this.editor.customConfig[property] = this.options[property]
    })

    // create the editor
    this.editor.create()


    let container = document.querySelector('#' + this.id + ' .w-e-text-container')
    let toolbar = document.querySelector('#' + this.id + ' .w-e-toolbar')
    if (this.options.width) {
      container.style.width = this.options.width
      toolbar.style.width = this.options.width
    }
    if (this.options.height) {
      container.style.height = this.options.height
    }

    // clearStyle
    if (this.options.menus.includes('clearStyle')) {
      let clearFormatBtn = this.initClearStyle()
      toolbar.appendChild(clearFormatBtn)
      clearFormatBtn.addEventListener('click', _ => {
        let container = document.querySelector('#' + this.id + ' .w-e-text')
        let content = Array.from(container.getElementsByTagName('*'))
        content.map(item => {
          this.clearStyle(item)
        })
        this.setContent(container.innerHTML)
      }, false)
    }

    // fullscreen
    if (this.options.menus.includes('fullscreen')) {
      let editorEle = document.querySelector('#' + this.id)
      let fullscreenBtn = this.initFullscreen()
      toolbar.appendChild(fullscreenBtn)
      fullscreenBtn.addEventListener('click', _ => {
        editorEle.className = this.fullscreen ? '' : 'fullscreen-editor'
        fullscreenBtn.innerHTML = this.fullscreen ? this.fullscreenInnerHTML : this.emptyscreenInnerHTML
        this.fullscreen = !this.fullscreen
      }, false)
    }

  }
}
</script>

<style lang="css">
  @font-face {
    font-family: 'w-icon';
    src: url('./fonts/icon.woff');
    font-weight: normal;
    font-style: normal;
  }
  [class^="w-icon-"],
  [class*=" w-icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'w-icon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .w-e-droplist{ z-index: 10010; }
  .w-e-menu{ z-index: 10 !important; }
  .w-e-text-container{ z-index: 9 !important; }
  .w-e-text-container .w-e-text h1{ font-size: 24px; margin: 22px 0; font-weight: bold; }
  .w-e-text-container .w-e-text h2{ font-size: 22px; margin: 20px 0; font-weight: bold; }
  .w-e-text-container .w-e-text h3{ font-size: 20px; margin: 18px 0; font-weight: bold; }
  .w-e-text-container .w-e-text h4{ font-size: 18px; margin: 16px 0; font-weight: bold; }
  .w-e-text-container .w-e-text h5{ font-size: 16px; margin: 14px 0; font-weight: bold; }

  .w-e-text-container .w-e-text table th{ text-align: center; }
  .w-e-text-container .w-e-text table td{ text-align: center; }

  .w-e-text-container .w-e-text ul li { list-style-type: disc; }
  .w-e-text-container .w-e-text ol li { list-style-type: decimal; }

  .w-e-text-container .w-e-text b { font-weight: 800; }

  .w-e-toolbar {
  	flex-wrap: wrap;
  	-webkit-box-lines: multiple;
  }

  .w-e-menu .w-icon-clearFormat:before {
  	content: "\ea6f";
  }

  .w-e-menu .w-icon-fullscreen:before {
  	content: "\e98b";
  }
  .w-e-menu .w-icon-emptyscreen:before {
  	content: "\e98c";
  }

  .fullscreen-editor {
  	position: fixed !important;
  	width: 100% !important;
  	height: 100% !important;
  	left: 0px !important;
  	top: 0px !important;
  	background-color: white;
  	z-index: 9999;
  }

  .fullscreen-editor .w-e-toolbar {
    width: 100% !important;
  }
  .fullscreen-editor .w-e-text-container {
  	width: 100% !important;
  	height: 95% !important;
  }
</style>
