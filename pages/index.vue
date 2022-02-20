<template>
  <el-row type="flex" align="top" :gutter="20">
    <el-col>
      <h3>{{ $t("open_compaigns") }}</h3>
      <el-card
        v-for="compaign in compaigns"
        :key="compaign"
        shadow="hover"
        class="mb-1"
      >
        <div slot="header">{{ compaign }}</div>
        <nuxt-link class="underline" :to="`/compaigns/${compaign}`">{{
          $t("show_compaign")
        }}</nuxt-link>
      </el-card>
    </el-col>

    <el-col class="text-right">
      <nuxt-link to="/compaigns/new">
        <el-button type="danger" round size="medium" icon="el-icon-plus">{{
          $t("button_add_compaign")
        }}</el-button>
      </nuxt-link>
    </el-col>
  </el-row>
</template>

<script>
import factory from "@/ethereum/factory.js";
export default {
  name: "IndexPage",
  methods: {},
  async asyncData() {
    let compaigns = [];
    try {
      compaigns = await factory.methods.getDeployedCompaigns().call();
    } catch (e) {
      console.log(e);
    }
    return { compaigns };
  },
};
</script>
