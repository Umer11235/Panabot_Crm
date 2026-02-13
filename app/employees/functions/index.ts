import { Employee } from "@/utils/types/employee.types";

export const filterEmployees = (
  employees: Employee[],
  searchQuery: string,
  statusFilter: string
) => {
  return employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All Employee" || emp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
};

export const paginateData = <T,>(
  data: T[],
  page: number,
  pageSize: number
) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
};

export const handlePageChange = (
  newPage: number,
  setPage: (page: number) => void
) => {
  setPage(newPage);
};
