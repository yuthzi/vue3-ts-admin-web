<template>
  <div class="layout-footer-container">
    <div>
      <a
        style="text-decoration: none; color: #4d4d4c"
        target="_blank"
        rel="noopener noreferrer"
        href="https://beian.miit.gov.cn/"
      >
        粤ICP备2024253401号
      </a>
    </div>
    <div class="copyright">
      Copyright
      <svg-icon name="copyright" size="16px" color="rgba(0, 0, 0, 0.45)" />
      {{ fullYear }} yuth
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fullYear = ref(new Date().getFullYear())
    return {
      fullYear,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout-footer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: $base-app-footer-height;
  padding: 0 20px;
  color: rgb(0 0 0 / 45%);
  background: var(--el-color-white);
  border-top: 1px dashed #dcdfe6;
}

.copyright {
  padding-left: 10px;
}
</style>
