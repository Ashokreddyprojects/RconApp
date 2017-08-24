
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
    render() {
        const { match, location, history } = this.props
        return (
            <div>You are now at {location.pathname}</div>
        )
    }
}


ShowTheLocation.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
};
export default ShowTheLocation;
// Create a new component that is "connected" (to borrow redux
// terminology) to the router.

