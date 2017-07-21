/**
 * Created by wu on 2017/7/11.
 */
import style from "./apple.css";
import template from "./apple.html";
import header from './header/header'

export default {
    name: 'apple',
    style: style,
    template: template,
    components: [header],
    data: {
        copyright: '©2017 YueXun Co., Ltd. All rights reserved. | 备案号：闽ICP备12005269号',
    },
    methods: {},
}