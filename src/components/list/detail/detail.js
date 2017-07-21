/**
 * Created by wu on 2017/7/12.
 */
import style from './detail.css'
import template from './detail.html'
import content from '../../content/content'

export default {
    name: 'detail',//用于识别 HTML 中的自定义标签
    style: style,
    template: template,
    props: {},
    data: {
        idNum: 0
    },
    components: [content],
    beforeMount: function () {
        this.setData({
            idNum: this.$route.params.id
        });
    }
}
