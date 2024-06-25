<!-- 招聘详情只读页面 -->
<template>
  <div>
    <div class="detail-card">
      <h1 class="header">{{ state.title }}</h1>
      <span class="salary">{{ state.salary }}</span>
      <div v-if="titleTags">
        <span class="text-tag" v-for="(item, index) in titleTags" :key="item">
          {{ item }}
          <span v-if="index != titleTags.length - 1" class="tag-gap">|</span>
        </span>
      </div>
      <div v-if="welfareList">
        <el-tag v-for="item in welfareList" :key="item" class="title-tag">
          {{ item }}
        </el-tag>
      </div>
    </div>
    <div class="detail-card">
      <h2>职位信息</h2>
      <div v-html="state.detail"></div>
    </div>
    <div>
      <div class="detail-card">
        <h2>工作地址</h2>
        <div>{{ state.location }}</div>
      </div>
    </div>
    <div>
      <div class="detail-card">
        <h2>公司介绍</h2>
        <div v-html="state.companyIntroduction"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { undecodeHtml } from '@/utils/html'
import { getSingleJobDetail } from '@/api/job/detail/api'
import type { JobDetail } from '@/api/job/detail/type'

const route = useRoute()

const id: string = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id

const state = reactive<JobDetail.ResJobDetail>({})
const welfareList = ref()
let titleTags: string[] = []
const queryDetail = async (id: string) => {
  const { data } = await getSingleJobDetail(id)
  Object.assign(state, data)
  state.detail = undecodeHtml(data.detail)
  state.companyIntroduction = undecodeHtml(data.companyIntroduction)

  // welfare
  if (state.welfare) {
    let cols: string[] = state.welfare?.split(',')
    welfareList.value = cols
  } else {
    welfareList.value = []
  }

  // titleTags
  state.city && titleTags.push(state.city)
  state.jobYear && titleTags.push(state.jobYear)
  state.jobDegree && titleTags.push(state.jobDegree)
}

queryDetail(id)
</script>

<style lang="scss" scoped>
.detail-card {
  width: 55vw;
  padding: 15px;
  margin: 10px;
  border-radius: 12px;
  transition: all 0.2s linear;
  cursor: pointer;
  border: 3px solid transparent;
  background-color: #fff;

  .header {
    display: inline-block;
    margin-bottom: 20px;
  }

  .salary {
    font-size: 30px;
    font-family: kanzhun-Regular, kanzhun;
    color: #f26d49;
    line-height: 41px;
    height: auto;
    font-weight: 400;
    position: relative;
    margin-left: 20px;
  }

  .title-tag {
    margin: 15px 5px;
  }

  .text-tag {
    margin: 10px 0;
  }

  .tag-gap {
    margin: 10px;
    color: #e8e8e8;
  }
}
</style>
