import { useContext, useMemo } from 'react';
import { SunmaoContext } from "../SunmaoProvider";
import Debugger from "../utils/Debugger";
export default function useSunmao() {
  return useContext(SunmaoContext).sunmao;
}
export function useDebugger() {
  var debug = useContext(SunmaoContext).debug;
  return useMemo(function () {
    return new Debugger(debug);
  }, [debug]);
}