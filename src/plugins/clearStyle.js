export const clearStyle = {
  methods: {
    initClearStyle () {
      let clearStyleBtn = this.createBtn('<i title="一键过滤文字样式" class="w-icon-filter"></i>')
      this.toolbar.appendChild(clearStyleBtn)
      clearStyleBtn.addEventListener('click', _ => {
        let html = this.clearStyle()
        this.setContent(html)
        this.editor.txt.html(html)
      }, false)
    },
    clearStyle () {
      // editor.txt.html()获取的内容无法清除<style>标签的样式
      // 所以要清除<style>标签
      // editor.txt.html()有时候获取的HTML会带样式，所以还是再过滤一次
      let styleTagReg = /<style>[\s\S]*?<\/style>/g
      let styleReg = / style=\"(.*?)\"/g
      let classReg = / class=\"(.*?)\"/g
      // console.log(this.editor.txt.html())
      return this.editor.txt.html().replace(styleReg, '').replace(classReg, '').replace(styleTagReg, '')
    }
  }
}
