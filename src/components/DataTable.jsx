/*Dumb component that just renders a table with input parameters*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTableCell from './DataTableCell';
import { Table, Column, Cell } from 'fixed-data-table-2';

const propTypes = {
    pageCount: PropTypes.number,
    totalCounts: PropTypes.number,
    limit: PropTypes.number,
    rowHeight: PropTypes.number,
    headerHeight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    headerFields: PropTypes.array
}
class DataTable extends Component {
    renderColumns(headerFields, data) {
      

        return headerFields.map(datum => {
            return <Column 
                key={datum.id} header={<Cell>{datum.header}</Cell>}
                cell={<DataTableCell data={data} col={datum.id} link={datum.link}/>}
                width={datum.width} height={datum.height}
            />
        })
    }
    render() {
        const { pageCount, totalCounts, limit } = this.props
        const { rowHeight, headerHeight, width, height } = this.props
        const { data } = this.props
        const { headerFields } = this.props
       // console.log( pageCount, totalCounts, limit, rowHeight, headerHeight, width, height,data,headerFields )
        return (
            <Table
                rowsCount={limit}
                rowHeight={rowHeight}
                headerHeight={headerHeight}
                width={width}
                height={height}>
                {this.renderColumns(headerFields,data)}
            </Table>
        )
    }
}
DataTable.propTypes = propTypes
export default DataTable

