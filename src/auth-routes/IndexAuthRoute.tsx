import * as React from 'react';
import { RoutePropsWithComponent } from './constants';
import PrivateRoute from './PrivateRoute';

const isAuthed = () => true; // change to actual auth funciton

export const IndexAuthRoute = (props: RoutePropsWithComponent) => (
  <PrivateRoute authFn={isAuthed} component={props.component} />
);
