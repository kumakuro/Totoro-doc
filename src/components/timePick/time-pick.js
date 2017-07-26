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
        },
        disabled: {
            type: Object
        },
        highlighted: {
            type: Object
        },
    },

    data() {
        return {
            currDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime(),
            selectedDate: null,
            showDayView: false,
            showMonthView: false,
            showYearView: false,
            calendarHeight: 0,
            daysOfWeek: [],
            blankDays: 0,
            days: [],
            currMonthName: '',
            currYear: ''
        }
    },

    computed: {
        previousMonthDisabled(currDate) {
            if (typeof this.$props.disabled === 'undefined' || typeof this.$props.disabled.to === 'undefined' || !this.$props.disabled.to) {
                return false
            }
            let d = new Date(currDate);
            if (
                this.$props.disabled.to.getMonth() >= d.getMonth() &&
                this.$props.disabled.to.getFullYear() >= d.getFullYear()
            ) {
                return true
            }
            return false
        },
    },

    methods: {
        previousMonth() {
            if (this.previousMonthDisabled(this.$data.currDate)) {
                return false
            }
            let d = new Date(this.$data.currDate);
            d.setMonth(d.getMonth() - 1);
            this.$setData({
                currDate: d.getTime()
            });
            // this.$emit('changedMonth', d)
        },

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
        blankDays() {
            const d = new Date(this.$data.currDate);
            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
            if (this.$props.mondayFirst) {
                return dObj.getDay() > 0 ? dObj.getDay() - 1 : 6
            }
            return dObj.getDay()
        },
        days() {
            const d = new Date(this.$data.currDate);
            let days = [];
            // set up a new date object to the beginning of the current 'page'
            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes())
            let daysInMonth = DateUtils.daysInMonth(dObj.getFullYear(), dObj.getMonth())
            for (let i = 0; i < daysInMonth; i++) {
                days.push({
                    date: dObj.getDate(),
                    timestamp: dObj.getTime(),
                    isSelected: this.isSelectedDate(dObj),
                    isDisabled: this.isDisabledDate(dObj),
                    isHighlighted: this.isHighlightedDate(dObj),
                    isToday: dObj.toDateString() === (new Date()).toDateString()
                });
                dObj.setDate(dObj.getDate() + 1)
            }
            return days
        },
        isSelectedDate(dObj) {
            return this.$data.selectedDate && this.$data.selectedDate.toDateString() === dObj.toDateString()
        },
        isDisabledDate(date) {
            let disabled = false;

            if (typeof this.$props.disabled === 'undefined') {
                return false
            }

            if (typeof this.$props.disabled['dates'] !== 'undefined') {
                this.$props.disabled['dates'].forEach((d) => {
                    if (date.toDateString() === d.toDateString()) {
                        disabled = true
                        return true
                    }
                })
            }
            if (typeof this.$props.disabled.to !== 'undefined' && this.disabled.$props.to && date < this.disabled.$props.to) {
                disabled = true
            }
            if (typeof this.$props.disabled.from !== 'undefined' && this.disabled.$props.from && date > this.disabled.$props.from) {
                disabled = true
            }
            if (typeof this.$props.disabled.days !== 'undefined' && this.disabled.$props.days.indexOf(date.getDay()) !== -1) {
                disabled = true
            }
            return disabled
        },
        isHighlightedDate(date) {
            if (this.isDisabledDate(date)) {
                return false
            }

            let highlighted = false

            if (typeof this.$props.highlighted === 'undefined') {
                return false
            }

            if (typeof this.$props.highlighted.dates !== 'undefined') {
                this.$props.highlighted.dates.forEach((d) => {
                    if (date.toDateString() === d.toDateString()) {
                        highlighted = true
                        return true
                    }
                })
            }

            if (this.isDefined(this.$props.highlighted.from) && this.isDefined(this.$props.highlighted.to)) {
                highlighted = date >= this.$props.highlighted.from && date <= this.$props.highlighted.to
            }

            if (typeof this.$props.highlighted.days !== 'undefined' && this.$props.highlighted.days.indexOf(date.getDay()) !== -1) {
                highlighted = true
            }
            return highlighted
        },

        isDefined(prop) {
            return typeof prop !== 'undefined' && prop
        },
        currMonthName() {
            const d = new Date(this.$data.currDate);
            return DateUtils.getMonthNameAbbr(d.getMonth(), this.translation().months.abbr)
        },
        currYear() {
            const d = new Date(this.$data.currDate);
            return d.getFullYear()
        },
    },

    beforeMount() {
        let daysOfWeek = this.daysOfWeek();
        let blankDays = this.blankDays();
        let days = this.days();
        let currMonthName = this.currMonthName();
        let currYear = this.currYear();
        this.$setData({
            daysOfWeek: daysOfWeek,
            blankDays: new Array(blankDays),
            days: days,
            currMonthName: currMonthName,
            currYear: currYear
        })
    }
}

