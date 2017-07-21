import style from './search-button.css'
import template from './search-button.html'


export default {
    name: 'search-button',//用于识别 HTML 中的自定义标签
    style: style,
    template: template,
    props: {},
    data(){
        return {
            content: '查询',
            disable: false
        }
    },
    methods: {
        change: function () {
            this.setData({
                content: '禁用',
                disable: true
            });
            this.$emit('test1',100);
        }
    },
    mounted: function () {
    },

    updated: function () {
    }
}
