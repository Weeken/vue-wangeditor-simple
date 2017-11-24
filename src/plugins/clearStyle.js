export const clearStyle = {
  methods: {
    initClearStyle () {
      let btn = document.createElement('div')
      btn.className = 'w-e-menu'
      btn.style.zIndex = '10001'
      btn.innerHTML = '<i title="过滤文字样式" class="w-icon-filter"></i>'
      return btn
    },
    clearStyle (item) {
      if (item.tagName === 'FONT') {
        item.removeAttribute('color')
      }
      if (item.tagName === 'STYLE') {
        item.innerHTML = ''
      }
      if (item.style) {
        item.removeAttribute('style')
      }
      if (item.class) {
        item.removeAttribute('class')
      }
    }
  }
}
