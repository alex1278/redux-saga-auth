// in src/restricted.js
import * as React from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export function restricted(restrictionFn: () => Promise<boolean>, redirectRoute: string, authedRoute?: string) {

  return (BaseComponent: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>) => {
    class Restricted extends React.Component<RouteComponentProps<any>> {
      state = {
        authPending: true,
        isAuthed: false
      };

      // Requires that authedRoute start with '/'
      onAuthedRoute() {
        if (authedRoute && this.props.location.pathname === authedRoute) {
          return true;
        }
        return false;
      }

      componentWillMount() {
        // Run initial auth check
        this.checkAuthentication();
      }

      componentWillReceiveProps(nextProps: any) {
        // Re-check the authentication anytime the path changes
        if (nextProps.location.pathname !== this.props.location.pathname) {
          this.setState({ isAuthed: false, authPending: true });
          this.checkAuthentication();
        }
      }

      checkAuthentication() {
        // If there is an 'authed' route and they are already there,
        // assume there is no need to check for auth
        if (this.onAuthedRoute()) {
          this.setState({ isAuthed: true, authPending: false });
        } else {
          // The restriction function tells us whether or not the user is authed
          restrictionFn()
            .then(isAuthed => {
              this.setState({ isAuthed, authPending: false });
            })
            .catch(e => {
              // Somehow report error to user?
              this.setState({ isAuthed: false, authPending: false });
            });
        }
      }
      render() {
        const { authPending, isAuthed } = this.state;
        // Don't render anything until we hear back from the restriction function
        if (authPending) {
          return null;
        }
        // If the user is authed, either
        if (isAuthed) {
          // Redirect them to the authed route if they aren't already there
          if (authedRoute && !this.onAuthedRoute()) {
            return <Redirect to={authedRoute} />;
          }
          // Or render the base component
          return <BaseComponent {...this.props} />;
        }
        // If the user is NOT authed, redirect them to the redirectRoute
        return <Redirect to={redirectRoute} />;
      }
    }
    return withRouter(Restricted);
  };
}
