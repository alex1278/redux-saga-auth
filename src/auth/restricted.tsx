// in src/restricted.js
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import history from '../history';

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export function restricted(restrictionFn: () => Promise<boolean>) {

  return (BaseComponent: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>) => {
    class Restricted extends React.Component<RouteComponentProps<any>> {
      componentWillMount() {
        this.checkAuthentication();
      }

      componentWillReceiveProps(nextProps: any) {
        if (nextProps.location !== this.props.location) {
          this.checkAuthentication();
        }
      }

      checkAuthentication() {
        restrictionFn()
          .then(authed => this.setState(authed))
          .catch(e => history.replace({ pathname: '/login' }));
      }
      render() {
        return <BaseComponent {...this.props} />;
      }
    }
    return withRouter(Restricted);
  };
}
