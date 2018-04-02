export const clearFormat = {
  methods: {
    clearFormat () {
      let str = this.editor.txt.html()
      let arr = str.split(/(<[^>]*>([\s\S]*?)|<[^>]*><\/[^>]*>)/)

      // 去除空字符串，结束标签
      let newContent = arr.filter(item => {
        return item !== '' && !item.includes('</')
      }).filter(item => {
        // 去掉起始标签
        return !item.includes('<') || item.startsWith('<img')
      }).map(item => {
        return `<p>${item}</p>`
      }).join('')
      // console.log(newContent)
      return newContent
    },
    initClearFormat () {
      let clearFormatBtn = this.createBtn('<i title="一键清除文字格式" class="w-icon-clear-formatting"></i>')
      this.toolbar.appendChild(clearFormatBtn)
      clearFormatBtn.addEventListener('click', _ => {
        let formatContent = this.clearFormat()
        this.$emit('input', formatContent)
        this.editor.txt.html(formatContent)
      }, false)
    }
  }
}
