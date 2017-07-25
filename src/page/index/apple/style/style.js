import style from './style.css'
import template from './style.html'


export default {
    name: 'style',//用于识别 HTML 中的自定义标签
    style: style,
    template: template,
    props: {},
    data(){
        return{
            text:{
                content:'<div class="{{style[\'lay-vertical\']}} font-title">h1 文章大标题</div>\n' +
                '<div class="{{style[\'lay-vertical\']}} font-bread">h2 面包屑页面标题</div>\n' +
                '<div class="{{style[\'lay-vertical\']}} font-sub-first">h3 内容一级标题</div>\n' +
                '<div class="{{style[\'lay-vertical\']}} font-sub-second">h4 内容二级标题</div>\n' +
                '<div class="{{style[\'lay-vertical\']}} font-detail">h5 文章详情正文</div>\n' +
                'div class="{{style[\'lay-vertical\']}} font-list-content">h6 列表内容</div>\n' +
                '<div class="{{style[\'lay-vertical\']}} font-list-head">h7 列表标题</div>\n' +
                '<div class="{{style[\'lay-vertical\']}} font-minor">h8 次要文字、辅助性文字</div>\n' +
                '<div class="{{style[\'lay-vertical\']}}">\n' +
                '   <input type="text" placeholder="h9 输入框提示文字" name="" value="">\n' +
                '</div>\n' +
                '<div class="{{style[\'lay-vertical\']}} font-link">h10 链接</div>',
            },
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
            },
            labelSmall:{
                content:'<div class="{{style[\'lay-horizontal\']}} font-sub-first">2-label-small标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-small label-small-normal">完成</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-small label-small-warn">紧急</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-small label-small-finish">重要</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-small label-small-error">超期</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-small label-small-forbid">撤销</div>',
            },
            labelMedium:{
                content:'<div class="{{style[\'lay-horizontal\']}} font-sub-first">3-label-medium标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-medium label-medium-normal">实心标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-medium label-medium-warn">实心标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-medium label-medium-finish">实心标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-medium label-medium-error">实心标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-medium label-medium-forbid">实心标签</div>',
            },
            labelLarge:{
                content:'<div class="{{style[\'lay-horizontal\']}} font-sub-first">4-label-large标签</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-large label-large-normal">待采稿</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-large label-large-warn">待采稿</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-large label-large-finish">已发布</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-large label-large-error">核稿撤回</div>\n' +
                '<div class="{{style[\'lay-horizontal\']}} label-large label-large-forbid">弃稿</div>',
            },
            labelChoose:{
                content:'<div class="{{style[\'lay-horizontal\']}} font-sub-first">5-单位标签</div>\n' +
                '<div class="label-choose font-logo">\n' +
                '   <div class="item-left">黄轩</div>\n' +
                '   <div class="item-right logo-delete"></div>\n' +
                '</div>',
            }
        }



    }
}
