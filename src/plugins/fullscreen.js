export const fullscreen = {
  data () {
    return {
      fullscreen: false,
      fullscreenInnerHTML: '<i title="全屏" class="w-icon-enlarge"></i>',
      emptyscreenInnerHTML: '<i title="退出全屏" class="w-icon-shrink"></i>'
    }
  },
  methods: {
    initFullscreen () {
      let btn = document.createElement('div')
      btn.className = 'w-e-menu'
      btn.style.zIndex = '10001'
      btn.innerHTML = this.fullscreenInnerHTML
      return btn
    }
  }
}
