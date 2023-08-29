import { Button, Tabbar, TabbarItem, NavBar, Toast, Search, Swipe, SwipeItem, Grid, GridItem, Icon, Rate, ActionSheet, Dialog, Checkbox, Tab, Tabs } from 'vant'
/* 个别组件是以函数的形式提供的，包括 Toast，Dialog，Notify 和 ImagePreview 组件
 * 在使用函数组件时，unplugin-vue-components 无法自动引入对应的样式，因此需要手动引入样式
 */
import 'vant/es/toast/style'
import 'vant/es/dialog/style'

export function vant (app) {
  app.use(Button)
  // 底部导航栏
  app.use(Tabbar)
  app.use(TabbarItem)
  // 顶部导航栏
  app.use(NavBar)
  // 轻提示组件
  app.use(Toast)
  // 搜索框
  app.use(Search)
  // 轮播图组件
  app.use(Swipe)
  app.use(SwipeItem)
  // 宫格组件
  app.use(Grid)
  app.use(GridItem)
  // 图标
  app.use(Icon)
  // 评分
  app.use(Rate)
  // 弹层
  app.use(ActionSheet)
  // 弹出框
  app.use(Dialog)
  // 选择框
  app.use(Checkbox)

  app.use(Tab)
  app.use(Tabs)
}
