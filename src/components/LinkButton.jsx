
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
class LinkButton extends Component {
    
//       systosysrecondata(data)
//    {
//        if(data=="/nebert/systemReconciliation")
//            {
//                 reactLocalStorage.setObject('setDataListView', {});
//            }
//    onClick={this.systosysrecondata.bind(this,this.props.url)}
// 
//    }
    
    render() {
        return (
            <div className="paddingTop10">
                <Link className='button primary expanded btn-lg btn-color' to={this.props.url} role='button' >{this.props.name} </Link>
            </div>
        );
    }
}
LinkButton.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};
export default LinkButton;

