import style from './header.css'
import template from './header.html'

export default {
    name: 'header',//用于识别 HTML 中的自定义标签
    style: style,
    template: template,
    props: {},
    data: {
        navItems: [{
            title: '开发起源',
            href: '/story'
        }, {
            title: '基础教程',
            href: '/base'
        }, {
            title: 'API',
            href: '/api'
        }, {
            title: '全局样式',
            href: '/style'
        }, {
            title: '组件库',
            href: '/library'
        }],
        selectItem: 0,
        title: 'Totoro Frame'
    },
    methods: {}
}
