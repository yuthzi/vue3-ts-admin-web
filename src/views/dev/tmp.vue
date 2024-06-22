<template>
  <div>
    <el-button @click="handleOpenCardList">打开新页签</el-button>
  </div>
</template>

<script lang="tsx" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleOpenCardList = () => {
  // openCardList()
  console.log('router=' + router)
  // router.push('/view/jobList')
  router.push('/card/list')
}
</script>

<style lang="scss" scoped></style>
