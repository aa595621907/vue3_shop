<template>
  <div class="app">
    <h1>App</h1>
    <el-button type="primary">主要按钮</el-button>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    return {
      input: ref('')
    }
  }
})
</script>

<style lang="less" scoped>
.App {
  h1 {
    color: yellow;
  }
}
</style>
