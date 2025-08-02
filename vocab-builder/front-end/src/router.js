import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import Category from './views/Category.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/words'
    },
    {
      path: '/words',
      name: 'words',
      component: Words
    },
    {
      path: '/new/word',
      name: 'new-word',
      component: New
    },
    {
      path: '/words/:id',
      name: 'show-word',
      component: Show
    },
    {
      path: '/words/:id/edit',
      name: 'edit-word',
      component: Edit
    },
    {
      path: '/categories',
      name: 'categories',
      component: Category
    },
    {
      path: '/categories/:id',
      name: 'category',
      component: Category
    },
    {
      path: '/categories/:id/edit',
      name: 'edit-category',
      component: Category
    },
    {
      path: '/new/category',
      name: 'new-category',
      component: New
    },
    {
      path: '/new',
      name: 'new-view',
      component: New
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
});
