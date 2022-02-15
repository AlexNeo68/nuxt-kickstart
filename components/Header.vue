<template>
  <div>
    <el-button-group>
      <el-button
        size="small"
        v-for="(locale, i) in $i18n.locales"
        :key="`locale-${i}`"
        type="primary"
        @click="setLocale(locale)"
        :disabled="locale == $i18n.getLocaleCookie()"
        >{{ locale }}</el-button
      >
    </el-button-group>
    <h1>{{ $t("hello") }}</h1>
  </div>
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
