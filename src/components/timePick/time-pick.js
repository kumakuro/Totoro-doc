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
        inline: {
            type: Boolean
        },
        initialView: {
            type: String,
            default() {
                return 'day'
            }
        },
        format: {
            value: String,
            default() {
                return 'yyyy-MM-dd';
            }
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
            currYear: {}
        }
    },

    computed: {
        formattedValue(selectedDate) {
            if (!selectedDate) {
                return null
            }
            return DateUtils.formatDate(new Date(selectedDate), this.$props.format, DateLanguages.translations[this.$props.language])
        },

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

        nextMonthDisabled(currDate) {
            if (typeof this.$props.disabled === 'undefined' || typeof this.disabled.$props.from === 'undefined' || !this.disabled.$props.from) {
                return false
            }
            let d = new Date(currDate);
            if (
                this.$props.disabled.from.getMonth() <= d.getMonth() &&
                this.$props.disabled.from.getFullYear() <= d.getFullYear()
            ) {
                return true
            }
            return false
        }
    },

    methods: {
        showCalendar() {
            if (this.isInline()) {
                return false
            }
            if (this.isOpen()) {
                return this.close()
            }
            switch (this.$props.initialView) {
                case 'year':
                    this.showYearCalendar();
                    break;
                case 'month':
                    this.showMonthCalendar();
                    break;
                default:
                    this.showDayCalendar();
                    break;
            }
        },
        selectDate(day) {
            if (day.isDisabled) {
                return false
            }
            this.setDate(day.timestamp);
            if (this.isInline()) {
                return this.showDayCalendar()
            }
            this.close()
        },
        isOpen() {
            return this.$data.showDayView || this.$data.showMonthView || this.$data.showYearView
        },
        isInline() {
            return typeof this.$props.inline !== 'undefined' && this.$props.inline
        },
        setDate(timestamp) {
            let selectedDate = new Date(timestamp);
            let currDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getTime();
            this.$setData({
                selectedDate: selectedDate,
                currDate: currDate
            });
            this.$emit('selected', new Date(timestamp));
            this.$emit('input', new Date(timestamp))
        },
        close() {
            this.$setData({
                showDayView: false,
                showMonthView: false,
                showYearView: false
            });
            this.$emit('closed');
        },
        clickOutside() {
            console.log(123);
            if (this.isInline()) {
                return this.showDayCalendar();
            }
            this.resetDefaultDate();
            this.close();
        },
        resetDefaultDate() {
            if (this.$data.selectedDate === null) {
                this.$setData({
                    currDate: this.getDefaultDate()
                });
            } else {
                this.$setData({
                    currDate: new Date(this.$data.selectedDate.getFullYear(), this.$data.selectedDate.getMonth(), 1).getTime()
                })
            }
        },
        getDefaultDate() {
            return new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime()
        },

        showDayCalendar() {
            this.close();
            this.$setData({
                showDayView: true
            });
            this.$emit('opened');
        },
        showMonthCalendar() {
            this.close();
            this.$setData({
                showMonthView: true
            });
        },
        showYearCalendar() {
            this.close();
            this.$setData({
                showYearView: true
            });
        },

        previousMonth() {
            if (this.previousMonthDisabled(this.$data.currDate)) {
                return false
            }
            let d = new Date(this.$data.currDate);
            d.setMonth(d.getMonth() - 1);
            this.$setData({
                currDate: d.getTime(),
                days: this.days(d.getTime()),
                currYear: this.currYear(d.getTime()),
                currMonthName: this.currMonthName(d.getTime()),
                daysOfWeek: this.daysOfWeek(),
                blankDays: new Array(this.blankDays(d.getTime())),
            });
            this.$emit('changedMonth', d)
        },

        nextMonth() {
            if (this.nextMonthDisabled(this.$data.currDate)) {
                return false
            }
            let d = new Date(this.$data.currDate);
            const daysInMonth = DateUtils.daysInMonth(d.getFullYear(), d.getMonth());
            d.setDate(d.getDate() + daysInMonth);
            this.$setData({
                currDate: d.getTime(),
                days: this.days(d.getTime()),
                currYear: this.currYear(d.getTime()),
                currMonthName: this.currMonthName(d.getTime()),
                daysOfWeek: this.daysOfWeek(),
                blankDays: new Array(this.blankDays(d.getTime())),
            });
            this.$emit('changedMonth', d)
        },

        translation() {
            return DateLanguages.translations[this.$props.language];
        },

        daysOfWeek() {
            if (this.$props.mondayFirst) {
                const tempDays = this.translation().days.slice();
                tempDays.push(tempDays.shift());
                return tempDays
            }
            return this.translation().days;
        },
        blankDays(currDate) {
            const d = new Date(currDate);
            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
            if (this.$props.mondayFirst) {
                return dObj.getDay() > 0 ? dObj.getDay() - 1 : 6
            }
            return dObj.getDay()
        },
        days(currDate) {
            const d = new Date(currDate);
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
        currMonthName(currDate) {
            const d = new Date(currDate);
            return DateUtils.getMonthNameAbbr(d.getMonth(), this.translation().months.abbr)
        },
        currYear(currDate) {
            const d = new Date(currDate);
            return d.getFullYear()
        },
    },

    beforeMount() {
        this.$setData({
            daysOfWeek: this.daysOfWeek(),
            blankDays: new Array(this.blankDays(this.$data.currDate)),
            days: this.days(this.$data.currDate),
            currMonthName: this.currMonthName(this.$data.currDate),
            currYear: this.currYear(this.$data.currDate)
        })
    }
}

