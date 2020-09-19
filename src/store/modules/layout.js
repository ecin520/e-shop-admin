export default {
  state: {
    isCollapse: false,
    menu: '',
    breadcrumb: []
  },
  mutations: {
    collapse(state) {
      state.isCollapse = !state.isCollapse
    },
    setMenu(state, hover) {
      state.menu = hover
    },
    setBreadcrumb(state, value) {
      state.breadcrumb = value
    }
  },
  actions: {
    collapse(ctx) {
      ctx.commit('collapse')
    },
    changeMenu(ctx, {hover}) {
      ctx.commit('setMenu', hover)
    },
    changeBreadcrumb(ctx, {value}) {

      ctx.commit('setBreadcrumb', value)
    }
  }
}
