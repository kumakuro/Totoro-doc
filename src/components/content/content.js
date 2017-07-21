/**
 * Created by wu on 2017/7/12.
 */
import style from './content.css'
import template from './content.html'


export default {
    name: 'content',//用于识别 HTML 中的自定义标签
    style: style,
    template: template,
    props:{
      id:'1'
    },
    data: {
        text: 'content'
    },
}
