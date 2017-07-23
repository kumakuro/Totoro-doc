/**
 * Created by wu on 2017/7/21.
 */
import style from "./tab-view.css";
import template from "./tab-view.html";

export default {
    name: 'tabView',
    style: style,
    template: template,
    props: {
        tabArray: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            selectItem: 0,
        }
    },
    methods: {
    },
}