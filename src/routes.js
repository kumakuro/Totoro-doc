/**
 * Created by wuxinzhe on 2017/7/17.
 */
import apple from './page/index/apple/apple'
import story from './page/index/apple/story/story'
import base from './page/index/apple/base/base'
import api from './page/index/apple/api/api'
import searchButton from './components/button/search-button'
import content from './components/content/content'

export default {
    routes: [{
        path: '/',
        name: 'index',
        component: apple,
        redirect: '/story',
        children: [{
            path: 'story',
            name: 'story',
            component: story,
            children: [{
                path: 'button',
                name: 'button',
                components: {
                    searchButton: searchButton,
                    content: content
                }
            }]
        }, {
            path: 'base',
            name: 'base',
            component: base
        }, {
            path: 'api',
            name: 'api',
            component: api
        }]
    }],
}