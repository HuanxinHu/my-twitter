import { createAction } from '@reduxjs/toolkit';

export const updateUser = createAction('user/updateUser', (user) => {
  return {
    payload: { user },
  };
});
