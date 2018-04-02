export const clearStyle = {
  methods: {
    initClearStyle () {
      let clearStyleBtn = this.createBtn('<i title="一键过滤文字样式" class="w-icon-filter"></i>')
      this.toolbar.appendChild(clearStyleBtn)
      clearStyleBtn.addEventListener('click', _ => {
        let html = this.clearStyle()
        this.editor.cmd.do('insertHTML', html)
        this.editor.txt.html(html)
      }, false)
    },
    clearStyle () {
      // editor.txt.html()获取的内容无法清除<style>标签的样式
      // 所以要清除<style>标签
      // editor.txt.html()有时候获取的HTML会带样式，所以还是再过滤一次
      let arr = this.textWrap.getElementsByTagName('*')
      Array.from(arr).map(item => {
        if (item.style) {
          item.removeAttribute('style')
        }
        if (item.className) {
          item.removeAttribute('class')
        }
      })
      // 因为有的style属性没有过滤到，所以要用上面的removeAttribute去掉
      return this.editor.txt.html()// textWrap.innerHTML
             .replace(/ style=\"(.*?)\"/ig, '')
             .replace(/ style=\'(.*?)\'/ig, '')
             .replace(/ class=\"(.*?)\"/ig, '')
             .replace(/ class=\'(.*?)\'/ig, '')
             // word文档复制过来的样式
             .replace(/ lang=\"(.*?)\"/ig, '')
             .replace(/ face=\"(.*?)\"/ig, '')
             .replace(/ size=\"(.*?)\"/ig, '')
             .replace(/ align=\"(.*?)\"/ig, '')
             .replace(/ color=\"(.*?)\"/ig, '')
             .replace(/ border=\"(.*?)\"/ig, '')
             .replace(/<style>[\s\S]*?<\/style>/ig, '')
             .replace(/<o:p>[\s\S]*?<\/o:p>/ig, '')
             .replace(/<!--[\s\S]*?-->/ig, '')
    }
  }
}
