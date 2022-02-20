<template>
  <el-container>
    <el-header>
      <AppHeader />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</template>
<script>
import AppHeader from "@/components/Header.vue";
export default {
  components: { AppHeader },
};
</script>
