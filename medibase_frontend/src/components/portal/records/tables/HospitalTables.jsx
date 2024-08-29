import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useContext } from 'react';
import { RecordsContext } from '../../../context/RecordsProvider';
import { formatDate } from '../../../utils';

const HospitalTables = () => {
    const {hospitalRecs} = useContext(RecordsContext);
    const rows = hospitalRecs;
    console.log(rows);
  return (
    <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>CaseID</TableCell>
            <TableCell align="center">AdmissionDate</TableCell>
            <TableCell align="center">DischargeDate</TableCell>
            <TableCell align="center">BillingDetails</TableCell>
            <TableCell align="center">AdmittedFor</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
            <TableRow key={row.CaseID}>
              <TableCell align="left" sx={{ color: 'blue' }}>{row.CaseID}</TableCell>
              <TableCell component="th" scope="row" sx={{ color: 'blue' }}>{formatDate(row.AdmissionDate)}</TableCell>
              <TableCell align="center" sx={{ color: 'blue' }}>{formatDate(row.DischargeDate)}</TableCell>
              <TableCell align="center" sx={{ color: 'blue' }}>Rs. {row.BillingDetails}</TableCell>
              <TableCell align="right" sx={{ color: 'blue' }}>{row.AdmittedFor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HospitalTables;
