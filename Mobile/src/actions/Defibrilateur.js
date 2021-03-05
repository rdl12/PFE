import { ADD_DEFIB } from './types';

export const adddefib = (payload) => (
  {
    type: ADD_DEFIB,
    data: payload
  }
);