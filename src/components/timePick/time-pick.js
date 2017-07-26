/**
 * Created by wu on 2017/7/21.
 */
import style from "./time-pick.css";
import template from "./time-pick.html";
import DateUtils from './DateUtils';
import DateLanguages from './DateLanguages';

export default {
    name: 'timePick',
    style: style,
    template: template,
    props: {
        mondayFirst: {
            type: Boolean,
            default() {
                return false;
            }
        },
        language: {
            value: String,
            default() {
                return 'zh';
            }
        }
    },

    data() {
        return {
            currDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime(),
            selectedDate: null,
            showDayView: false,
            showMonthView: false,
            showYearView: false,
            calendarHeight: 0,
            daysOfWeek: []
        }
    },

    computed: {},

    methods: {
        translation() {
            return DateLanguages.translations[this.$props.language]
        },
        daysOfWeek() {
            if (this.$props.mondayFirst) {
                const tempDays = this.translation().days.slice();
                tempDays.push(tempDays.shift());
                return tempDays
            }
            return this.translation().days;
        },
    },

    beforeMount() {
        let daysOfWeek = this.daysOfWeek();
        this.$setData({
            daysOfWeek: daysOfWeek
        })
    }
}

