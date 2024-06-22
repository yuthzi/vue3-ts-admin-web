<template>
  <div>
    <CardList
      ref="cardList"
      :requestApi="getJobList"
      :dataCallback="dataCallback"
      :pageSize="20"
      :width="'600px'"
      :leftTop="leftTop"
      :rightTop="rightTop"
      :center="center"
      :leftBottom="leftBottom"
      :rightBottom="rightBottom"
    ></CardList>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import { getJobList } from '@/api/job/list/api'
import { Job } from '@/api/job/list/type'
import { dataCallback } from '@/utils/pagination'
import { CardAreaProps } from '@/components/CardList/src/types'

const leftTop: CardAreaProps<Job.ResJobList> = {
  prop: 'title',
  // color: 'red',
  fontSize: '16px',
  render: ({ row }) => {
    let title = row.title
    if (row.location) {
      return (
        <>
          <span title={title}>{title} </span>
          <span class="left-top-right">[{row.location}] </span>
        </>
      )
    } else {
      return <>{title}</>
    }
  },
}

const rightTop: CardAreaProps<Job.ResJobList> = {
  prop: 'companyName',
  // color: 'red',
  fontSize: '16px',
}

const center: CardAreaProps<Job.ResJobList> = {
  prop: 'salary',
  color: 'red',
  fontSize: '16px',
}

const leftBottom: CardAreaProps<Job.ResJobList> = {
  prop: 'tag',
  // color: 'red',
  fontSize: '16px',
  render: ({ row }) => {
    // console.log(JSON.stringify(row))
    let cols = row.tag?.split(',')
    if (cols) {
      // 只展示前5
      if (cols.length > 5) {
        cols = cols.slice(0, 5)
      }

      return (
        <>
          {cols.map((item) => (
            <el-tag class="bottom-tag">{item}</el-tag>
          ))}
        </>
      )
    } else {
      return ''
    }
  },
}

const rightBottom: CardAreaProps<Job.ResJobList> = {
  prop: 'publishTime',
  fontSize: '16px',
}

const cardList = ref()
</script>

<style lang="scss" scoped>
:deep .bottom-tag {
  margin-right: 10px;
}

:deep .left-top-right {
  margin-left: 12px;
}
</style>
