import { useContext } from 'react';
import { AsanyContext } from "../AsanyContext";
export default function useAsanyStore() {
  return useContext(AsanyContext);
}