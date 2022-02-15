<template>
  <div>
    <ul v-if="compaigns.length">
      <li v-for="compaign in compaigns" :key="compaign">
        {{ compaign }}
      </li>
    </ul>
  </div>
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
