<template>
  <Page>
    <h1>{{ $t("services.title") }}</h1>
    <section class="flex-grid">
      <RCard
        v-for="(service, index) in services"
        :key="index"
        class="item"
        :class="{ disabled: service.disabled }"
      >
        <a v-if="service.target" :href="service.link" class="item-avatar">
          <span
            class="item-avatar--image"
            :style="`background-image: url('${service.img}');`"
          ></span>
        </a>
        <router-link v-else :to="service.link" class="item-avatar">
          <span
            class="item-avatar--image"
            :style="`background-image: url('${service.img}');`"
          ></span>
        </router-link>
        <div class="item-content">
          <h2>
            <a v-if="service.target" :href="service.link" target="_blank">
              {{ service[$i18n.locale].name }}
            </a>
            <router-link v-else :to="service.link">
              {{ service[$i18n.locale].name }}
            </router-link>
          </h2>
          <div class="t-hyphen">{{ service[$i18n.locale].desc }}</div>
          <div class="item-bottom">
            <div class="item-bottom--line">
              <span>Provider:</span>
              <span class="item-bottom--info">{{ service.by.label }}</span>
            </div>
            <div
              v-if="service.token && service.token.name"
              class="item-bottom--line"
            >
              <span>Payment token:</span>
              <span class="item-bottom--info">{{ service.token.name }}</span>
            </div>
          </div>
        </div>
      </RCard>
    </section>
  </Page>
</template>

<script>
import { Token } from "robonomics-js";
import Web3Check from "vue-web3-check";
import Page from "../components/layout/Page";
import config from "~config";

export default {
  components: { Page },
  data() {
    return {
      services: [
        {
          en: {
            name: "Public blockchain passport",
            desc: "Global registration service in the Ethereum Blockchain."
          },
          ru: {
            name: "Публичный блокчейн пасспорт",
            desc: "Сервис глобальной регистрации в Ethereum Blockchain."
          },
          link: { name: "passport" },
          target: false,
          img: "assets/i/services/digital-passport.png",
          by: {
            link: "#",
            label: "Airalab"
          },
          token: config.chain.get().TOKEN.dai
            ? config.chain.get().TOKEN.dai.address
            : false,
          disabled: false
        }
      ]
    };
  },
  created() {
    this.loadTokens();
  },
  methods: {
    loadTokens() {
      if (Web3Check.store.state.networkId === 1) {
        this.services.forEach(async (service, i) => {
          if (service.token) {
            const token = new Token(
              this.$robonomics.web3,
              this.services[i].token
            );
            const name = await token.methods.name().call();
            const symbol = await token.methods.symbol().call();
            this.services[i].token = {
              address: this.services[i].token,
              name: `${name} (${symbol})`
            };
          }
        });
      }
    }
  }
};
</script>
