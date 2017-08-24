import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { Link } from 'react-router-dom'
const DataTableCell = ({ rowIndex, data, col, link }) => {
    
      function handleClick(e) {
  
    return (<h1><TheComponent /></h1>);
  }
    
    
    if (data !== undefined && rowIndex < data.length) {
        {/*console.log(rowIndex, col);*/}
        if (link) {
            var linkValue = data[rowIndex][col];
            return <Cell><a href={'E:/Project/code 3/filesName'+ data[rowIndex].fileName}  onClick={handleClick}> {data[rowIndex][col]} </a> </Cell>
        }
        else if (col !== undefined &&data[rowIndex][col] !== undefined && col == 'errorCodes') {
            let errorCode = [];
            let count = 0;
            for (let errorDetails of data[rowIndex][col]) {
                errorCode.push(<label style={{ 'textDecoration': 'underline', 'align': 'left' }} key={++count} 
                title={errorDetails.errorDesc !== undefined ?errorDetails.errorDesc : '' }>{errorDetails.errorCode !== undefined ? errorDetails.errorCode :''} </label>);
            }
            return <Cell>{errorCode}</Cell>;
        }
        else {
            return <Cell> {data[rowIndex][col]} </Cell>
        }
    }
    return null;
};
export default DataTableCell;



