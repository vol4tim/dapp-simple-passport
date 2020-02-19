<template>
  <web3-check>
    <template v-slot:error="props">
      <ROverlay logo="assets/i/logo-dapp-2.svg" v-if="props.error.type === 'network'">
        <section class="msg-error msg-icon">
          <div class="msg-title">Dapp only works on the main network and sidechain</div>
          <p>
            <b>For work, you need to switch the network.</b>
          </p>
        </section>
      </ROverlay>
      <ROverlay logo="assets/i/logo-dapp-2.svg" v-else-if="props.error.type === 'account'">
        <section class="msg-error msg-icon">
          <div class="msg-title">No access to account</div>
          <p v-if="isRequest">
            Try to refresh browser page or
            <button @click="requestAccount">request account</button>.
          </p>
        </section>
      </ROverlay>
      <ROverlay logo="assets/i/logo-dapp-2.svg" v-else-if="props.error.type === 'account'">
        <section class="msg-error msg-icon">
          <div class="msg-title">Plugin required for application operation</div>
          <p>
            <b>
              Please, setup:
              <a
                class="t-style_uppercase"
                href="https://metamask.io/"
                target="_blank"
              >Metamask</a>
            </b>
          </p>
        </section>
      </ROverlay>
      <RErrorNotWeb3 v-else />
    </template>
    <template slot="load">
      <ROverlay logo="assets/i/logo-dapp-2.svg">
        <section>
          <div class="loader">
            <RLoader class="align-vertical m-r-15" />
            <b class="align-vertical t-style_uppercase">
              <span>Loading</span>
            </b>
          </div>
        </section>
      </ROverlay>
    </template>
    <template>
      <slot v-if="isReadyRobonomics" />
      <ROverlay logo="assets/i/logo-dapp-2.svg" v-else>
        <section>
          <div class="loader">
            <RLoader class="align-vertical m-r-15" />
            <b class="align-vertical t-style_uppercase">
              <span>Loading</span>
            </b>
          </div>
        </section>
      </ROverlay>
    </template>
  </web3-check>
</template>

<script>
import Vue from "vue";
import Web3Check from "vue-web3-check";
import { init as initRobonomics } from "../../utils/robonomics";
import { init as initIpfs } from "../../utils/ipfs";
import { statusPeers } from "../../utils/tools";
import getConfig from "../../config/robonomics";

export default {
  data() {
    return {
      isReadyRobonomics: false
    };
  },
  created() {
    Web3Check.store.on("load", async state => {
      const config = getConfig();
      const robonomics = config.robonomics(state.networkId);

      Vue.prototype.$ipfs = await initIpfs(config.ipfs);
      this.$ipfs.id((e, r) => {
        if (/go/i.test(r.agentVersion)) {
          this.$ipfs.swarm.connect("/dnsaddr/bootstrap.aira.life", console.log);
        }
      });

      Vue.prototype.$robonomics = initRobonomics(
        {
          account: {
            address: state.account
          },
          ens: {
            address: robonomics.ens,
            suffix: robonomics.ensSuffix,
            version: robonomics.version
          },
          lighthouse: robonomics.lighthouse
        },
        state.web3,
        this.$ipfs
      );

      // state.web3.currentProvider.setMaxListeners(300); // or more :)

      await this.$robonomics.ready();
      this.isReadyRobonomics = true;

      window.statusPeers = (timeout = 0) => {
        console.log("Peers search", config.statusPeers);
        statusPeers(this.$ipfs, this.$robonomics, config.statusPeers, timeout);
      };
    });
  },
  methods: {
    requestAccount() {
      Web3Check.access();
    }
  }
};
</script>
