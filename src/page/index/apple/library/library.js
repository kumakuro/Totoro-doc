/**
 * Created by wu on 2017/7/21.
 */
import style from "./library.css";
import template from "./library.html";
import timePick from '../../../../components/timePick/time-pick';
import tabView from '../../../../components/tabView/tab-view';
import select from '../../../../components/select/select';

export default {
    name: 'library',
    style: style,
    template: template,
    components: [tabView, timePick, select],
    data() {
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
            }],
            options: [{
                text: '苹果',
                value: '1'
            }, {
                text: '香蕉',
                value: '2'
            }, {
                text: '梨子',
                value: '3'
            }, {
                text: '香橙',
                value: '4'
            }, {
                text: '菠萝',
                value: '5'
            }],
            selectFruit: {
                text: '',
                value: ''
            }
        }
    },
    methods: {
        changeTab: function (idx) {
            console.log(idx);
        },
        selectFruit: function (idx) {
            console.log();
            let data = this.$data.options[idx];
            this.setData({
                selectFruit: data
            })
        }
    },
}