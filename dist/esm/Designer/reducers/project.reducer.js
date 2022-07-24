import { ProjectActionType } from "./actions";
export default function reducer(state, action) {
  if (ProjectActionType.ChangeCase === action.type) {
    return action.payload;
  }

  return state;
}