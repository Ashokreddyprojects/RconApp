
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
class FromDatePicker extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            input: moment().subtract(1, 'days')
        };
    }
    render() {
        const { input, meta: { touched, error } } = this.props
        return (
            <div>
                <DatePicker
                    {...input}
                    dateFormat="MM/DD/YYYY"
                    selected={input.value !==''? moment(input.value, 'MM/DD/YYYY') : null}
                    onChange={this.handleChange}
                />
                {touched && error && <span>{error}</span>}
            </div>
        );
    }

    handleChange(date) {
            

        this.props.input.onChange(moment(date))
    }
}
FromDatePicker.propTypes = {
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.bool,
    })
};
export default FromDatePicker;

