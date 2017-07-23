/**
 * Created by wu on 2017/7/21.
 */
import style from "./library.css";
import template from "./library.html";
import timePick from '../../../../components/timePick/time-pick';
import tabView from '../../../../components/tabView/tab-view';

export default {
    name: 'library',
    style: style,
    template: template,
    components: [tabView, timePick],
    data(){
        return {
            tabArray: [{
                title: 'MainTab',
                href: '/library/main'
            }, {
                title: 'TabOne',
                href: '/library/one'
            }, {
                title: 'TabTwo',
                href: '/library/two'
            }]
        }
    },
    methods: {
        changeTab: function (idx) {
            console.log(idx);
        }
    },
}