<template lang="html">
  <div id="editor" :value="value" style="width: 100%; height: 100%;"></div>
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
    value: String
  },
  data () {
    return {
      editor: {},
      content_: ''
    }
  },
  watch: {
    content_ (val) {
      // return the content to parent component
      this.$emit('input', this.content_)
    }
  },
  methods: {
    setContent (html) {
      this.content_ = html
    }
  },
  mounted () {
    this.editor = new E('#editor')

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

    // init props content
    if (this.value) {
      this.editor.txt.html(this.value)
    }
  }
}
</script>

<style lang="css">
</style>
