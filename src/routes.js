/**
 * Created by wuxinzhe on 2017/7/17.
 */
import apple from './page/index/apple/apple'
import story from './page/index/apple/story/story'
import base from './page/index/apple/base/base'
import api from './page/index/apple/api/api'
import searchButton from './components/button/search-button'
import content from './components/content/content'
import library from './page/index/apple/library/library'
import mainTab from './page/index/apple/library/mainTab/main-tab'
import tabTwo from './page/index/apple/library/tabTwo/tab-two'

export default {
    routes: [{
        path: '/',
        component: apple,
        redirect: '/story',
        children: [{
            path: 'story',
            component: story,
            children: [{
                path: 'button',
                components: {
                    searchButton: searchButton,
                    content: content
                }
            }]
        }, {
            path: 'base',
            component: base
        }, {
            path: 'api',
            component: api
        }, {
            path: 'library',
            component: library,
            redirect: '/library/main',
            children: [{
                path: 'main',
                components: {tabContent: mainTab}
            }, {
                path: 'one',
                components: {tabContent: tabTwo}
            }]
        }]
    }],
}