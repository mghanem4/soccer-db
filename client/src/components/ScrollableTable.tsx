import React, { ReactNode, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
} from '@mui/material';

interface ScrollableTableProps<T> {
  data: T[];
  columns: { id: keyof T; label: string }[];
  filterBy: (item: T, query: string) => boolean;
  onRowClick?: (item: T) => void;
}

const ScrollableTable = <T,>({
  data,
  columns,
  filterBy,
  onRowClick,
}: ScrollableTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on the search query
  const filteredData = data.filter((item) => filterBy(item, searchQuery));

  // Helper function to safely render cell values
  const renderCell = (value: unknown): ReactNode => {
    if (value === null || value === undefined) return 'N/A'; // Default for null/undefined
    if (typeof value === 'string' || typeof value === 'number') return value; // Safe types
    return null; // Fallback for unsupported types
  };

  return (
    <Box>
      {/* Search Input */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
      />

      {/* Scrollable Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id.toString()}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => onRowClick && onRowClick(item)} // Handle row clicks if provided
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((column) => (
                  <TableCell key={column.id.toString()}>
                    {renderCell(item[column.id])} {/* Safely render cell value */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScrollableTable;
