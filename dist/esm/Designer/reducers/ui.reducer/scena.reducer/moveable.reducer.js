function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Memory from "../../../utils/Memory";
import MoveableData from "../../../utils/MoveableData";
import { GlobalAsanyAction, ProjectActionType, UIScenaMoveableActionType } from "../../actions";
var defaultMoveableState = {
  data: new MoveableData(new Memory()),
  selectedTargets: []
};
export default function reducer(state, action) {
  if (action.type === UIScenaMoveableActionType.MoveableSelectedTargets) {
    return _objectSpread(_objectSpread({}, state), {}, {
      selectedTargets: action.payload
    });
  } // if (action.type === BlockActionType.RegistrationBlock) {
  //   state.addElement(action.payload.key, {
  //     ...action.payload,
  //     ...action.payload.options,
  //   });
  //   return state;
  // }
  // if (action.type === BlockActionType.UninstallBlock) {
  //   // state.data.removeFrame(action.payload.element);
  //   // return { ...state, targets: state.targets.filter(item => item.id != action.payload.id) };
  //   return state;
  // }
  // if (action.type === UIScenaMoveableActionType.MoveableDisable) {
  //   state.setEnable(false);
  //   return state;
  // }
  // if (action.type === UIScenaMoveableActionType.MoveableEnable) {
  //   state.setEnable(true);
  //   return state;
  // }
  // if (action.type === UIScenaMoveableActionType.MoveableIgnoreTargets) {
  //   // return {
  //   //   ...state,
  //   //   ignoreTargets: action.payload,
  //   // };
  //   return state;
  // }


  if (action.type === UIScenaMoveableActionType.MoveableRef) {
    return _objectSpread(_objectSpread({}, state), {}, {
      ref: action.payload
    });
  }

  if (action.type === ProjectActionType.ChangeCase) {
    return _objectSpread({}, defaultMoveableState);
  }

  if (action.type === GlobalAsanyAction.Init) {
    return _objectSpread({}, defaultMoveableState);
  }

  return state;
}