import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  routes: [
    {
      path: "/main",
      component: () => import("@/Layouts/Default.vue"),
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
          path: "/photoshop-file-upload",
          name: "photoshop-file-upload",
          component: () => import("@/views/photoshop-uploader/index.vue"),
        },
        {
          path: "/image-type-convertor",
          name: "image-type-convertor",
          component: () => import("@/views/ImageTypeChanger/index.vue"),
        },
      ],
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "link-active",
});

export default router;
