import { createWebHistory, createRouter  } from "vue-router";

import HomePage from './pages/Home.vue';
import TripPage from './pages/Trip.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/trips/:id', component: TripPage },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;