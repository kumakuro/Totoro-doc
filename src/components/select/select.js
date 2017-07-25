import style from './select.css'
import template from './select.html'


export default {
    name: 'select',
    style: style,
    template: template,
    props: {
        options: {
            type: Array,
            required: true
        },
        option: {
            type: Object,
            required: false,
            default() {
                return {
                    text: '苹果',
                    value: '1'
                }
            }
        }
    },
    data() {
        return {
            isVisibility: false,
            sex: '',
            text: '',
            textarea: ''
        }
    },
    methods: {
        showOptions: function (isVisibility) {
            this.$setData({
                isVisibility: !isVisibility
            })
        },
        select: function (idx) {
            this.$emit('select', idx);
            this.showOptions(true);
        }
    }
}
