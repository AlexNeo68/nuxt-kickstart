<template>
  <div>
    <div class="heading flex justify-between align-center">
      <h1>{{ $t("requests_list") }}</h1>
      <nuxt-link
        class="underline"
        :to="`/compaigns/${$route.params.address}/requests/new`"
        >{{ $t("new_request_title") }}</nuxt-link
      >
    </div>

    <el-table :data="requests" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column :label="$t('column_description')">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('column_amount')">
        <template slot-scope="scope">
          <span>{{ toEther(scope.row.value) }} &#926;</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('column_recipient')">
        <template slot-scope="scope">
          <span>{{ scope.row.recipient }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('column_approval_count')">
        <template slot-scope="scope">
          <span>{{ scope.row.approvalCount }} / {{ approversCount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('column_approve')">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.complete"
            type="success"
            plain
            round
            :loading="
              loadings[scope.$index] && loadings[scope.$index]['approve']
            "
            size="small"
            @click="approve(scope.$index)"
            >{{ $t("button_approve") }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column :label="$t('column_finalize')">
        <template slot-scope="scope">
          <el-button
            v-if="
              !scope.row.complete &&
              scope.row.approvalCount > approversCount / 2
            "
            type="info"
            plain
            round
            :loading="
              loadings[scope.$index] && loadings[scope.$index]['finalize']
            "
            size="small"
            @click="finalize(scope.$index)"
            >{{ $t("button_finalize") }}</el-button
          >
          <el-tag v-else-if="scope.row.complete" type="success">{{
            $t("success_finalize")
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Compaign from "@/ethereum/compaign";
import web3 from "@/ethereum/web3";
export default {
  data() {
    return {
      statusOperation: "",
    };
  },
  async asyncData(route) {
    const compaign = Compaign(route.params.address);
    let requests = [];
    let approversCount = 0;
    let loadings = [];

    try {
      const countRequest = await compaign.methods.getRequestsCount().call();
      approversCount = await compaign.methods.approversCount().call();
      loadings = Array(parseInt(countRequest))
        .fill()
        .map((el, index) => ({ approve: false, finalize: false }));
      requests = await Promise.all(
        Array(parseInt(countRequest))
          .fill()
          .map((el, index) => compaign.methods.requests(index).call())
      );
    } catch (e) {
      console.log(e);
    }
    return {
      requests,
      approversCount,
      loadings,
    };
  },
  methods: {
    toEther(value) {
      return web3.utils.fromWei(value, "ether");
    },
    async approve(row) {
      this.loadings[row]["approve"] = true;
      try {
        const [account] = await web3.eth.getAccounts();
        const compaign = Compaign(this.$route.params.address);
        await compaign.methods.approveRequest(row).send({ from: account });
        this.$router.app.refresh();
      } catch (e) {
        console.log(e);
      } finally {
        this.loadings[row]["approve"] = false;
      }
    },
    async finalize(row) {
      this.loadings[row]["finalize"] = true;
      try {
        const [account] = await web3.eth.getAccounts();
        const compaign = Compaign(this.$route.params.address);
        await compaign.methods.finalizeRequest(row).send({ from: account });
        this.$router.app.refresh();
      } catch (e) {
        console.log(e);
      } finally {
        this.loadings[row]["finalize"] = false;
      }
    },
  },
};
</script>
