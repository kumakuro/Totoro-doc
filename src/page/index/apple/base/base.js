import style from './base.css'
import template from './base.html'


export default {
    name: 'base',
    style: style,
    template: template,
    props: {},
    data() {
        return {
            baseTitle: '基础教程',
            polyfills: ['es5-shim/es5-sham', 'es6-shim/es6-sham', 'fix-ie', 'es6-promise', 'html5-history-api', 'console-polyfill'],
            externalLibraries: [{
                name: 'art-template.js',
                url: 'https://aui.github.io/art-template/',
            }, {
                name: 'page.js',
                url: 'http://visionmedia.github.io/page.js/',
            }, {
                name: 'axios.js',
                url: 'https://github.com/mzabriskie/axios'
            }]
        }
    },
}
