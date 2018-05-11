// in src/restricted.js
import * as React from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export function restricted(restrictionFn: () => Promise<boolean>, redirectRoute: string) {

  return (BaseComponent: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>) => {
    class Restricted extends React.Component<RouteComponentProps<any>> {
      state = {
        authPending: true,
        isAuthed: false
      };

      componentWillMount() {
        this.checkAuthentication();
      }

      componentWillReceiveProps(nextProps: any) {
        if (nextProps.location !== this.props.location) {
          this.setState({isAuthed: false, authPending: true});
          this.checkAuthentication();
        }
      }

      checkAuthentication() {
        restrictionFn()
          .then(isAuthed => {
            this.setState({isAuthed, authPending: false});
          })
          .catch(e => {
            // Somehow report error to user?
            this.setState({isAuthed: false, authPending: false});
          });
      }
      render() {
        const {authPending, isAuthed} = this.state;
        if (authPending) {
          return null;
        }
        if (isAuthed) {
          return <BaseComponent {...this.props} />;
        }
        return <Redirect to={redirectRoute}/>;
      }
    }
    return withRouter(Restricted);
  };
}
