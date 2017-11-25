export const clearAll = {
  methods: {
    initClearAll () {
      let btn = document.createElement('div')
      btn.className = 'w-e-menu'
      btn.style.zIndex = '10001'
      btn.innerHTML = '<i title="一键清空编辑器" class="w-icon-file-empty"></i>'
      return btn
    },
    clearAll () {
      this.editor.txt.clear()
      this.setContent('<p><br></p>')
    }
  }
}
