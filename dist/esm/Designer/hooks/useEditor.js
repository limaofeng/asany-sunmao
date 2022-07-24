import { useMemo } from 'react';
import AsanyEditor from "../api";
import useAsanyStore from "./useAsanyStore";
export default function useEditor() {
  var store = useAsanyStore();
  return useMemo(function () {
    return new AsanyEditor(store);
  }, [store]);
}