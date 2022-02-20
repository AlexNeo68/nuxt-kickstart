export default {
  head: {
    title: "nuxt-kickstart",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    link: [{ rel: "preconnect", href: "https://fonts.googleapis.com" }],
    link: [{ rel: "preconnect", href: "https://fonts.gstatic.com" }],
    link: [
      {
        rel: "stylesheet",
        type: "image/x-icon",
        href: "https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["element-ui/lib/theme-chalk/index.css", "@/assets/scss/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/global"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/i18n"],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  i18n: {
    strategy: "no_prefix",
    locales: ["ru", "en"],
    defaultLocale: "ru",
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: {
          hello: "CryptoCrowd",
          show_compaign: "Show compaign",
          button_add_compaign: "Add compaign",
          open_compaigns: "Open Compaigns",
          list_compaigns: "Compaigns",
          create_new_compaign: "Create New Compaign",
          label_minimum_contribution: "Minimum Contribution",
          button_create_compaign: "Create New Compaign",
          button_reset: "Reset",
          detail_compaign_title: "Detail of compaign",
          address_of_manager: "Manager address",
          text_of_manager:
            "Manager created this company and can make request on this",
          balance_company: "Current balance",
          text_of_balance_company: "This current balance from all contributors",
          min_contribution: "Minimum of contribution",
          text_of_min_contribution: "Amount contribution for enter the company",
          count_request: "Count requests",
          text_of_count_request: "Count requests to send money vendors",
          count_approvers: "Count approvers",
          text_of_count_approvers: "Count approvers who enter for the compaign",
          contribute_compaign: "Contribute the compaign",
          amount_contribution: "Contribution",
          button_contribution: "Contribute",
          requests_list: "List of requests",
          new_request_title: "Create Request",
          request_description: "Description",
          request_value: "Amount of money",
          request_address: "Address recipient",
          button_create: "Create",
          column_description: "Description",
          column_amount: "Amount",
          column_recipient: "Recipient",
          column_approval_count: "Approval Count",
          column_approve: "Approve",
          column_finalize: "Finalize",
          button_approve: "Approve",
          button_finalize: "Finalize",
          success_finalize: "Finalized",
        },
        ru: {
          hello: "CryptoCrowd",
          show_compaign: "Просмотреть компанию",
          button_add_compaign: "Добавить компанию",
          open_compaigns: "Открытые компании",
          list_compaigns: "Компании",
          create_new_compaign: "Создать новую компанию",
          label_minimum_contribution: "Минимальный порог входа",
          button_create_compaign: "Создать компанию",
          button_reset: "Сбросить",
          detail_compaign_title: "Информация о компании",
          address_of_manager: "Адрес менеджера",
          text_of_manager:
            "Менеджер создал эту компанию и может созадавать в ней запросы на выплаты",
          balance_company: "Баланс компании",
          text_of_balance_company:
            "Текущий баланс компании ото всех участников",
          min_contribution: "Минимальная сумма для входа",
          text_of_min_contribution:
            "Минимальная сумма, которая необходима чтобы стать участником компании",
          count_request: "Количество запросов",
          text_of_count_request: "Количество запросов на вывод средств",
          count_approvers: "Количество участников",
          text_of_count_approvers: "Количество участников компании",
          contribute_compaign: "Войти в компанию",
          amount_contribution: "Сумма",
          button_contribution: "Учавствовать",
          requests_list: "Список запросов",
          new_request_title: "Создать запрос",
          request_description: "Описание",
          request_value: "Сумма вывода",
          request_address: "Адрес получателя",
          button_create: "Создать",
          column_description: "Описание",
          column_amount: "Сумма",
          column_recipient: "Получатель",
          column_approval_count: "Количество подтверждений",
          column_approve: "Утверждено",
          column_finalize: "Финализировано",
          button_approve: "Подтвердить",
          button_finalize: "Финализировать",
          success_finalize: "Финализировано",
        },
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
};
