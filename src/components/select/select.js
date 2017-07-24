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
        }
    },
    data() {
        return {
            id: 'select',

            isVisibility: false,
            option: {
                text: '',
                value: ''
            }
        }
    },
    methods: {
        showOptions: function (isVisibility) {
            this.setData({
                isVisibility: !isVisibility
            })
        },
        select: function (idx) {
            this.$emit('select', idx);
            this.showOptions(true);
        }
    }
}
