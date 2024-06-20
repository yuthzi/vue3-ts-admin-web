<template>
  <div>
    <el-card
      style="max-width: 480px"
      v-for="(item, index) in city"
      :key="item.id"
      :index="index"
      class="card"
    >
      <span>{{ item.name }}</span>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const city = [
  {
    id: '080300',
    name: '宁波',
  },
  {
    id: '080301',
    name: '海曙区',
  },
  {
    id: '080303',
    name: '江北区',
  },
  {
    id: '080304',
    name: '北仑区',
  },
  {
    id: '080305',
    name: '镇海区',
  },
  {
    id: '080306',
    name: '鄞州区',
  },
]
</script>

<style lang="scss" scoped>
.card {
  margin-top: 9px;
}
</style>
