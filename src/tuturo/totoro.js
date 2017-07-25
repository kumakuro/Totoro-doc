/**
 * Created by wuxinzhe on 2017/7/17.
 */
import Totoro from "./totoro-core";
import Router from './totoro-router';
import page from "page";

export default TotoroCli;

/**
 * Totoro 构建
 * @param options
 * @constructor
 */
function TotoroCli(options) {
    let component = options.component;
    //包装对象
    let root = new Totoro({
        el: document.getElementById(options.el),
    });
    //初始化组件树
    initTotoro(root, component);
    //渲染界面
    for (let i = 0, length = root.$children.length; i < length; i++) {
        root.$children[i].$create();
    }
    let routesConfig = options.routes;
    configPage(options.el, routesConfig);
}

/**
 * 初始化路由
 * @param el
 * @param routesConfig
 */
function configPage(el, routesConfig) {
    //------start---构建根路由对象
    let rootRouter = new Router({
        parent: null,
        path: "/",
    });
    let pageAction = function (ctx, next) {
        console.log('I\'m the Root Router!');
        next();
    };
    let totoro = new Totoro({
        el: document.getElementById(el)
    });
    rootRouter.$totoros.push(totoro);
    rootRouter.$pageActions.push(pageAction);
    //------end---构建根路由对象

    initPage(routesConfig.routes, rootRouter);
    registerRouter(rootRouter);
    page.start(null);

}

/**
 * 注册路由
 * @param parentRouter
 */
function registerRouter(parentRouter) {
    let routers = parentRouter.$children;
    for (let i = 0; i < routers.length; i++) {
        let router = routers[i];
        let totoros = [];
        if (router.$components !== undefined) {
            //多路由并存情况
            for (let key in router.$components) {
                if (router.$components.hasOwnProperty(key)) {
                    let component = router.$components[key];
                    for (let j = 0; j < router.$parent.$totoros.length; j++) {
                        let data = 'function' === typeof component.data ? component.data() : component.data;
                        //创建对象
                        let toro = new Totoro({
                            el: getComponentNode(component.template, data, component.style, {}),
                            data: data,
                            props: {},
                            name: component.name,
                            methods: component.methods,
                            style: component.style,
                            template: component.template,
                            routeName: key,
                            beforeCreate: component.beforeCreate,
                            created: component.created,
                            beforeMount: component.beforeMount,
                            mounted: component.mounted,
                            beforeUpdate: component.beforeUpdate,
                            updated: component.updated,
                            routerObject: router
                        });
                        toro.$isRoute = true;
                        toro.$routeSlot = router.$parent.$totoros[j].$el.querySelector("[router-view='" + key + "']");
                        totoros.push(toro);
                        let childComponents = component.components;
                        if (childComponents !== undefined && childComponents.length > 0) {
                            for (let j = 0; j < childComponents.length; j++) {
                                initTotoro(toro, childComponents[j])
                            }
                        }
                    }
                }
            }
        } else {
            let component = router.$component;
            for (let j = 0; j < router.$parent.$totoros.length; j++) {
                let el = router.$parent.$totoros[j].$el.querySelector("[router-view]");
                let data = 'function' === typeof component.data ? component.data() : component.data;
                //创建对象
                let toro = new Totoro({
                    el: getComponentNode(component.template, data, component.style, {}),
                    data: data,
                    props: {},
                    name: component.name,
                    methods: component.methods,
                    style: component.style,
                    template: component.template,
                    beforeCreate: component.beforeCreate,
                    created: component.created,
                    beforeMount: component.beforeMount,
                    mounted: component.mounted,
                    beforeUpdate: component.beforeUpdate,
                    updated: component.updated,
                    routerObject: router
                });
                toro.$isRoute = true;
                totoros.push(toro);
                let childComponents = component.components;
                if (childComponents !== undefined && childComponents.length > 0) {
                    for (let j = 0; j < childComponents.length; j++) {
                        initTotoro(toro, childComponents[j])
                    }
                }
            }
        }
        router.$totoros = totoros;
        let pageAction = function (ctx, next) {
            for (let i = 0; i < router.$totoros.length; i++) {
                router.$totoros[i].$route = ctx;
                router.$totoros[i].$create();
            }
            next();
        };

        //构建方法数组
        router.$pageActions.push.apply(router.$pageActions, parentRouter.$pageActions);
        router.$pageActions.push(pageAction);
        //复制数组，防止路径混入下一次迭代
        let array = router.$pageActions.concat();
        array.unshift(router.$path);
        array.push(function (ctx) {
            let linkElements = Array.from(document.querySelectorAll('[toro-link]'));
            for (let i = 0, length = linkElements.length; i < length; i++) {
                let link = linkElements[i];
                let path = link.getAttribute('toro-link');
                if (link.hasAttribute('active-class')) {
                    let currentPath = ctx.pathname;
                    let activeClass = link.getAttribute('active-class');
                    if (currentPath.indexOf(path) >= 0) {
                        let currentClass = link.getAttribute('class');
                        if (currentClass === null) {
                            link.setAttribute('class', activeClass);
                        } else {
                            link.setAttribute('class', currentClass + ' ' + activeClass);
                        }
                    }
                }
                link.addEventListener('click', function (event) {
                    page(path);
                    event.preventDefault();
                })
            }
            if (router.$redirect !== undefined) {
                page.redirect(router.$redirect);
            }
        });
        //注册路由
        page.apply(null, array);

        if (router.hasOwnProperty('$children')) {
            registerRouter(router);
        }

    }
}

