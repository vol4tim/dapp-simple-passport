import Services from "@/views/Services";
import Passport from "@/views/Passport";
import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "services",
      component: Services,
      props: true
    },
    {
      path: "/passport",
      component: Passport,
      props: true,
      children: [
        {
          path: "",
          name: "passport"
        },
        {
          path: ":passport",
          name: "passport-view"
        }
      ]
    },
    { path: "*", redirect: "/" }
  ]
});
