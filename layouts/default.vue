<template>
  <el-container>
    <AppHeader />
    <nuxt />
  </el-container>
</template>
<script>
import AppHeader from "@/components/Header.vue";
export default {
  components: { AppHeader },
};
</script>
