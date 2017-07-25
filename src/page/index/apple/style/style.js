import style from './style.css'
import template from './style.html'


export default {
    name: 'style',//用于识别 HTML 中的自定义标签
    style: style,
    template: template,
    props: {},
    data(){
        return{
            firstButton:{
                content:'一级按钮',
                disable:false
            },
            secondButton:{
                content:'二级按钮',
                disable:false
            },
            searchButton:{
                content:'搜索',
                disable:false
            },
            textLabel:{
                content:'<div class="{{style[\'lay-horizontal\']}} font-sub-first">1-文字标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} text-normal">文字标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} text-warn">文字标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} text-finish">文字标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} text-error">文字标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} text-forbid">文字标签</div>',
            }

        }
    }
}
