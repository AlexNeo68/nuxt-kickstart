<template>
  <el-menu class="mb-2" mode="horizontal">
    <div class="flex align-center justify-between">
      <h1>
        <nuxt-link to="/"> {{ $t("hello") }}</nuxt-link>
      </h1>
      <el-button-group>
        <el-button
          size="small"
          v-for="(locale, i) in $i18n.locales"
          :key="`locale-${i}`"
          type="info"
          @click="setLocale(locale)"
          :disabled="locale == $i18n.getLocaleCookie()"
          >{{ locale }}</el-button
        >
      </el-button-group>
    </div>
  </el-menu>
</template>
<script>
export default {
  name: "AppHeader",
  methods: {
    setLocale(locale) {
      this.$i18n.setLocale(locale);
      location.reload();
    },
  },
};
</script>
