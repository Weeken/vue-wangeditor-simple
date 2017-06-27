import VueWangeditor from './src/editor'

/* istanbul ignore next */
VueWangeditor.install = function (Vue) {
  Vue.component(VueWangeditor.name, VueWangeditor)
}

export default VueWangeditor
