import React, {Component} from 'react';


class ModalDialog extends Component {

  constructor(props) {
    super(props);
    console.log(`dialog message: ${props.message}`);
  }

  render() {
    return (
      <div className="alert-success">
        {this.props.message}
      </div>
    );
  }

}

export default ModalDialog;