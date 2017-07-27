import style from './index.css'
import template from './index.html'


export default {
    name: 'index',//用于识别 HTML 中的自定义标签
    style: style,
    template: template,
    props: {},
    data: {},
    created() {
        let data = {
            abc: 123
        };
        data.abc='123';
    }
}
