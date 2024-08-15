import { Layout } from "@/utils/routerHelper";
const { t } = useI18n();
const remainingRouter: AppRouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    name: "Home",
    meta: {},
    children: [
      {
        path: "index",
        component: () => import("@/views/Home/Index.vue"),
        name: "Index",
        meta: {
          title: t("router.home"),
          icon: "ep:home-filled",
          noCache: false,
          affix: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login/Login.vue"),
    name: "Login",
    meta: {
      hidden: true,
      title: t("router.login"),
      noTagsView: true,
    },
  },
];

export default remainingRouter;
