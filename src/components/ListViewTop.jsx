
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Row, Column, Grid } from 'react-foundation';
import ListViewFilter from './ListViewFilter';
import { connect } from 'react-redux';
import { fetchListViewData } from '../actions/dashboardActions';
import moment from 'moment';

export const customStyles = {
    content: {
        top: '15.5%',
        left: '25.7%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate (-50%,-50%)',
        padding:'0',
        minWidth:'930px',
        minHeight:'450px',
        borderbottomColor:'#1779ba',
        borderRadius:'0.6rem'
    }
}

class ListViewTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,             
            yesterDate:  moment().subtract(1, 'days').format('MM/DD/YYYY'),
            todayDate: moment().format('MM/DD/YYYY'),
            filterObject: null
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getFilteredValues = this.getFilteredValues.bind(this);
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal(e) {
         this.setState({ modalIsOpen: false });
    }
    getFilteredValues(data) {
        this.setState({ filterObject: data });
        this.props.receiveModalValues(data);
        this.closeModal();
    }
    render() {
        return (
             <div>
                <form className="div-form-container">
                    <div>
                        <span className="fa-stack fa-1g" style={{ "float": "right", 'marginTop': '-3em', "cursor": "pointer" }} title="Advanced Filter" onClick={this.openModal}>
                            <i className="fa fa-circle-thin fa-stack-2x" style={{ "color": "#5dade2" }}></i>
                            <i className="fa fa-filter fa-stack-1x"></i>
                        </span>
                        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}
                            style={customStyles} shouldCloseOnOverlayClick={false}
                            contentLabel="ListView Filter">
                            <div data-reveal="">
                                <button className="close-button" data-close="" aria-label="Close reveal" type="button" style={{ 'color': 'whitesmoke' }}>
                                    <span aria-hidden="true" onClick={this.closeModal}>&times;</span>
                                </button>
                            </div>
                            <ListViewFilter receiveFilteredValues={this.getFilteredValues} />
                        </Modal>
                    </div>
                    <div style={{
                        'border': '1px solid #5dade2',
                        'borderLeft': '4px solid #5dade2',
                        'padding': '10px 16px',
                        'marginBottom': '30px',
                        'borderRadius': '3px 6px 6px 3px'
                    }}>
                        <Row className="fieldLabel">
                            <Column small={12} medium={3}>
                                <label htmlFor="enrollmentFromDate">Enrollment From Date :</label>
                                <input id="enrollmentFromDate" className="inputField" type="text" defaultValue={this.state.yesterDate}
                                    readOnly ></input>
                            </Column>
                            <Column small={12} medium={3}>
                                <label htmlFor="enrollmentthroughDate">Enrollment Through Date:</label>
                                <input id="enrollmentthroughDate" className="inputField" type="text" defaultValue={this.state.todayDate}
                                    readOnly ></input>
                            </Column>



                        </Row>
                    </div>
                </form>
            </div >
        );
    }
}
ListViewTop.propTypes = {
};
export default ListViewTop;

