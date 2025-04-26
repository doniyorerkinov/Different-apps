import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  routes: [
    {
      path: "/main",
      component: () => import("../Layouts/Default.vue"),
      children: [
        {
          path: "/main",
          redirect: "/",
        },
        {
          path: "/",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: '/trello',
          component: () => import("../views/Trello.vue")
        }
      ],
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "link-active",
});

export default router;
