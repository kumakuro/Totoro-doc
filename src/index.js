/**
 * Created by wuxinzhe on 2017/7/10.
 */
import "es5-shim";
import "es5-shim/es5-sham";
import "es6-shim";
import "es6-shim/es6-sham";
import "fix-ie";
import "console-polyfill";
import "html5-history-api";
import Totoro from './tuturo/totoro';
import routes from './routes';
import index from "./page/index/index";
import global from './static/global.css'

Totoro({
    el: 'app',
    component: index,
    routes: routes
});






