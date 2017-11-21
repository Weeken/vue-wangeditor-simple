import VueWangeditor from './src/editor.vue'

/* istanbul ignore next */
VueWangeditor.install = function (Vue) {
  Vue.component(VueWangeditor.name, VueWangeditor)
}

export default VueWangeditor
