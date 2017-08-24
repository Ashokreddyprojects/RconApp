import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import * as constValues from '../utils/DashboardConstants'



class App extends Component {
    render() {
        return (
            <div>
                <div >
                    <Header userName={constValues.DUMMY_USER_NAME} />
                </div>
                <section className="task-container">
                    {this.props.children}
                </section>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}
App.propTypes = {
};
export default App;

