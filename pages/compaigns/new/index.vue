<template>
  <div>
    <h1>{{ $t("create_new_compaign") }}</h1>
    <el-form status-icon>
      <el-form-item :label="$t('label_minimum_contribution')">
        <el-input-number
          v-model="minimumContribution"
          :precision="5"
          :step="0.00001"
          :min="0.00001"
        ></el-input-number>
      </el-form-item>

      <el-alert
        class="mb-2"
        v-if="errorMessage"
        :title="errorMessage"
        type="error"
        show-icon
      >
      </el-alert>

      <el-form-item>
        <el-button
          type="danger"
          round
          @click="submitForm()"
          :loading="loading"
          >{{ $t("button_create_compaign") }}</el-button
        >
        <el-button round @click="resetForm()">{{
          $t("button_reset")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import factory from "@/ethereum/factory";
import web3 from "@/ethereum/web3";
export default {
  data() {
    return {
      minimumContribution: 0.00001,
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    async submitForm() {
      this.errorMessage = "";
      this.loading = true;
      try {
        const [account] = await web3.eth.getAccounts();
        await factory.methods
          .createCompaigns(
            web3.utils.toWei(this.minimumContribution.toString(), "ether")
          )
          .send({
            from: account,
          });
        this.$router.push("/");
      } catch (e) {
        if (e && e.message) this.errorMessage = e.message;
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.minimumContribution = 0.00001;
    },
  },
};
</script>
