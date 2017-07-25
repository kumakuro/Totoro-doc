/**
 * Created by wuxinzhe on 2017/7/13.
 */
import page from "page";
import utils from './totoro-util';

export default Totoro;

function Totoro(opt) {
    this.$beforeCreate = opt.beforeCreate;
    //生命周期函数：对象初始化之前
    if (this.$beforeCreate !== undefined && 'function' === typeof this.$beforeCreate) {
        this.$beforeCreate();
    }

    //方法复制
    if (opt.methods !== undefined) {
        for (let methodName in opt.methods) {
            if (opt.methods.hasOwnProperty(methodName)) {
                this[methodName] = opt.methods[methodName];
            }
        }
    }

    this.$name = opt.name;
    this.$data = opt.data;
    this.$template = opt.template;
    this.$style = opt.style;
    this.$slotIndex = opt.slotIndex;
    this.$routeName = opt.routeName;
    this.$isRoute = false;
    this.$props = opt.props;

    this.$parent = opt.parent;
    this.$el = opt.el;
    this.$children = [];
    this.$router = page;
    this.$route = {};
    this.$routerObject = opt.routerObject;

    this.$created = opt.created;
    this.$beforeMount = opt.beforeMount;
    this.$mounted = opt.mounted;
    this.$beforeUpdate = opt.beforeUpdate;
    this.$updated = opt.updated;
    //仅在生命周期 mounted 后才可用
    this.$emitMethodsMap = {};

    this.$modelChangePropsName = '';

    /**
     * 触发父节点方法
     * @param eventName
     * @param data
     */
    this.$emit = function (eventName, data) {
        if (this.$emitMethodsMap.hasOwnProperty(eventName)) {
            let methodName = this.$emitMethodsMap[eventName];
            if (this.$parent.hasOwnProperty(methodName)) {
                if (undefined === data) {
                    this.$parent[methodName]();
                } else {
                    this.$parent[methodName](data);
                }
            } else {
                throw new Error('父组件尚未包含[' + methodName + ']方法,请检查父组件 js 配置');
            }
        } else {
            throw new Error('尚未注册事件[' + eventName + '],请检查 Html 配置');
        }
    };

    /**
     * 组件创建
     */
    this.$create = function () {
        //生命周期函数：页面渲染前
        if (this.$beforeMount !== undefined && 'function' === typeof this.$beforeMount) {
            this.$beforeMount();
        }
        let refSlot = {};
        if (this.$isRoute) {
            refSlot = getRouteSlotRef(this.$routerObject, this.$routeName);
        } else {
            refSlot = getParentSlots(this.$parent, this.$name)[0];
        }
        let props = getPropsFromParentSlots(refSlot);
        this.$props = checkProps(this.$props, props, this.$name);
        this.$emitMethodsMap = getEmitMethodMap(refSlot);
        render(refSlot, this);
        if (this.$children.length !== 0) {
            for (let i = 0, length = this.$children.length; i < length; i++) {
                this.$children[i].$create();
            }
        }
        //生命周期函数：页面渲染后
        if (this.$mounted !== undefined && 'function' === typeof this.$mounted) {
            this.$mounted();
        }
    };

    /**
     * DOM 事件绑定
     */
    this.$bindEvent = function () {
        let $this = this;
        let elements = Array.from(this.$el.querySelectorAll('[toro-on]'));
        if (null !== this.$el.getAttribute('toro-on') && '' !== this.$el.getAttribute('toro-on')) {
            elements.push(this.$el);
        }
        if (elements.length !== 0) {
            for (let i = 0; i < elements.length; i++) {
                let $childEle = elements[i];
                let actionStr = $childEle.getAttribute('toro-on').split('|');
                $childEle.addEventListener(actionStr[0].trim(), function (event) {
                    let methodName = actionStr[1].trim();
                    if (actionStr.length === 3) {
                        let args = JSON.parse(actionStr[2].trim());
                        $this[methodName](args, event);
                    } else {
                        $this[methodName](event);
                    }
                });
                $childEle.removeAttribute('toro-on');
            }
        }
        this.$modelInit(this.$el);
    };

    /**
     * 更新数据
     * @param newData
     */
    this.$setData = function (newData) {
        if (this.$beforeUpdate !== undefined && 'function' === typeof this.$beforeUpdate) {
            this.$beforeUpdate();
        }
        Object.assign(this.$data, newData);
        if (Array.from(this.$el.querySelectorAll('[router-view]')).length > 0) {
            this.$router(window.location.pathname);
        } else {
            let refSlot = this.$isRoute ? getRouteSlotRef(this.$routerObject, this.$routeName) : getSlotRef(this.$parent, this.$name, this.$slotIndex);
            render(refSlot, this);
            if (this.$children.length !== 0) {
                for (let i = 0, length = this.$children.length; i < length; i++) {
                    this.$children[i].$create();
                }
            }
        }
        if (this.$updated !== undefined && 'function' === typeof this.$updated) {
            this.$updated();
        }
    };

    /**
     * 数据双向绑定初始化
     * @param node
     */
    this.$modelInit = function (node) {
        let $this = this;
        let els = utils.getElementsByAttr(node, 'toro-model');
        if (els.length !== 0) {
            for (let i = 0; i < els.length; i++) {
                let $input = els[i];
                switch ($input.type) {
                    case 'checkbox':
                        $input.addEventListener("change", function (event) {
                            let $checkbox = event.target;
                            let propsName = $checkbox.getAttribute('toro-model');
                            $this.$modelChangePropsName = propsName;
                            let propsValue = $checkbox.value;
                            if ($checkbox.checked) {
                                if ($this.$data.hasOwnProperty(propsName)) {
                                    let checkedArray = $this.$data[propsName].concat();
                                    checkedArray.push(propsValue);
                                    let obj = {};
                                    obj[propsName] = checkedArray;
                                    $this.$setData(obj);
                                }
                            } else {
                                if ($this.$data.hasOwnProperty(propsName)) {
                                    let checkedArray = $this.$data[propsName].concat();
                                    utils.arrayRemoveValue(checkedArray, propsValue);
                                    let obj = {};
                                    obj[propsName] = checkedArray;
                                    $this.$setData(obj);
                                }
                            }
                        });
                        break;
                    case 'text':
                    case 'number':
                    case 'tel':
                    case 'password':
                        $input.addEventListener("blur", function (event) {
                            let $input = event.target;
                            let propsName = $input.getAttribute('toro-model');
                            $this.$modelChangePropsName = propsName;
                            if ($this.$data.hasOwnProperty(propsName)) {
                                let obj = {};
                                obj[propsName] = $input.value;
                                $this.$setData(obj);
                            }
                        });
                        break;
                }

            }
        }
    };

    /**
     * 双向数据绑定的节点绘制方法
     * @param node
     */
    this.$modelRender = function (node) {
        let $inputs = utils.getElementsByAttr(node, 'toro-model');
        if ($inputs.length > 0) {
            for (let i = 0; i < $inputs.length; i++) {
                let $input = $inputs[i];
                let propsName = $input.getAttribute('toro-model');
                let data = this.$data[propsName];
                switch ($input.type) {
                    case 'checkbox':
                        $input.checked = utils.arrayContains(data, $input.value);
                        break;
                    case 'text':
                    case 'number':
                    case 'tel':
                    case 'password':
                        $input.value = data;
                        break;
                }

            }
        }
    };
    //生命周期函数：对象初始化之后
    if (this.$created !== undefined && 'function' === typeof this.$created) {
        this.$created();
    }
}


