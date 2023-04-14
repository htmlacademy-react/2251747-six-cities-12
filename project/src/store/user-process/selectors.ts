import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/user';

export const getUser = (state: State): UserData | null => state[NameSpace.User].user;
export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
