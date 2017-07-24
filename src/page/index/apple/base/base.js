import style from './base.css'
import template from './base.html'
import htmlCodeImg from '../../../../static/html_code.jpg'


export default {
    name: 'base',
    style: style,
    template: template,
    props: {},
    data() {
        return {
            baseTitle: '基础教程',
            polyfills: ['es5-shim/es5-sham', 'es6-shim/es6-sham', 'fix-ie', 'es6-promise', 'html5-history-api', 'console-polyfill'],
            externalLibraries: [{
                name: 'art-template.js',
                url: 'https://aui.github.io/art-template/',
            }, {
                name: 'page.js',
                url: 'http://visionmedia.github.io/page.js/',
            }, {
                name: 'axios.js',
                url: 'https://github.com/mzabriskie/axios'
            }],
            htmlCodeImg: htmlCodeImg,
            directives: [{
                directive: 'toro-name',
                info: '在嵌套组件时，用于指定特定的组件，与组件 JavaScript 文件中的 name 字段相对应。',
            }, {
                directive: 'toro-on',
                info: '用于绑定 DOM 节点上的相关事件，',
            }, {
                directive: 'toro-link',
                info: '用于标记实现路由跳转的 URL。',
            }, {
                directive: 'active-class',
                info: '与 toro-link 配合使用，作用是当 URL 匹配时要加上的类名，即为激活时的样式',
            }, {
                directive: 'emit-*',
                info: '用于子组件向父组件传递数据'
            }, {
                directive: 'props-*',
                info: '用于父组件向子组件传递数据'
            }, {
                directive: 'router-view',
                info: '定义路由节点'
            }]
        }
    },
}
