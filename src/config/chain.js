const chains = {
  1: {
    ROBONOMICS: {
      ens: "",
      ensSuffix: "eth",
      lighthouse: "airalab.lighthouse.5.robonomics.eth"
    },
    TOKEN: {
      dai: {
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        decimals: 18,
        label: "DAI"
      }
    }
  }
};

let currentChain;
function set(id) {
  currentChain = id;
}
function get() {
  if (currentChain) {
    return chains[currentChain];
  }
  throw new Error("Chain not selected");
}
function getListId() {
  return Object.keys(chains);
}
export default {
  set,
  get,
  getListId
};
