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
  {
    path: '/diy',
    name: 'DiyCenter',
    meta: { hidden: true },
    component: Layout,
    children: [
      {
        path: 'template/decorate/:id',
        name: 'DiyTemplateDecorate',
        meta: {
          title: '模板装修',
          noCache: true,
          hidden: true,
          activeMenu: '/mall/promotion/diy/template'
        },
        component: () => import('@/views/mall/promotion/diy/template/decorate.vue')
      },
      {
        path: 'page/decorate/:id',
        name: 'DiyPageDecorate',
        meta: {
          title: '页面装修',
          noCache: true,
          hidden: true,
          activeMenu: '/mall/promotion/diy/page'
        },
        component: () => import('@/views/mall/promotion/diy/page/decorate.vue')
      }
    ]
  },
];

export default remainingRouter;
