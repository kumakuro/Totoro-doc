import style from './header.css'
import template from './header.html'

export default {
    name: 'header',//用于识别 HTML 中的自定义标签
    style: style,
    template: template,
    props: {},
    data: {
        navItems: ['开发起源', '基础教程', 'API','组件库'],
        selectItem: 0,
        title:'Totoro Frame'
    },
    methods: {
        changeNavItem: function (idx) {
            this.setData({
                selectItem: idx
            });
            switch (idx) {
                case 0:
                    this.$router('/story');
                    break;
                case 1:
                    this.$router('/base');
                    break;
                case 2:
                    this.$router('/api');
                    break;
                case 3:
                    this.$router('/library');
                    break;
            }
        }
    }
}
