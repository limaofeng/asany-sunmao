import type { AsanyAction, IProjectState } from '../typings';
import { ProjectActionType } from './actions';
export default function reducer(state: IProjectState, action: AsanyAction<ProjectActionType>): IProjectState;
