<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane
      v-for="item in data"
      :key="item.name"
      :lazy="true"
      :label="item.name"
      :name="item.name"
    >
      <el-input :value="item.code" autosize="true" :type="'textarea'" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="tsx">
import { previewTable } from '@/api/sys/table/api'

export default {
  name: 'Preview',
  components: {},
  data() {
    return {
      data: null,
      height: '',
      activeName: 'ApiModel',
    }
  },
  created() {
    this.height = document.documentElement.clientHeight - 180 + 'px'
    const tableId = this.$route.query.tableId
    previewTable(tableId)
      .then((resp) => {
        let { data } = resp
        this.data = data
      })
      .catch(() => {
        this.$router.go(-1)
      })
  },
}
</script>

<style lang="scss" scoped></style>
