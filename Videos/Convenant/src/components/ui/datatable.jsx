import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function DataTable({
  data,
  columns,
  withCheckbox = false,
  minWidth = "1200px",
  currentPage,
  totalPages,
  onPageChange,
  getRowLink,
  uniqueKey = "id",
}) {
  const [selectedRows, setSelectedRows] = React.useState(new Set());
  const navigate = useNavigate();

  // ✅ Use dynamic key (id, BranchCode, etc.)
  const getRowId = (row) => row[uniqueKey] ?? row.id;

  // ✅ Selection state derived from Set
  const allSelected = data.length > 0 && selectedRows.size === data.length;
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < data.length;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data.map((row) => getRowId(row))));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  const handleRowClick = (e, row) => {
    if (e.target.type === "checkbox") return;
    if (getRowLink) navigate(getRowLink(row));
  };

  // ✅ Layout logic for scroll/spacing
  const columnCount = columns.length;
  const shouldScroll = columnCount > 6;
  const compactLayout = columnCount <= 4;
  const minimalLayout = columnCount <= 3;

  const tableWrapperClass = shouldScroll
    ? "overflow-x-auto"
    : "overflow-x-visible";

  const tableStyle = shouldScroll
    ? { minWidth }
    : compactLayout
    ? { width: "auto", margin: "0 auto" }
    : { width: "100%" };

  // ✅ Adjust spacing dynamically
  const cellPadding = minimalLayout
    ? "px-2 py-2"
    : compactLayout
    ? "px-3 py-3"
    : "px-4 py-4";

  return (
    <Card className="bg-white border border-gray-200 shadow-sm w-full max-w-full">
      <CardContent className="p-0">
        <div className={tableWrapperClass}>
          <div className="w-full" style={tableStyle}>
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-gray-100 bg-gray-50">
                  {withCheckbox && (
                    <TableHead className="w-12 px-3 py-3 sticky left-0 bg-gray-50 z-10">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={allSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = isIndeterminate;
                        }}
                        onChange={handleSelectAll}
                      />
                    </TableHead>
                  )}
                  {columns.map((col) => (
                    <TableHead
                      key={col.key}
                      className={`text-gray-700 font-semibold text-sm ${cellPadding} ${
                        col.className || ""
                      }`}
                    >
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((row) => {
                  const rowId = getRowId(row);
                  const clickable = !!getRowLink;

                  return (
                    <TableRow
                      key={rowId}
                      onClick={(e) => handleRowClick(e, row)}
                      className={`border-b border-gray-50 transition-colors ${
                        clickable ? "hover:bg-gray-50/50 cursor-pointer" : ""
                      }`}
                    >
                      {withCheckbox && (
                        <TableCell className="px-3 py-3 sticky left-0 bg-white z-10">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={selectedRows.has(rowId)}
                            onChange={() => handleRowSelect(rowId)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                      )}
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          className={`text-sm text-gray-600 ${cellPadding} ${
                            col.className || ""
                          }`}
                        >
                          {col.render ? col.render(row) : row[col.key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* ✅ Pagination Section */}
        {totalPages > 1 && (
          <div className="flex sm:flex-row items-center justify-center px-4 lg:px-6 py-4 border-t border-gray-100 gap-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {currentPage > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => onPageChange(1)}
                        className="cursor-pointer"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {currentPage > 4 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                  </>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page >= Math.max(1, currentPage - 2) &&
                      page <= Math.min(totalPages, currentPage + 2)
                  )
                  .map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => onPageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => onPageChange(totalPages)}
                        className="cursor-pointer"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      onPageChange(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}