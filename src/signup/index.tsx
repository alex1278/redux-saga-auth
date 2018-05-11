import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../index-reducer';
import signupRequest from './actions';

// Will this type be enough?
// If trouble, see https://spin.atomicobject.com/2017/04/20/typesafe-container-components/
class Signup extends React.Component<InjectedFormProps> {
  render() {
    return <div>Signup</div>;
  }
}

// Grab only the piece of state we need
const mapStateToProps = (state: RootState) => ({
  signup: state.signup,
});

// Connect our component to redux and attach the `signup` piece
// of state to our `props` in the component. Also attach the
// `signupRequest` action to our `props` as well.
const connected = connect(mapStateToProps, { signupRequest })(Signup);

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as `signup`.
const formed = reduxForm({ form: 'signup' })(connected);

// Export our well formed component!
export default formed;
