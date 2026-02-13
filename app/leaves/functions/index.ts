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
