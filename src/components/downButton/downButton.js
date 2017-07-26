/**
 * Created by wu on 2017/7/21.
 */
import style from "./downButton.css";
import template from "./downButton.html";

export default {
    name: 'downButton',
    style: style,
    template: template,
    props:{
        option:{
            type: Object,
            required: true
        },
        options:{
            type: Array,
            required: true
        }

    },
    data(){
        return {
            isVisibility: false
        }
    },
    methods: {
        showOptions: function (isVisibility) {
            this.$setData({
                isVisibility: !isVisibility
            })
        },
        select: function (idx) {
            // this.$emit('select', idx);
            this.showOptions(true);
        }
    },
}