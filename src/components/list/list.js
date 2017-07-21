/**
 * Created by wu on 2017/7/12.
 */
import style from "./list.css";
import template from "./list.html";
import detail from './detail/detail';
import searchButton from '../button/search-button';

export default {
    name: 'priceList',//用于识别 HTML 中的自定义标签
    components: [searchButton],
    data(){
        return {
            number: [1, 2, 3, 4],
            price: 100
        }
    },
    style: style,
    template: template,
    methods: {
        test: function (price) {
            this.setData({price: price + 100});
        }
    },
    beforeUpdate: function () {
    },
    updated: function () {
    }
}