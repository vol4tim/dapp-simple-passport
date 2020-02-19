<template>
  <SidebarPanel>
    <template v-slot:icon>
      <router-link to="/">
        <Logo
          light="assets/i/logo-dapp-ipci-light.svg"
          dark="assets/i/logo-dapp-ipci-dark.svg"
        />
      </router-link>
    </template>
    <Item icon="i-menu">
      <Navigation>
        <NavigationLink :to="{ name: 'services' }" icon="i-app">{{
          $t("menu.services")
        }}</NavigationLink>
      </Navigation>
    </Item>
    <Item bottom icon="i-user">
      <Wallet
        :account="account"
        :networkId="networkId"
        :tokens="Object.values(this.tokens)"
      />
    </Item>
    <Item bottom icon="i-info">
      <section>
        <p>
          <a href="https://ipci.io/" target="_blank">DAO IPCI</a>
          <br />Blockchain technology for carbon markets, environmental assets
          and liabilities
        </p>
        <p>
          Works with
          <a href="https://robonomics.network/" target="_blank"
            >Robonomomics.network</a
          >
        </p>
        <p>
          <b>Disclaimer:</b>DApp IPCI has started in the summer of 2016 and is
          in the stage of development. If you found bugs or have questions,
          please contact
          <a href="mailto:help@ipci.io">help@ipci.io</a>
        </p>
      </section>
    </Item>
  </SidebarPanel>
</template>

<script>
import Vue from "vue";
import Web3Check from "vue-web3-check";
import { Token } from "robonomics-js";
import {
  SidebarPanel,
  Logo,
  Item,
  Navigation,
  NavigationLink,
  Wallet
} from "./sidebar";

export default {
  components: {
    SidebarPanel,
    Logo,
    Item,
    Navigation,
    NavigationLink,
    Wallet
  },
  data() {
    return {
      account: "0x0",
      networkId: 0,
      tokens: {}
    };
  },
  created() {
    this.account = this.$robonomics.account.address;
    this.networkId = Web3Check.store.state.networkId;
  },
  mounted() {
    // this.init("0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE");
  },
  methods: {
    async init(address) {
      const token = new Token(this.$robonomics.web3, address);
      const info = await token.getInfo();
      this.tokens = {};
      Vue.set(this.tokens, token.address, {
        ...info,
        address: token.address,
        amount: 0
      });
      token.subscribe("allEvents", error => {
        if (error) {
          return;
        }
        this.balance(token);
      });
      this.balance(token);
    },
    balance(token) {
      token.methods
        .balanceOf(this.account)
        .call()
        .then(amount => {
          Vue.set(this.tokens, token.address, {
            ...this.tokens[token.address],
            amount: Vue.options.filters.fromWei(
              amount,
              this.tokens[token.address].decimals
            )
          });
        });
    }
  }
};
</script>
