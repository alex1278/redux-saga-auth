import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../index-reducer';
import signupRequest from './actions';
import { SignupRequestAction, SignupRequestPayload, SignupState } from './constants';

// Import the helpers.. that we'll make here in the next step
import Errors from '../notifications/Errors';
import Messages from '../notifications/Messages';

interface SignupFormProps extends InjectedFormProps<SignupRequestPayload> {
  signup: SignupState;
  signupRequest: (payload: SignupRequestPayload) => SignupRequestAction;
}

// Will this type be enough?
class Signup extends React.Component<SignupFormProps> {

  // Redux Form will call this function with the values of our
  // Form fields "email" and "password" when the form is submitted
  // this will in turn call the action
  submit = (values: SignupRequestPayload) => {
    // we could just do signupRequest here with the static proptypes
    // but ESLint doesn't like that very much...
    this.props.signupRequest(values);
  }

  render() {

    const {
      handleSubmit,
      signup: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props;

    return (
      <div className="signup">
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Signup</h1>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="text"
            id="email"
            className="email"
            label="Email"
            component="input"
          />
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            label="Password"
            component="input"
          />
          {/* Originally was `action="submit"` may need to change back for Redux  */}
          <button type="submit">SIGNUP</button>
        </form>
        <div className="auth-messages">
          {
            /*
            These are all nothing more than helpers that will show up
            based on the UI states, not worth covering in depth.  Simply put
            if there are messages or errors, we show them
            */
          }
          {!requesting && !!errors.length && (
            <Errors message="Failure to signup due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
          {!requesting && successful && (
            <div>
              Signup Successful! <Link to="/login">Click here to Login »</Link>
            </div>
          )}
          {!requesting && !successful && (
            <Link to="/login">Already a Widgeter? Login Here »</Link>
          )}
        </div>
      </div>
    );
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
