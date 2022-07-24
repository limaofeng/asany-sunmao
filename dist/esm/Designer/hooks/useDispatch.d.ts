import { IActionType } from '../reducers/actions';
export default function useDispatch<D = IActionType>(): import("../AsanyContext").DispatchWithoutAction<D>;
