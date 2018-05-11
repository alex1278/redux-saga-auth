import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import store from '../store';
import { PrivateRouteProps, RouteComponent, StoreBasedAuthFn } from './constants';

const privateRouteRenderProps = (Component: RouteComponent, authFn: StoreBasedAuthFn ) => {
  return (props: RouteProps) => {
    if (authFn(store)) {
      return <Component {...props} />;
    }
    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
  };
};

const PrivateRoute = ({component, authFn, ...rest}: PrivateRouteProps) => (
  <Route {...rest} render={privateRouteRenderProps(component, authFn)} />
);

export default PrivateRoute;
