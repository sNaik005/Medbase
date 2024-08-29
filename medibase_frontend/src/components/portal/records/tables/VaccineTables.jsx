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

const VaccineTables = () => {
    const {vaccineRecs} = useContext(RecordsContext);
    const rows = vaccineRecs;
    
  return (
    <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vaccine</TableCell>
            <TableCell align="center">Date Administered</TableCell>
            <TableCell align="center">HospitalID</TableCell>
            <TableCell align="center">Location</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
            <TableRow key={row.VaccineType}>
              <TableCell component="th" scope="row" sx={{ color: 'blue' }}>{row.VaccineType}</TableCell>
              <TableCell align="center" sx={{ color: 'blue' }}>{formatDate(row.DateAdministered)}</TableCell>
              <TableCell align="center" sx={{ color: 'blue' }}>{row.HospitalID}</TableCell>
              <TableCell align="center" sx={{ color: 'blue' }}>{row.Location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VaccineTables;
