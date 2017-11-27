import VueWangeditor from './editor.vue'

/* istanbul ignore next */
VueWangeditor.install = function (Vue) {
  Vue.component(VueWangeditor.name, VueWangeditor)
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueWangeditor)
}

export default VueWangeditor
