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
            tabArray: ['MainTab', 'TabOne', 'TabTwo']
        }
    },
    methods: {
        changeTab: function (idx) {
            switch (idx) {
                case 0 :
                    this.$router('/library/main');
                    break;
                case 1 :
                    this.$router('/library/two');
                    break;
            }
        }
    },
}