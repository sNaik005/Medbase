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

const ClinicalTables = () => {
    const {clinicRecs} = useContext(RecordsContext);
    const rows = clinicRecs;
    console.log(rows);
  return (
    <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>DoctorName</TableCell>
            <TableCell align="center">DateOfVisit</TableCell>
            <TableCell align="center">Diagnosis</TableCell>
            <TableCell align="center">Prescription</TableCell>
            <TableCell align="center">TestSuggested</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
            <TableRow >
              <TableCell align="left" sx={{ color: 'blue' }}>{row.DoctorName}</TableCell>
              <TableCell align="center" sx={{ color: 'blue' }}>{formatDate(row.DateOfVisit)}</TableCell>
              <TableCell  align="center" component="th" scope="row" sx={{ color: 'blue' }}>{(row.Diagnosis)}</TableCell>
              <TableCell align="center" sx={{ color: 'blue' }}>{row.Prescription}</TableCell>
              <TableCell align="right" sx={{ color: 'blue' }}>{row.TestSuggested}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ClinicalTables;
