import axios from 'axios';
import alertify from 'alertify.js';
import jwt from 'jsonwebtoken';
import Cookie from 'cookies-js';
import config from '../config';
import {
  SET_CURRENT_USER,
  SIGN_UP_ERRORS,
  SIGN_UP_SUCCESS,
  DELETE_ERROR_MESSAGE
} from './types';

/**
   * Action to Register a user and return a JWT token
   * @param {*} user - Response object
   * @returns {user} setCurrentUser - to store
   */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const signUpError = error => ({
  type: SIGN_UP_ERRORS,
  error
});

export const deleteErrorMessageSuccess = () => ({
  type: DELETE_ERROR_MESSAGE,
});

export const signUpSuccess = success => ({
  type: SIGN_UP_SUCCESS,
  success
});

/**
   * Register a user and return a JWT token
   * @param {*} userData - Response object
   * @param {*} history - Next function
   * @param {*} done - Next function
   * @returns {token} token - JWT token
   */

export const deleteErrorMessage = () => (dispatch) => {
  dispatch(deleteErrorMessageSuccess());
};

/**
   * Register a user and return a JWT token
   * @param {*} userData - Response object
   * @param {*} history - Next function
   * @param {*} done - Next function
   * @returns {token} token - JWT token
   */
export const userSignUpRequest = userData => (dispatch) => {
  const user = { user: userData };
  return axios.post(`${config.apiUrl}/api/users`, user).then(
    (res) => {
      const { token } = res.data.user;
      const { message } = res.data;
      Cookie.set('jwtToken', token);
      dispatch(signUpSuccess({
        status: res.status,
        data: res.data.message
      }));
      dispatch(setCurrentUser(jwt.decode(token)));
      alertify.delay(3000);
      alertify.logPosition('top right');
      alertify.success(message);
    }
  ).catch((error) => {
    dispatch(signUpError(error.response.data));
  });
};
