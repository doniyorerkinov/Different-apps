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
          path: "/yandex-maps",
          name: "yandex-maps",
          component: () => import("@/views/yandex-maps/index.vue"),
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
        {
          path: "/image-size-copressor",
          name: "image-size-copressor",
          component: () => import("@/views/image-size-compressor/index.vue"),
        },
      ],
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "link-active",
});

export default router;
