export const clearAll = {
  methods: {
    initClearAll () {
      let clearAllBtn = this.createBtn('<i title="一键清空编辑器" class="w-icon-file-empty"></i>')
      this.toolbar.appendChild(clearAllBtn)
      clearAllBtn.addEventListener('click', _ => {
        this.clearAll()
      }, false)
    },
    clearAll () {
      this.editor.txt.clear()
      this.editor.cmd.do('insertHTML', '<p><br></p>')
    }
  }
}
