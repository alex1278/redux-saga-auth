import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { Store } from 'redux';
import { RootState } from '../index-reducer';

export type RouteComponent = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
export type StoreBasedAuthFn = (store: Store<RootState>) => boolean;

export interface RoutePropsWithComponent extends RouteProps {
  component: RouteComponent;
}

export interface PrivateRouteProps extends RoutePropsWithComponent {
  authFn: StoreBasedAuthFn;
}
