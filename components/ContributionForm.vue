<template>
  <div>
    <h2>{{ $t("contribute_compaign") }}</h2>
    <el-form status-icon>
      <el-form-item :label="$t('amount_contribution')">
        <el-input-number
          v-model="contribution"
          :precision="5"
          :step="0.00001"
          :min="minContribution"
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
          >{{ $t("button_contribution") }}</el-button
        >
        <el-button round @click="resetForm()">{{
          $t("button_reset")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import web3 from "@/ethereum/web3";
import Compaign from "@/ethereum/compaign";
export default {
  data() {
    return {
      contribution: this.minContribution,
      errorMessage: "",
      loading: false,
    };
  },
  props: {
    minContribution: {
      type: Number,
      required: true,
    },
    address: {
      required: true,
    },
  },
  methods: {
    async submitForm() {
      this.errorMessage = "";
      this.loading = true;
      try {
        const [account] = await web3.eth.getAccounts();
        const compaign = Compaign(this.address);
        await compaign.methods.contribute().send({
          from: account,
          value: web3.utils.toWei(this.contribution.toString(), "ether"),
        });
        this.$router.app.refresh();
      } catch (e) {
        if (e && e.message) this.errorMessage = e.message;
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.contribution = this.minContribution;
    },
  },
};
</script>
