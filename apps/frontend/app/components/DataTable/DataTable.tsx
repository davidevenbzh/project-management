import Checkbox from "@mui/material/Checkbox";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useMemo, useState } from "react";

import { AppText } from "../Text/AppText";
import { Surface } from "../Surface/Surface";


export type DataTableCellValue = React.ReactNode;

export type DataTableRow = {
  id: string;
  [key: string]: DataTableCellValue;
};

export type DataTableColumn = {
  align?: "left" | "center" | "right";
  header: string;
  key: string;
  render?: (row: DataTableRow) => React.ReactNode;
  sortAccessor?: (row: DataTableRow) => string | number;
  sortable?: boolean;
  width?: number | string;
};

export type DataTableProps = {
  columns: DataTableColumn[];
  emptyMessage?: string;
  initialRowsPerPage?: number;
  loading?: boolean;
  rows: DataTableRow[];
  selectable?: boolean;
  title?: string;
};

const compareValues = (
  leftValue: string | number,
  rightValue: string | number,
) => {
  if (typeof leftValue === "number" && typeof rightValue === "number") {
    return leftValue - rightValue;
  }

  return String(leftValue).localeCompare(String(rightValue));
};

/**
 * Displays a sortable, selectable, paginated data table.
 */
export function DataTable({
  columns,
  emptyMessage = "No records to display.",
  initialRowsPerPage = 5,
  loading = false,
  rows,
  selectable = true,
  title = "Data view",
}: DataTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [sortKey, setSortKey] = useState<string | null>(
    columns.find((column) => column.sortable)?.key ?? null,
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const sortedRows = useMemo(() => {
    if (!sortKey) {
      return rows;
    }

    const activeColumn = columns.find((column) => column.key === sortKey);
    if (!activeColumn) {
      return rows;
    }

    return [...rows].sort((leftRow, rightRow) => {
      const leftValue =
        activeColumn.sortAccessor?.(leftRow) ?? leftRow[sortKey];
      const rightValue =
        activeColumn.sortAccessor?.(rightRow) ?? rightRow[sortKey];
      const normalizedLeft =
        typeof leftValue === "number" || typeof leftValue === "string"
          ? leftValue
          : String(leftValue ?? "");
      const normalizedRight =
        typeof rightValue === "number" || typeof rightValue === "string"
          ? rightValue
          : String(rightValue ?? "");
      const result = compareValues(normalizedLeft, normalizedRight);

      return sortDirection === "asc" ? result : -result;
    });
  }, [columns, rows, sortDirection, sortKey]);

  const visibleRows = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedRows.slice(startIndex, startIndex + rowsPerPage);
  }, [page, rowsPerPage, sortedRows]);

  const allVisibleSelected =
    visibleRows.length > 0 &&
    visibleRows.every((row) => selectedIds.includes(row.id));
  const hasVisibleSelection = visibleRows.some((row) =>
    selectedIds.includes(row.id),
  );

  const toggleSelection = (rowId: string) => {
    setSelectedIds((currentSelection) =>
      currentSelection.includes(rowId)
        ? currentSelection.filter((value) => value !== rowId)
        : [...currentSelection, rowId],
    );
  };

  const toggleSort = (column: DataTableColumn) => {
    if (!column.sortable) {
      return;
    }

    if (sortKey === column.key) {
      setSortDirection((currentDirection) =>
        currentDirection === "asc" ? "desc" : "asc",
      );
      return;
    }

    setSortKey(column.key);
    setSortDirection("asc");
  };

  return (
    <Surface
      accent="secondary"
      className="pm-table"
      description="Sorting, selection, and pagination are built into the first pass."
      title={title}
    >
      <div className="pm-table__toolbar">
        <AppText tone="muted" variant="body2">
          {selectedIds.length > 0
            ? `${selectedIds.length} row(s) selected`
            : `${rows.length} total row(s)`}
        </AppText>
        <span className="pm-table__meta">
          active sort: {sortKey ?? "none"} / {sortDirection}
        </span>
      </div>

      <TableContainer>
        {loading ? <LinearProgress /> : null}
        <Table>
          <TableHead>
            <TableRow>
              {selectable ? (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allVisibleSelected}
                    indeterminate={!allVisibleSelected && hasVisibleSelection}
                    onChange={(_, nextValue) => {
                      setSelectedIds((currentSelection) => {
                        const visibleIds = visibleRows.map((row) => row.id);
                        if (!nextValue) {
                          return currentSelection.filter(
                            (id) => !visibleIds.includes(id),
                          );
                        }

                        return Array.from(
                          new Set([...currentSelection, ...visibleIds]),
                        );
                      });
                    }}
                  />
                </TableCell>
              ) : null}
              {columns.map((column) => (
                <TableCell
                  align={column.align}
                  key={column.key}
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortKey === column.key}
                      direction={sortKey === column.key ? sortDirection : "asc"}
                      onClick={() => toggleSort(column)}
                    >
                      {column.header}
                    </TableSortLabel>
                  ) : (
                    column.header
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && visibleRows.length === 0 ? (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={columns.length + (selectable ? 1 : 0)}
                >
                  <AppText tone="muted">{emptyMessage}</AppText>
                </TableCell>
              </TableRow>
            ) : null}
            {visibleRows.map((row) => {
              const selected = selectedIds.includes(row.id);

              return (
                <TableRow hover key={row.id} selected={selected}>
                  {selectable ? (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected}
                        onChange={() => toggleSelection(row.id)}
                      />
                    </TableCell>
                  ) : null}
                  {columns.map((column) => (
                    <TableCell align={column.align} key={column.key}>
                      {column.render ? column.render(row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, nextPage) => setPage(nextPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number(event.target.value));
          setPage(0);
        }}
      />
    </Surface>
  );
}
