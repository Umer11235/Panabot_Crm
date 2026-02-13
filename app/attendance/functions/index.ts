export const paginateData = <T,>(
  data: T[],
  page: number,
  pageSize: number
) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return { paginatedData: data.slice(startIndex, endIndex), startIndex, endIndex };
};

export const calculateTotalPages = (totalItems: number, pageSize: number) => {
  return Math.ceil(totalItems / pageSize);
};

export const handleFormSubmit = <T extends Record<string, any>>(
  e: React.FormEvent,
  formData: T,
  setModalOpen: (open: boolean) => void,
  setFormData: (data: T) => void,
  initialFormData: T,
  successMessage?: string
) => {
  e.preventDefault();
  console.log('Attendance:', formData);
  alert(successMessage || 'Added successfully!');
  setModalOpen(false);
  setFormData(initialFormData);
};

export const handleInputChange = <T extends Record<string, any>>(
  formData: T,
  setFormData: (data: T) => void,
  field: string,
  value: string
) => {
  setFormData({ ...formData, [field]: value });
};
