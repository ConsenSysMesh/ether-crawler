//var module = module || undefined;
if (module != null) {
  var BlockAppsWeb3Provider = require("../node_modules/blockapps-web3/build/blockapps-web3");
} else {
  var BlockAppsWeb3Provider = window.BlockAppsWeb3Provider;
}

var accounts = {
  "985095ef977ba75fb2bb79cd5c4b84c81392dff6": {
    private: "0d0ba14043088cd629a978b49c8691deca5926f0271432bc0064e4745bac0a9f"
  }
};

var provider = new BlockAppsWeb3Provider({
  accounts: Object.keys(accounts),
  coinbase: "0x985095ef977ba75fb2bb79cd5c4b84c81392dff6",
  verbosity: 0,
  keyprovider: function(address, callback) {
    address = address.replace("0x", "");
    callback(null, accounts[address].private);
  }
});
if (module) {
  module.exports = provider;
} else {
  web3.setProvider(provider);
}
