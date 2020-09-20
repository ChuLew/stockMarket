import React from 'react';
// import { connect } from 'react-redux';
import Dashboard from '../../dashboard/Dashboard';  

class StreamShow extends React.Component {
 
  render() {
    
    return (
      <div>
        <Dashboard/>
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
  
// };

// export default connect(
//   mapStateToProps,
//   { }
// )(StreamShow);
export default StreamShow;