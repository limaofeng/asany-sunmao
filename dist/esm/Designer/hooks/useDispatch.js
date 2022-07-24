import { useContext } from 'react';
import { AsanyContext } from "../AsanyContext";
export default function useDispatch() {
  var store = useContext(AsanyContext);
  return store.dispatch;
}