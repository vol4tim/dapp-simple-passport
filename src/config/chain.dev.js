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
  },
  4: {
    ROBONOMICS: {
      ens: "0x9D70a7ecf0834ca14969f676e54834F12eaE5E10",
      ensSuffix: "eth",
      lighthouse: "mytest.lighthouse.5.robonomics.eth"
    },
    TOKEN: {
      dai: {
        address: "0xF47EDC02f201aE58D8C08ab44F7A8439BaD53d8C",
        decimals: 9,
        label: "XRT"
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
