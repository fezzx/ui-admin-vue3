import { defineStore } from "pinia";
import { store } from "../index";
import { setCssVar, humpToUnderline } from '@/utils'
import { ElMessage } from 'element-plus'
import { CACHE_KEY, useCache } from "@/hooks/web/useCache";
import { ElementPlusSize } from "@/types/elementPlus";
import { LayoutType } from '@/types/layout'
import { ThemeTypes } from '@/types/theme'

const { wsCache } = useCache();

interface AppState {
  collapse: boolean
  currentSize: ElementPlusSize
  greyMode: boolean
  theme: ThemeTypes
  mobile: boolean
  layout: LayoutType
  title: string
  pageLoading: boolean
  isDark: boolean
}

export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      collapse: false, // 折叠菜单
      mobile: false, // 是否是移动端
      title: import.meta.env.VITE_APP_TITLE, // 标题
      pageLoading: false, // 路由跳转loading
      currentSize: wsCache.get("default") || "default", // 组件尺寸
      greyMode: false, // 是否开始灰色模式，用于特殊悼念日
      layout: wsCache.get(CACHE_KEY.LAYOUT) || 'classic', // layout布局
      isDark: wsCache.get(CACHE_KEY.IS_DARK) || false, // 是否是暗黑模式
      theme: wsCache.get(CACHE_KEY.THEME) || {
        // 主题色
        elColorPrimary: '#409eff',
        // 左侧菜单边框颜色
        leftMenuBorderColor: 'inherit',
        // 左侧菜单背景颜色
        leftMenuBgColor: '#001529',
        // 左侧菜单浅色背景颜色
        leftMenuBgLightColor: '#0f2438',
        // 左侧菜单选中背景颜色
        leftMenuBgActiveColor: 'var(--el-color-primary)',
        // 左侧菜单收起选中背景颜色
        leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
        // 左侧菜单字体颜色
        leftMenuTextColor: '#bfcbd9',
        // 左侧菜单选中字体颜色
        leftMenuTextActiveColor: '#fff',
        // logo字体颜色
        logoTitleTextColor: '#fff',
        // logo边框颜色
        logoBorderColor: 'inherit',
        // 头部背景颜色
        topHeaderBgColor: '#fff',
        // 头部字体颜色
        topHeaderTextColor: 'inherit',
        // 头部悬停颜色
        topHeaderHoverColor: '#f6f6f6',
        // 头部边框颜色
        topToolBorderColor: '#eee'
      }
    };
  },
  getters: {
    getCurrentSize(): ElementPlusSize {
      return this.currentSize;
    },
    getGreyMode(): boolean {
      return this.greyMode;
    },
    getMobile(): boolean {
      return this.mobile
    },
    getLayout(): LayoutType {
      return this.layout
    },
    getTitle(): string {
      return this.title
    },
    getIsDark(): boolean {
      return this.isDark
    },
  },
  actions: {
    setCurrentSize(currentSize: ElementPlusSize) {
      this.currentSize = currentSize;
      wsCache.set("currentSize", this.currentSize);
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode;
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
      }
    },
    setMobile(mobile: boolean) {
      this.mobile = mobile
    },
    setLayout(layout: LayoutType) {
      if (this.mobile && layout !== 'classic') {
        ElMessage.warning('移动端模式下不支持切换其他布局')
        return
      }
      this.layout = layout
      wsCache.set(CACHE_KEY.LAYOUT, this.layout)
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      wsCache.set(CACHE_KEY.IS_DARK, this.isDark)
    },
  },
  persist: false,
});

export const useAppStoreWithOut = () => {
  return useAppStore(store);
};
