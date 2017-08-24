
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchListViewData } from '../actions/dashboardActions';
import DataTable from './DataTable';
import * as constValues from '../utils/DashboardConstants';
import ReactPaginate from 'react-paginate';






const propTypes = {
    pageCount: PropTypes.number,
    totalEmployees: PropTypes.number,
    limit: PropTypes.number,
    rowHeight: PropTypes.number,
    headerHeight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    headerFields: PropTypes.array,
    modalValues: PropTypes.object
}


class ListViewData extends Component {
    constructor(props) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(fetchListViewData(constValues.GET_LIST_VIEW_URL, null));
    }
    handlePageClick(data) {
        this.props.form.ListViewFilterValues.values.pageNo = data.selected + 1;
        console.log(this.props.form.ListViewFilterValues.values);
        this.props.dispatch(fetchListViewData(constValues.GET_LIST_VIEW_URL, this.props.form.ListViewFilterValues.values));
    }
    render() {
        let totalCounts = 0;
        let pageCount = 1;
        if (this.props.data !== undefined) {
            totalCounts = Number(this.props.dataCounts);
            pageCount = totalCounts / 25;
        }
        const { data = [] } = this.props;
        if (data && data.length) {
            let csvData = data;
            return (
                <div>
                    <span> Total Records : <b> {totalCounts}</b> </span>
                    <DataTable data={this.props.data} limit={25} totalCounts={totalCounts}
                        rowHeight={30} headerHeight={60} width={950} height={550}
                        headerFields={
                            [{ id: 'transactionid', header: 'Transaction ID', width: 140, height: 30, link: true },
                            { id: 'transactionType', header: 'Transaction Type', width: 110, height: 30, link: false },
                            { id: 'subscriberName', header: 'Subscriber Name', width: 140, height: 30, link: false },
                            { id: 'contractEffDate', header: 'Effective Date', width: 110, height: 30, link: false },
                            { id: 'originSourceSystem', header: 'Origin Source System', width: 110, height: 30, link: false },
                            { id: 'sourceSystem', header: 'Target System', width: 110, height: 30, link: false },
                            { id: 'marketSegment', header: 'Market Segment', width: 110, height: 30, link: false },
                            { id: 'productType', header: 'Product Type', width: 110, height: 30, link: false },
                            { id: 'trnStatus', header: 'Target System Status', width: 110, height: 30, link: false },
                            { id: 'contractId', header: 'Contract ID', width: 90, height: 30, link: false },
                            { id: 'errorCodes', header: 'Error', width: 110, height: 30, link: false }

                            ]}
                        pageCount={pageCount} />
                    <ReactPaginate previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={<a href="">...</a>}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination text-center"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>

            );
        }
        else {
            return (<div><label className="noChartResults" style={{ "paddingRight": "14em" }}>No Matching Results Found.</label></div>);
        }

    }
}

ListViewData.propTypes = propTypes;


export default connect(state => state)(ListViewData);

