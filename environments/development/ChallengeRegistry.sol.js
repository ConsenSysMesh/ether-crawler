"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var ChallengeRegistry = (function (_Pudding) {
    _inherits(ChallengeRegistry, _Pudding);

    function ChallengeRegistry() {
      _classCallCheck(this, ChallengeRegistry);

      _get(Object.getPrototypeOf(ChallengeRegistry.prototype), "constructor", this).apply(this, arguments);
    }

    return ChallengeRegistry;
  })(Pudding);

  ;

  // Set up specific data for this class.
  ChallengeRegistry.abi = [{ "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "accept", "outputs": [], "type": "function" }, { "constant": false, "inputs": [], "name": "get_all_num_levels", "outputs": [{ "name": "", "type": "uint256[]" }], "type": "function" }, { "constant": false, "inputs": [], "name": "get_all_players", "outputs": [{ "name": "", "type": "address[]" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }, { "name": "num", "type": "uint256" }], "name": "set_num_levels", "outputs": [], "type": "function" }, { "constant": false, "inputs": [], "name": "get_all_accepted", "outputs": [{ "name": "", "type": "bool[]" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "player", "type": "address" }, { "name": "bet_value", "type": "uint256" }], "name": "register", "outputs": [{ "name": "id", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [], "name": "get_all_best_offers", "outputs": [{ "name": "", "type": "uint256[]" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "challenges", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "bet_values", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "num_levels", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }, { "name": "amount", "type": "uint256" }], "name": "new_offer", "outputs": [], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "best_offers", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [], "name": "get_all_bet_values", "outputs": [{ "name": "", "type": "uint256[]" }], "type": "function" }, { "constant": false, "inputs": [], "name": "num_challenges", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "accepted", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }, { "constant": false, "inputs": [], "name": "get_all_challenges", "outputs": [{ "name": "", "type": "address[]" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "players", "outputs": [{ "name": "", "type": "address" }], "type": "function" }];
  ChallengeRegistry.binary = "60606040526108f8806100126000396000f3606060405236156100cf5760e060020a600035046319b05f4981146100d1578063340f5e4e1461012c578063407cfe5e1461019457806346b5e202146102035780636677febe146102485780636d705ebb146102ca5780637140bdf31461031c5780638f1d37761461038357806398b86951146103c8578063b2091ad314610405578063bfad16f414610442578063cbf77d5f14610487578063d1a8d447146104c4578063df3c862014610561578063f19b82731461056b578063f249cf19146105b8578063f71d96cb14610640575b005b6100cf60043560016005600050828154811015610002575060005260208083047f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0019083066101000a81548160ff0219169083021790555050565b61068660408051602081810183526000825282516001805480840283018401909552848252929390929183018282801561018857602002820191906000526020600020905b816000505481526020019060010190808311610171575b50505050509050610568565b61068660408051602081810183526000825282516002805480840283018401909552848252929390929183018282801561018857602002820191906000526020600020908154600160a060020a0316815260019190910190602001808311610615575b50505050509050610568565b6100cf6004356024358060016000508381548110156100025750600052507fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf690910155565b61068660408051602081810183526000825282516005805480840283018401909552848252929390929183018282801561018857602002820191906000526020600020906000905b825461010083900a900460ff1681526020600192830181810494850194909303909202910180841161029057905050505050509050610568565b6106d0600435602435600080546001810180835590913391829190849082908280158290116106ff578183600052602060002091820191016106ff91905b808211156107635760008155600101610308565b6106866040805160208181018352600082528251600480548084028301840190955284825292939092918301828280156101885760200282019190600052602060002090816000505481526020019060010190808311610171575b50505050509050610568565b6106e2600435600080548290811015610002575080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630154600160a060020a031681565b6106d060043560038054829081101561000257506000527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b015481565b6106d060043560018054829081101561000257506000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6015481565b6100cf6004356024358060046000508381548110156100025750600052507f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b90910155565b6106d060043560048054829081101561000257506000527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b015481565b610686604080516020818101835260008252825160038054808402830184019095528482529293909291830182828015610188576000919091527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b54825260209081028201917fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85c9101808311610171575b50505050509050610568565b6106d06000545b90565b6106d0600435600580548290811015610002575060005260208082047f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0015491066101000a900460ff1681565b604080516020818101835260008083528351815480840282018401909552848152610686949092830182828015610188579080526020028101907f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563905b8154600160a060020a0316815260019190910190602001808311610615575b50505050509050610568565b6106e260043560028054829081101561000257506000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0154600160a060020a031681565b60405180806020018281038252838181518152602001915080519060200190602002808383829060006004602084601f0104600302600f01f1509050019250505060405180910390f35b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b50505081548110156100025760009182526020822001805473ffffffffffffffffffffffffffffffffffffffff1916909217909155600180548082018083558290828015829011610767578183600052602060002091820191016107679190610308565b5090565b50505081548110156100025760009182526020909120015560028054600181018083558692919082908280158290116107b3578183600052602060002091820191016107b39190610308565b5050508154811015610002576000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff19169091179055600380546001810180835585929190829082801582901161081c5781836000526020600020918201910161081c9190610308565b50505081548110156100025760009182526020822001919091556005805460018101808355829082801582901161087457601f016020900481601f016020900483600052602060002091820191016108749190610308565b50505081548110156100025760009182526020808320818304018054919092066101000a60ff810219909116930292909217909155600480546001810180835582908280158290116108d9578183600052602060002091820191016108d99190610308565b505050815481101561000257600091825260209091200155509291505056";

  if ("0x2ddb7a5e9f6c027324269b23c69644ca9372a547" != "") {
    ChallengeRegistry.address = "0x2ddb7a5e9f6c027324269b23c69644ca9372a547";

    // Backward compatibility; Deprecated.
    ChallengeRegistry.deployed_address = "0x2ddb7a5e9f6c027324269b23c69644ca9372a547";
  }

  ChallengeRegistry.generated_with = "1.0.2";
  ChallengeRegistry.contract_name = "ChallengeRegistry";

  return ChallengeRegistry;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.ChallengeRegistry = factory;
}