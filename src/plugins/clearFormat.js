export const clearFormat = {
  methods: {
    initClearFormat () {
      let btn = document.createElement('div')
      btn.className = 'w-e-menu'
      btn.style.zIndex = '10001'
      btn.innerHTML = '<i title="清除文字格式" class="w-icon-clear-formatting"></i>'
      return btn
    },
    clearFormat () {
      let str = this.content_
      let arr = str.split(/(<[^>]*>([\s\S]*?)|<[^>]*><\/[^>]*>)/)

      // 去除空字符串，结束标签
      let newContent = arr.filter(item => {
        return item !== '' && item.indexOf('</') === -1
      }).filter(item => {
        // 去掉起始标签
        return !item.includes('<') || item.startsWith('<img')
      }).map(item => {
        return `<p>${item}</p>`
      }).join('')
      // console.log(newContent)
      return newContent
    }
  }
}