/**
 * 渲染方法
 * @param refSlot
 * @param toro
 */
function render(refSlot, toro) {
    let newNode = getTotoroNode(toro.$template, toro.$data, toro.$style, toro.$props);
    if (toro.$isRoute) {
        newNode.setAttribute("router-view", toro.$routeName === undefined ? '' : toro.$routeName);
    } else {
        newNode.setAttribute(toro.$name + '-index', toro.$slotIndex);
    }
    refSlot.parentNode.replaceChild(newNode, refSlot);
    toro.$modelRender(newNode);
    toro.$modelChangePropsName = '';
    toro.$el = newNode;
    toro.$bindEvent();
}

/**
 * 根据父级模板获取插入点（用于首次初始化）
 * @param $parent
 * @param name
 * @returns {Array}
 */
function getParentSlots($parent, name) {
    let kebabCaseName = name.replace(/([A-Z])/g, "-$1").toLowerCase();
    return Array.from($parent.$el.querySelectorAll("[toro-name='" + kebabCaseName + "']"));
}

/**
 * 获取插入点（用于替换更新）
 * @param $parent
 * @param name
 * @param slotIndex
 * @returns {Element}
 */
function getSlotRef($parent, name, slotIndex) {
    return $parent.$el.querySelector("[" + name + "-index='" + slotIndex + "']");
}

