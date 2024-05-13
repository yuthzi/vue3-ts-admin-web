<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu
      v-if="subItem.children && subItem.children.length > 1"
      :index="subItem.path"
    >
      <template #title>
        <div v-if="subItem.meta.icon">
          <el-icon>
            <component :is="subItem.meta.icon"></component>
          </el-icon>
        </div>
        <div v-else>
          <svg-icon :name="subItem.meta.customIcon"></svg-icon>
        </div>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <!-- 有children递归本次组件 -->
      <sub-menu :menuList="subItem.children" />
    </el-sub-menu>
    <el-menu-item
      v-else-if="subItem.children && subItem.children.length == 1"
      :index="subItem.children[0].path"
      @click="handleClickMenu(subItem.children[0])"
    >
      <!-- <el-icon>
        <component :is="subItem.children[0].meta.icon"></component>
      </el-icon> -->
      <div v-if="subItem.children[0].meta.icon">
        <el-icon>
          <component :is="subItem.children[0].meta.icon"></component>
        </el-icon>
      </div>
      <div v-else>
        <svg-icon :name="subItem.children[0].meta.customIcon"></svg-icon>
      </div>
      <template #title>
        <span>{{ subItem.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item
      v-else
      :index="subItem.path"
      @click="handleClickMenu(subItem)"
    >
      <div v-if="subItem.meta.icon">
        <el-icon>
          <component :is="subItem.meta.icon"></component>
        </el-icon>
      </div>
      <div v-else>
        <svg-icon :name="subItem.meta.customIcon"></svg-icon>
      </div>
      <template #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { Menu } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue'

export default defineComponent({
  name: 'SubMenu',
  props: {
    menuList: {
      type: Menu.MenuOptions,
      default: () => {
        return []
      },
    },
  },
  setup() {
    const router = useRouter()
    function handleClickMenu(subItem: Menu.MenuOptions) {
      // 跳转外部链接
      if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')
      // 判断只有一级的话，直接跳转子级相关信息
      // const { children } = subItem
      // if (children?.length === 1) {
      //   router.push(children[0].path)
      //   return
      // }
      router.push(subItem.path)
    }
    return {
      handleClickMenu,
    }
  },
})
</script>
