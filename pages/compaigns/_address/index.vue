<template>
  <div>
    <h1>{{ $t("detail_compaign_title") }}: {{ $route.params.address }}</h1>
    <div class="compaign-content">
      <div class="compaign-info">
        <el-card>
          <div slot="header">
            <h3>{{ manager }}</h3>
            <div>{{ $t("address_of_manager") }}</div>
          </div>
          <div>{{ $t("text_of_manager") }}</div>
        </el-card>
        <el-card>
          <div slot="header">
            <h3 v-html="balance"></h3>
            <div>{{ $t("balance_company") }}</div>
          </div>
          <div>{{ $t("text_of_balance_company") }}</div>
        </el-card>
        <el-card>
          <div slot="header">
            <h3>{{ minContribution + " &#926;" }}</h3>
            <div>{{ $t("min_contribution") }}</div>
          </div>
          <div>{{ $t("text_of_min_contribution") }}</div>
        </el-card>
        <el-card>
          <div slot="header">
            <h3>{{ countRequests }}</h3>
            <div>{{ $t("count_request") }}</div>
          </div>
          <div>{{ $t("text_of_count_request") }}</div>
        </el-card>
        <el-card>
          <div slot="header">
            <h3>{{ countApprovers }}</h3>
            <div>{{ $t("count_approvers") }}</div>
          </div>
          <div>{{ $t("text_of_count_approvers") }}</div>
        </el-card>
      </div>
      <div class="contribute-form">
        <ContributionForm
          class="mb-2"
          :address="$route.params.address"
          :minContribution="parseFloat(minContribution)"
        />
        <nuxt-link
          class="underline"
          :to="`/compaigns/${$route.params.address}/requests`"
          >{{ $t("requests_list") }}</nuxt-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import Compaign from "@/ethereum/compaign";
import web3 from "@/ethereum/web3";
import ContributionForm from "@/components/ContributionForm.vue";
export default {
  async asyncData(route) {
    const compaign = Compaign(route.params.address);
    let summary;
    try {
      summary = await compaign.methods.getSummary().call();
    } catch (e) {
      console.log(e);
    }
    return {
      minContribution: web3.utils.fromWei(summary[0], "ether"),
      balance: web3.utils.fromWei(summary[1], "ether") + " &#926;",
      countRequests: summary[2],
      countApprovers: summary[3],
      manager: summary[4],
    };
  },
  components: { ContributionForm },
};
</script>
<style lang="scss" scoped>
h3 {
  word-break: break-word;
}
.compaign-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1rem;
}
.compaign-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>
