<template>
  <div>
    <el-page-header
      class="mb-2"
      @back="$router.push(`/compaigns/${$route.params.address}/requests`)"
      :content="$t('new_request_title')"
    >
    </el-page-header>
    <el-form status-icon>
      <el-form-item :label="$t('request_description')">
        <el-input v-model="description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item :label="$t('request_value')">
        <el-input-number
          v-model="value"
          :precision="5"
          :step="0.00001"
          :min="0.00005"
        ></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('request_address')">
        <el-input v-model="address"></el-input>
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
          >{{ $t("button_create") }}</el-button
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
      description: "",
      value: 0.00001,
      address: "",
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
        const compaign = Compaign(this.$route.params.address);
        await compaign.methods
          .createRequest(
            this.description,
            web3.utils.toWei(this.value.toString(), "ether"),
            this.address
          )
          .send({
            from: account,
          });
        this.$router.push(`/compaigns/${this.$route.params.address}/requests`);
      } catch (e) {
        if (e && e.message) this.errorMessage = e.message;
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.description = "";
      this.value = 0.00001;
      this.address = "";
    },
  },
};
</script>
