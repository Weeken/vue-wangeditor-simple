<template lang="html">
  <div :id="id"></div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'VueWangeditor',
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
      content_: ''
    }
  },
  watch: {
    content_ (val) {
      // return the content to parent component
      this.$emit('input', val)
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
      container.style.width = this.options.width + 'px'
      toolbar.style.width = this.options.width + 'px'
    }
    if (this.options.height) {
      container.style.height = this.options.height + 'px'
    }
  }
}
</script>

<style lang="css">
  .w-e-droplist{ z-index: 10010; }
  .w-e-text-container .w-e-text h1{ font-size: 24px; margin: 22px 0; font-weight: bold; }
  .w-e-text-container .w-e-text h2{ font-size: 22px; margin: 20px 0; font-weight: bold; }
  .w-e-text-container .w-e-text h3{ font-size: 20px; margin: 18px 0; font-weight: bold; }
  .w-e-text-container .w-e-text h4{ font-size: 18px; margin: 16px 0; font-weight: bold; }
  .w-e-text-container .w-e-text h5{ font-size: 16px; margin: 14px 0; font-weight: bold; }

  .w-e-text-container .w-e-text table th{ text-align: center; }
  .w-e-text-container .w-e-text table td{ text-align: center; }

  .w-e-text-container .w-e-text ul li { list-style-type: disc; }
</style>
