import React from 'react';
import Loadable from 'react-loadable';

const loading = () => <div>Loading...</div>;

export const Login = Loadable({
  loader: () => import(/* webpackChunkName: "Login" */ './login/Login'),
  loading,
});