/**
 * 初始化路由配置
 * @param routes
 * @param routerParent
 */
function initPage(routes, routerParent) {
    for (let i = 0; i < routes.length; i++) {
        let route = routes[i];
        let path = '';
        if (routerParent.$path === '/') {
            if (route.path === '/') {
                path = route.path;
            } else {
                path = routerParent.$path + route.path;
            }
        } else {
            path = routerParent.$path + '/' + route.path;
        }
        let router = {};
        if (route.component !== undefined) {
            router = new Router({
                parent: routerParent,
                path: path,
                component: route.component,
                name: route.name,
                redirect: route.redirect
            });
        } else {
            router = new Router({
                parent: routerParent,
                path: path,
                components: route.components,
                name: route.name,
                redirect: route.redirect
            });
        }
        routerParent.$children.push(router);
        //包含子路由则继续迭代
        if (route.hasOwnProperty('children')) {
            initPage(route.children, router);
        }
    }
}

/**
 *  Totoro 对象树初始化
 * @param $parent 父级 Turo 对象
 * @param component
 */
function initTotoro($parent, component) {

    let slots = getParentSlots($parent, component.name);

    for (let i = 0; i < slots.length; i++) {
        let props = getPropsFromParentSlots(slots[i]);
        props = checkProps(component.props, props, name);
        let data = 'function' === typeof component.data ? component.data() : component.data;
        let el = getComponentNode(component.template, data, component.style, props);
        let parent = $parent;
        let methods = component.methods;
        let name = component.name;
        let style = component.style;
        //创建对象
        let turo = new Totoro({
            el: el,
            data: data,
            props: props,
            parent: parent,
            name: name,
            methods: methods,
            style: style,
            template: component.template,
            slotIndex: i,
            beforeCreate: component.beforeCreate,
            created: component.created,
            beforeMount: component.beforeMount,
            mounted: component.mounted,
            beforeUpdate: component.beforeUpdate,
            updated: component.updated
        });
        //将对象放入父级 turo 放入子节点数组当中
        $parent.$children.push(turo);
        let childComponents = component.components;
        if (childComponents !== undefined && childComponents.length > 0) {
            for (let j = 0; j < childComponents.length; j++) {
                initTotoro(turo, childComponents[j])
            }
        }
    }
}

/**
 * 获取组件节点
 * @param template 模板对象
 * @param data 数据对象
 * @param style 样式对象
 * @param props 外部属性
 */
function getComponentNode(template, data, style, props) {
    let templateObject = {
        data: data,
        style: style,
        props: props
    };
    let htmlCode = template(templateObject);
    let htmlCodeContainer = document.createElement('div');
    htmlCodeContainer.innerHTML = htmlCode;
    return htmlCodeContainer.firstChild;
}

/**
 * 获取父级模板插入点
 * @param $parent 父级 Turo 对象
 * @param name 组件名字
 * @returns {Array} 插入点数组
 */
function getParentSlots($parent, name) {
    let kebabCaseName = name.replace(/([A-Z])/g, "-$1").toLowerCase();
    return Array.from($parent.$el.querySelectorAll("[toro-name='" + kebabCaseName + "']"));
}

/**
 * 从父级模板插入点获取 Props 数据
 * @param slotNode
 */
function getPropsFromParentSlots(slotNode) {
    let attrArray = Array.from(slotNode.attributes);
    if (attrArray.length < 0) {
        //若节点不存在属性，则直接退出
        return {};
    }
    let props = {};
    for (let j = 0; j < attrArray.length; j++) {
        //如果节点名称符合指定规范
        if (attrArray[j].nodeName.indexOf('props') === 0) {
            //将节点名称转换成普通的驼峰命名法
            let propName = attrArray[j].nodeName.substring(attrArray[j].nodeName.indexOf('-') + 1).replace(/-(\w)/g, function (all, letter) {
                return letter.toUpperCase();
            });
            props[propName] = JSON.parse(attrArray[j].value);
        }
    }
    return props;
}

function checkProps($props, props, $name) {
    for (let key in $props) {
        //required校验
        if ($props.hasOwnProperty(key) && !props.hasOwnProperty(key) && $props[key].hasOwnProperty('required') && $props[key].required) {
            throw new Error('组件[' + $name + ']的props属性：' + key + '为必传！，请检查配置');
        }
       
        if ($props.hasOwnProperty(key) && !props.hasOwnProperty(key) && $props[key].hasOwnProperty('default')) {
            props[key] = $props[key]['default']();
        }
    }
    return props;
}


