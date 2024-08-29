import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import { useContext } from 'react';
import { RecordsContext } from '../../../context/RecordsProvider';
import { formatDate } from '../../../utils';

const TestsTables = () => {
    const {testRecs} = useContext(RecordsContext);
    const rows = testRecs;
    console.log(rows);
  return (
    <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Test Type </TableCell>
            <TableCell align="center">Analysis Date</TableCell>
            <TableCell align="center">Blood Pressure</TableCell>
            <TableCell align="center">Cholesterol Levels</TableCell>
            <TableCell align="center">SugarLevels</TableCell>
            
           
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
            <TableRow >
              <TableCell align="left" sx={{ color: 'blue' }}>{row.TestType}</TableCell>
              <TableCell align="center" sx={{ color: 'blue' }}>{formatDate(row.AnalysisDate)}</TableCell>
              <TableCell  align="center" component="th" scope="row" sx={{ color: 'blue' }}>{(row.BloodPressure)}</TableCell>
              <TableCell align="center" sx={{ color: 'blue' }}>{row.CholesterolLevels}</TableCell>
              <TableCell align="right" sx={{ color: 'blue' }}>{row.SugarLevels}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TestsTables;
