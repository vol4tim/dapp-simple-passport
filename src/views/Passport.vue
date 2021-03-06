<template>
  <Page>
    <section class="section-light section-centered">
      <h2>{{ $t("passport.title") }}</h2>
      <template v-if="passport">
        <Passport :address="passport" />
      </template>
      <template v-else>
        <Form ref="form" @onSubmit="onSubmit" />
        <Request
          v-if="!response"
          ref="request"
          :model="model"
          :token="tokenAddress"
          :validator="validator"
          :submit="submit"
          :onResponse="onResponse"
        />
        <template v-else>
          <section>
            <div class="form-section-title">{{ $t("passport.subtitle3") }}</div>
            <Response
              :sender="response.sender"
              :objective="response.objective"
              :address="response.token"
              :from="$robonomics.account.address"
              :to="$robonomics.factory.address"
              :cost="response.cost"
              :initDetails="Number(cost) > Number(myAllowance)"
            />
            <section
              v-if="
                demand === null &&
                  Number(cost) > 0 &&
                  Number(myAllowance) < Number(response.cost)
              "
              class="section-light"
            >
              <div>
                <b>{{ $t("passport.reqApprove") }}</b>
              </div>
              <Approve
                :address="response.token"
                :from="$robonomics.account.address"
                :to="$robonomics.factory.address"
                :initAmountWei="cost"
              />
            </section>
            <Steps
              v-if="demand"
              :status="demand.status"
              :liability="demand.liability"
            />
            <section
              v-if="demand === null || demand.status != statuses.RESULT"
              :class="{
                disabled:
                  (Number(cost) > 0 && Number(myAllowance) < Number(cost)) ||
                  (demand && demand.status != statuses.EMPTY)
              }"
            >
              <Order :offer="response" :onDemand="onDemand" />
            </section>
            <div v-if="demand && demand.status == statuses.RESULT">
              <router-link
                class="container-full btn-big btn-green"
                :to="{
                  name: 'passport-view',
                  params: { passport: demand.liability }
                }"
                >{{ $t("passport.link") }}</router-link
              >
            </div>
          </section>
        </template>
      </template>
    </section>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import Page from "@/components/layout/Page";
import Approve from "@/components/approve/Form";
import Steps from "@/components/Steps";
import Form from "@/components/passport/Form";
import Request from "@/components/passport/Request";
import Response from "@/components/passport/Response";
import Order from "@/components/passport/Order";
import Passport from "@/components/passport/Passport";
import { number } from "../utils/tools";
import token from "@/mixins/token";
import config from "~config";

export default {
  mixins: [token],
  props: ["passport"],
  data() {
    return {
      response: null,
      demandId: 0,
      tokenAddress: "0x0000000000000000000000000000000000000000",
      validator: "0x0000000000000000000000000000000000000000",
      model: "QmWDRjU7xrM7pFUDuAVbV6kytuFgooahNLsqvCnipPgSSQ"
    };
  },
  components: {
    Page,
    Form,
    Request,
    Response,
    Approve,
    Order,
    Steps,
    Passport
  },
  computed: {
    ...mapState("msg", ["statuses"]),
    demand() {
      return this.$store.getters["msg/demandById"](this.demandId);
    },
    cost() {
      return number.numToString(this.response.cost);
    },
    myAllowance: function() {
      if (this.response) {
        return this.allowance(
          this.response.token,
          this.$robonomics.account.address,
          this.$robonomics.factory.address
        );
      }
      return 0;
    }
  },
  created() {
    this.tokenAddress = config.chain.get().TOKEN.dai.address;
    this.$robonomics.onDemand(this.model, msg => {
      console.log(msg);
    });
  },
  methods: {
    submit() {
      this.$refs.form.submit();
    },
    onSubmit({ error, fields }) {
      this.$refs.request.requestPrice(error, fields);
    },
    onResponse(msg) {
      this.response = msg;
      this.watchToken(
        this.response.token,
        this.$robonomics.account.address,
        this.$robonomics.factory.address
      );
    },
    onDemand(demandId) {
      this.demandId = demandId;
    }
  }
};
</script>
