import * as React from 'react';
import { restricted } from '../auth/restricted';
import { checkWidgetAuthorization } from '../lib/check-auth';

class Widgets extends React.Component {
  render() {
    return (<div>WIDGETS</div>);
  }
}

export default restricted(() => {
  console.log('aqui');
  return checkWidgetAuthorization();
}, '/login')(Widgets);
