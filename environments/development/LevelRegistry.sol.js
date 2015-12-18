"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var LevelRegistry = (function (_Pudding) {
    _inherits(LevelRegistry, _Pudding);

    function LevelRegistry() {
      _classCallCheck(this, LevelRegistry);

      _get(Object.getPrototypeOf(LevelRegistry.prototype), "constructor", this).apply(this, arguments);
    }

    return LevelRegistry;
  })(Pudding);

  ;

  // Set up specific data for this class.
  LevelRegistry.abi = [{ "constant": false, "inputs": [], "name": "get_all_names", "outputs": [{ "name": "", "type": "bytes32[]" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "level", "type": "address" }, { "name": "name", "type": "bytes32" }], "name": "add_level", "outputs": [], "type": "function" }, { "constant": false, "inputs": [], "name": "num_levels", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "levels", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [], "name": "get_all_levels", "outputs": [{ "name": "", "type": "address[]" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "level_names", "outputs": [{ "name": "", "type": "bytes32" }], "type": "function" }];
  LevelRegistry.binary = "6060604052610358806100126000396000f3606060405236156100565760e060020a6000350463309424fe81146100585780634b960064146100c05780638365172c14610127578063b2596a6714610131578063c985c22114610176578063d58c3d5a146101fe575b005b61023b6040805160208181018352600082528251600180548084028301840190955284825292939092918301828280156100b457602002820191906000526020600020905b81600050548152602001906001019080831161009d575b5050505050905061012e565b61005660043560243560008054600181018083558492919082908280158290116102b4578280526102b4907f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5639081019083015b808211156103385760008155600101610113565b6102856000545b90565b610297600435600080548290811015610002575080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630154600160a060020a031681565b60408051602081810183526000808352835181548084028201840190955284815261023b9490928301828280156100b4579080526020028101907f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563905b8154600160a060020a03168152600191909101906020018083116101d3575b5050505050905061012e565b61028560043560018054829081101561000257506000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6015481565b60405180806020018281038252838181518152602001915080519060200190602002808383829060006004602084601f0104600302600f01f1509050019250505060405180910390f35b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b5050508154811015610002576000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff191690911790556001805480820180835583929190829082801582901161033c57600083905261033c907fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6908101908301610113565b5090565b505050815481101561000257600091825260209091200155505056";

  if ("0x71f2b0e912d8ddfd4778d96c64da40ea92c19f50" != "") {
    LevelRegistry.address = "0x71f2b0e912d8ddfd4778d96c64da40ea92c19f50";

    // Backward compatibility; Deprecated.
    LevelRegistry.deployed_address = "0x71f2b0e912d8ddfd4778d96c64da40ea92c19f50";
  }

  LevelRegistry.generated_with = "1.0.2";
  LevelRegistry.contract_name = "LevelRegistry";

  return LevelRegistry;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.LevelRegistry = factory;
}