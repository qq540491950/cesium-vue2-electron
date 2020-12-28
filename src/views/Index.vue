<template>
  <div class="index">
    <el-button type="primary" @click="selectMap">按钮1</el-button>
    <el-button type="primary">按钮2</el-button>
    <el-button type="primary">按钮3</el-button>
  </div>  
</template>

<script>
export default {
  name: 'Index',
  data() {
    return{}
  },
  methods: {
    selectMap() {
      this.$router.push('/map')
    }
  }
}
</script>

<style lang="less">
  .index {
    height: 100vh;
    widows: 100vw;
  }
</style>