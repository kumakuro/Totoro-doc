/**
 * Created by wuxinzhe on 2017/7/20.
 */
export default Router;

function Router(options) {
    this.$parent = options.parent;
    this.$path = options.path;
    this.$el = [];
    this.$children = [];
    this.$totoros = [];
    this.$name = options.name;
    this.$component = options.component;
    this.$components = options.components;
    this.$pageActions = [];
    this.$redirect=options.redirect;
}