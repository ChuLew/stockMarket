// import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

class StreamEdit extends React.Component {
 
  render() {
   
    return ( 
      <div>
        Hello
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

};

export default connect(
  mapStateToProps,
  { }
)(StreamEdit);
