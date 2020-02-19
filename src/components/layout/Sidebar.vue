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
        <NavigationLink :to="{ name: 'services' }" icon="i-app">
          {{ $t("menu.services") }}
        </NavigationLink>
      </Navigation>
    </Item>
    <Item bottom icon="i-user">
      <Wallet :account="account" :networkId="networkId" :tokens="balances" />
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
import { mapGetters } from "vuex";
import Web3Check from "vue-web3-check";
import {
  SidebarPanel,
  Logo,
  Item,
  Navigation,
  NavigationLink,
  Wallet
} from "./sidebar";
import config from "~config";

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
      networkId: 0
    };
  },
  computed: {
    ...mapGetters("tokens", ["balance", "token"]),
    balances() {
      const balances = [];
      Object.values(config.chain.get().TOKEN).forEach(item => {
        const info = this.token(item.address);
        const amount = this.$options.filters.fromWei(
          this.balance(item.address, this.$robonomics.account.address),
          info ? info.decimals : 0
        );
        balances.push({
          amount: amount,
          symbol: info ? info.symbol : ""
        });
      });
      return balances;
    }
  },
  created() {
    this.account = this.$robonomics.account.address;
    this.networkId = Web3Check.store.state.networkId;
    Object.values(config.chain.get().TOKEN).forEach(item => {
      this.$store.dispatch("tokens/add", item.address);
      this.$store.dispatch("tokens/watchBalance", {
        token: item.address,
        account: this.$robonomics.account.address
      });
    });
  }
};
</script>
