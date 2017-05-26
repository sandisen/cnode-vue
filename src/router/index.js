import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/page/index'
import Topic from '@/page/topic'
import PublishTopic from '@/page/publishTopic'
import Login from '@/page/login'
import User from '@/page/user'
import Message from '@/page/message'
Vue.use(Router)

export default new Router({
  history:true,  //开启缓存
  saveScrollPosition:true,  //开启位置记录
  routes: [
    {
	   path: '/',
	   redirect: {name: 'index'}
	 },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic
    },
    {
      path: '/create',
      name: 'create',
      component: PublishTopic,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/:loginname',
      name: 'user',
      component: User
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
      meta: { requiresAuth: true }
    }
  ]
})
