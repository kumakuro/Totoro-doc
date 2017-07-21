import style from './story.css'
import template from './story.html'


export default {
    name: 'story',//用于识别 HTML 中的自定义标签
    style: style,
    template: template,
    props: {},
    data() {
        return {
            storyTitle: '框架介绍'
        }
    },
}
