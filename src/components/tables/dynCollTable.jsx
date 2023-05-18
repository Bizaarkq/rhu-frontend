import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Icon,
  Collapse,
  Box,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { Link } from "react-router-dom";

function Row({
  row,
  columns,
  subColumns,
  actions,
  subColumnsKey,
  subColumnActions,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell key={row.id} align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <>
              <TableCell key={column.id} align={column.align}>
                {column.format && typeof value === "number"
                  ? column.format(value)
                  : value}
              </TableCell>
            </>
          );
        })}
        {actions && actions.length > 0 && (
          <TableCell key="actions" align="center">
            {actions.map((action, index) => {
              return (
                <Link
                  to={action.path + "/" + action.accion + "/" + row.id}
                  key={index}
                >
                  <IconButton key={index} color={action.color} size="small">
                    {action.icon}
                  </IconButton>
                </Link>
              );
            })}
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {subColumns.map((subColumn) => (
                      <TableCell
                        key={subColumn.id}
                        align={subColumn.align}
                        sx={{ minWidth: subColumn.minWidth }}
                      >
                        {subColumn.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row[subColumnsKey].map((subRow) => (
                    <TableRow key={subRow.id}>
                      {subColumns.map((subColumn) => {
                        const value = subRow[subColumn.id];
                        return (
                          <TableCell key={subColumn.id} align={subColumn.align}>
                            {subColumn.format && typeof value === "number"
                              ? subColumn.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      {subColumnActions && subColumnActions.length > 0 && (
                        <TableCell key="actions" align="center">
                          {subColumnActions.map((action, index) => {
                            return (
                              <Link
                                to={
                                  action.path +
                                  "/" +
                                  action.accion +
                                  "/" +
                                  row.id +
                                  "/" +
                                  subRow.id
                                }
                                key={index}
                              >
                                <IconButton
                                  key={index}
                                  color={action.color}
                                  size="small"
                                >
                                  {action.icon}
                                </IconButton>
                              </Link>
                            );
                          })}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function DynamicTable({
  columns,
  subColumns,
  subColumnsKey,
  rows,
  actions,
  subColumnActions,
  rowsPerPage,
  setRowsPerPage,
  totalRows,
}) {
  const [page, setPage] = useState(0);

  return (
    <>
      <Paper sx={{ width: "100%", height: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />

                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}

                {actions && actions.length > 0 && (
                  <TableCell
                    key="actions"
                    align="center"
                    sx={{ minWidth: 100 }}
                  >
                    Acciones
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <Row
                      key={index}
                      row={row}
                      columns={columns}
                      subColumns={subColumns}
                      subColumnsKey={subColumnsKey}
                      subColumnActions={subColumnActions}
                      actions={actions}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => {
            setPage(newPage);
          }}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </>
  );
}
