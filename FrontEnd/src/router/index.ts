import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '../store';
import Login from '../components/pages/login/Login.vue';
import ChatRoom from '../components/pages/chatRoom/Index.vue';
import Chats from '../components/pages/chatRoom/chats/Chats.vue';
import Contacts from '../components/pages/chatRoom/contacts/Contacts.vue';

const routes: Array<RouteRecordRaw> = [
  {
		path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
	{	
		meta: { requiresAuth: true },
    path: '/chat-room',
    name: 'ChatRoom',
    component: ChatRoom,
		children: [
      {
        path: 'chats',
        name: 'Chats',
        component: Chats
      },
			{
        path: 'contacts',
        name: 'Contacts',
        component: Contacts
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('checkUserSession');
	const isAuthenticated = !!store.state.user;
  if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!isAuthenticated) {
			next('/login');
    } else {
      next();
    }
	} else {
    // Redirige al chat-room si el usuario ya está autenticado y trata de acceder al login
    if (to.path === '/login' && isAuthenticated) {
      next('/chat-room/chats');
    } else {
      next();
    }
  }
});
export default router;