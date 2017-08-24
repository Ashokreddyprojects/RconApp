import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LinkButton from './LinkButton'
import {Link} from 'react-router-dom'

class SectionalView extends Component {
    render() {
        return (
            <Link to={this.props.urlRedirect}>
                <div className="tile" style={this.props.tileColor}>
                    <div className="tile-icon">
                        <i className={"fa fa-" + this.props.iconClass} aria-hidden="true"></i>
                    </div>
                    <div className="tile-title">
                        {this.props.title}
                        </div>
                    <div className="title-text">{this.props.labelText}</div>
                </div>
            </Link>
        );
    }
}
SectionalView.propTypes = {
    labelText: PropTypes.string,
    tileColor: PropTypes.object,
    iconClass: PropTypes.string,
    urlRedirect: PropTypes.string
};
export default SectionalView;
