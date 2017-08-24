
import React, { Component } from 'react';
import { Row, Column } from 'react-foundation'
class RecordFlagsHelp extends Component {
  render() {
    return (
      <div className="record-flag-help-container">
        <h5>Record Flag Description
        </h5>
        <ul>
          <li>
            B- FFM Generated CIC Enrollment, The member is part of an FFM Enrollment CIC Generated condition and is used to complete the entire Enrollment Group to facilitate matching the Issuer version of a CIC to the FFM version of that CIC
            </li>
          <li>
            C-Cancellation, The enrollment record has been cancelled in the Issuer’s System or the FFM
         </li>
          <li>
            F-FFM Orphans, No matching Issuer record found for this FFM record, by Quattro Key
         </li>
          <li>
            I-Issuer Orphans, No matching FFM record for this Issuer record, by Quattro Key
        </li>
          <li>
            G-"Leftover” FFM Orphans, After resolving 1:M or M:1 by selecting best match, these unmatched records became FFM Orphans, no remaining Issuer record for this FFM record, by Quattro Key
        </li>
          <li>
            R-“Leftover” Issuer Orphans, After resolving 1:M or M:1 by selecting best match, these unmatched records became Issuer Orphans, no remaining FFM record
            for this Issuer record, by Quattro Key
        </li>
          <li>
            W-Many FFM: Many Issuer, best match cannot be found for multiple records with the same Quattro Key on both the FFM and Issuer side, all records remain unmatched
        </li>
          <li>
            L-1:Many, Many:1 Unresolved Sets, best match cannot be found for multiple records on either the FFM or Issuer side to one record on the other side with the same Quattro Key, all records remain unmatched
         </li>
          <li>
            U-Unprocessable Record contains significant data issues that have caused removal of the record from the matching process; such issues include, but are not limited to, poorly formed date or financial values, dates in the incorrect plan year, etc.
         </li>
          <li>
            D-Duplicate Issuer Record, with no identifiable way to resolve which was the correct record to match to corresponding FFM record
         </li>
          <li>
            M-Exact Match, 1:1 Match and all fields that are compared match between the Issuer and FFM record – may contain field-level discrepancies flagged “D” – Did Not Compare
          </li>
          <li>
            E-Non-Match with Issuer Action, No FFM Action Due to Uneven Record Match, 1:1 Match, with one or more field-level discrepancies flagged for Issuer update and one or more fields flagged for FFM update, however due to uneven matching of records within the same Quattro Key, FFM updates will not be applied in this cycle
            Note: Issuers must take action to resolve records flagged ‘E’ in order to ensure proper updates are applied to FFM.
         </li>
          <li>
            N-Non-Match with Issuer Action Required, 1:1 Match, and at least one field flagged for Issuer action; one or more fields may also be flagged for FFM update
        </li>
          <li>
            P-Non-Match with No Issuer Action, No FFM Action Due to Uneven Record Match, 1:1 Match, with no field-level discrepancies flagged for Issuer update but one or more fields flagged for FFM update, however due to uneven matching of records within the same Quattro Key, FFM updates will not be applied in this cycle
            Note: Issuers must take action to resolve records flagged ‘P’ in order to ensure proper updates are applied to FFM.
        </li>
          <li>
            z-Only FFM Action Required, 1:1 Match, no field-level discrepancies flagged for Issuer update but one or more fields flagged for FFM update.
        </li>
        </ul>
      </div>
    );
  }
}
RecordFlagsHelp.propTypes = {};
export default RecordFlagsHelp;


