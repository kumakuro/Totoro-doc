/**
 * Created by wu on 2017/7/21.
 */
import style from "./library.css";
import template from "./library.html";
import tabView from '../../../../components/tabView/tab-view';
import select from '../../../../components/select/select';
import timePick from '../../../../components/timePick/time-pick';
import downButton from '../../../../components/downButton/downButton';

export default {
    name: 'library',
    style: style,
    template: template,
    components: [tabView, select, timePick, downButton],
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
            tabMore: {
                title: 'More',
                href: '/library/two',
            },
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
            },
            downOption: {
                text: "我的前半生"
            },
            downOptions: [{
                text: '贺涵',
            }, {
                text: '罗子君',
            }, {
                text: '唐晶',
            }, {
                text: '陈俊生',
            }, {
                text: '00',
            }],
            tabChoose: {
                htmlContent: '<div toro-name="tab-view" emit-change-tab="change" props-tab-array="{{data.tabArray}}" props-more="{{data.tabMore}}"></div>\n' +
                '<div router-view="tabContent"></div>',
                htmlExplain: [{
                    fullName: 'toro-name="tab-view"',
                    attr: 'toro-name',
                    func: '填写组件名称，方便编译的时候，找到对应的组件'
                }, {
                    fullName: 'emit-change-tab="change"',
                    attr: 'change',
                    func: '当 Tab 切换时，父组件的 changeTab 方法可以收到内部 change 事件的返回值，返回的是 TabArray 的索引'
                }, {
                    fullName: 'props-tab-array={{data.htmlContent}}',
                    attr: 'props-tab-array',
                    func: '传入的 Tab 标签的内容及对应跳转的链接地址'
                }, {
                    fullName: 'props-more={{data.tabMore}}',
                    attr: 'props-more',
                    func: '如果 Tab 组件的右侧需要一个"更多"的选项跳转到新页面时，传入这个参数'
                }]
            }, buttonDown: {
                htmlContent: '<div toro-name="down-button" props-options="{{data.downOptions}}" props-option="{{data.downOption}}"></div>',
                htmlExplain: [{
                    fullName: 'toro-name="down-button"',
                    attr: 'toro-name',
                    func: '填写组件名称，方便编译的时候，找到对应的组件'
                }, {
                    fullName: 'props-options="{{data.downOptions}}"',
                    attr: 'props-options',
                    func: '传递外部的数组downOptions到组件里，是下拉框里的内容'
                }, {
                    fullName: 'props-option="{{data.downOption}}"',
                    attr: 'props-option',
                    func: '用来传按钮的名字，嗯 '
                }]
            }, select: {
                htmlContent: '<div toro-name="select" props-options="{{data.options}}" props-option="{{data.selectFruit}}" emit-select-fruit="select"></div>',
                htmlExplain: [{
                    fullName: 'toro-name="select"',
                    attr: 'toro-name',
                    func: '填写组件名称，方便编译的时候，找到对应的组件'
                }, {
                    fullName: 'props-options="{{data.options}}"',
                    attr: 'props-options',
                    func: '传入下拉列表的可选项目数组'
                }, {
                    fullName: 'props-option="{{data.selectFruit}}"',
                    attr: 'props-option',
                    func: '如果项目需要设置一个默认的选项，则可以传入这个值'
                }, {
                    fullName: 'emit-*="select"',
                    attr: 'select',
                    func: '用于监听组件内部的 select 事件，当选定某个选项时将传出这个选项的对应数据'
                }]
            }, timePick: {
                htmlContent: '<div toro-name="time-pick"></div>',
                htmlExplain: [{
                    fullName: 'toro-name="time-pick"',
                    attr: 'toro-name',
                    func: '填写组件名称，方便编译的时候，找到对应的组件'
                }]
            },

        }
    },
    methods: {
        changeTab: function (idx) {
            console.log(idx);
        },
        selectFruit: function (idx) {
            console.log();
            let data = this.$data.options[idx];
            this.$setData({
                selectFruit: data
            })
        }
    },
}