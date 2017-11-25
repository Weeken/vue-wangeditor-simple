export const fullscreen = {
  methods: {
    initFullscreen () {
      let enlarge = '<i title="全屏" class="w-icon-enlarge"></i>'
      let shrink = '<i title="全屏" class="w-icon-shrink"></i>'
      let isFullscreen = false
      let fullscreenBtn = this.createBtn(enlarge)
      this.toolbar.appendChild(fullscreenBtn)
      fullscreenBtn.addEventListener('click', _ => {
        this.editorEle.className = isFullscreen ? '' : 'fullscreen-editor'
        fullscreenBtn.innerHTML = isFullscreen ? enlarge : shrink
        isFullscreen = !isFullscreen
      }, false)
    }
  }
}
