import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell } from 'fixed-data-table-2';
const DataTableCellRecon = ({ rowIndex, data, col, link }) => {
    if (data !== undefined && rowIndex < data.length) {
//        console.log(rowIndex, col);
        if (link) {
            let fileName = data[rowIndex]["fileName"];
            let linkref = "../filesName/" +data[rowIndex].fileName;
            
            
           // let linkref = "file:///C:/Users/g7to/Desktop/RCNO_RCNI/CIP_Diamond_Recon_20170709.csv";
       
 
    
            return <Cell><a href={linkref} > {data[rowIndex][col]} </a> </Cell>
        } else {
            return <Cell> {data[rowIndex][col]} </Cell>
        }
    }
    return null;
};
export default DataTableCellRecon;