/**
 * 获取插入点（路由更新组件）
 * @param routerObject
 * @param routeName
 * @returns {{}}
 */
function getRouteSlotRef(routerObject, routeName) {
    let parentTotoros = routerObject.$parent.$totoros;
    let routeSlot = {};
    for (let i = 0; i < parentTotoros.length; i++) {
        if (routeName === undefined) {
            routeSlot = parentTotoros[i].$el.querySelector('[router-view]');
        } else {
            routeSlot = parentTotoros[i].$el.querySelector("[router-view='" + routeName + "']");
        }
    }
    return routeSlot;
}

/**
 * 获取 Toro 的 Html 节点（模板渲染后转换好的节点对象）
 * @param template
 * @param data
 * @param style
 * @param props
 * @returns {Node}
 */
function getTotoroNode(template, data, style, props) {
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
 * 从父节点对象中获取传入值
 * @param slotNode
 * @returns {{}}
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

/**
 * 校验并完善 Props
 * @param $props
 * @param props
 * @param $name
 * @returns {*}
 */
function checkProps($props, props, $name) {
    for (let key in $props) {
        //required校验
        if ($props.hasOwnProperty(key) && !props.hasOwnProperty(key) && $props[key].hasOwnProperty('required')) {
            throw new Error('组件[' + $name + ']的props属性：' + key + '为必传！，请检查配置');
        }
        //数据类型校验
        if ($props.hasOwnProperty(key) && $props[key].hasOwnProperty('type')) {
            let propsType = typeof props[key];
            if ($props[key].type instanceof Array && $props[key].type.indexOf(propsType.toUpperCase()) < 0) {
                throw new Error('组件[' + $name + ']的props属性：' + key + '的数据类型不应该为' + propsType)
            } else if ($props[key].type.toLowerCase() !== propsType) {
                throw new Error('组件[' + $name + ']的props属性：' + key + '的数据类型不应该为' + propsType)
            }
        }
        if ($props.hasOwnProperty(key) && !props.hasOwnProperty(key) && $props[key].hasOwnProperty('default')) {
            props[key] = $props[key]['default']();
        }
    }
    return props;
}

/**
 * 获取父子组件关联方法映射
 * @param slotNode
 * @returns {{}}
 */
function getEmitMethodMap(slotNode) {
    let attrArray = Array.from(slotNode.attributes);
    if (attrArray.length < 0) {
        //若节点不存在属性，则直接退出
        return {};
    }
    let emitMap = {};
    for (let j = 0; j < attrArray.length; j++) {
        //如果节点名称符合指定规范
        if (attrArray[j].nodeName.indexOf('emit') === 0) {
            //将节点名称转换成普通的驼峰命名法
            let parentMethod = attrArray[j].nodeName.substring(attrArray[j].nodeName.indexOf('-') + 1).replace(/-(\w)/g, function (all, letter) {
                return letter.toUpperCase();
            });
            let childMethod = attrArray[j].value.replace(/-(\w)/g, function (all, letter) {
                return letter.toUpperCase();
            });
            emitMap[childMethod] = parentMethod;
        }
    }
    return emitMap;
}
