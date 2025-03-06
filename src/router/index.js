import { createRouter, createWebHistory } from 'vue-router';
import ReadHistory from '../pages/ReadHistory.vue';
import Home from '../pages/Home.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/read-history', component: ReadHistory },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
