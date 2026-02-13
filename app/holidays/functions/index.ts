export const getDayFromDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const handleDateChange = (
  dateStr: string,
  formData: any,
  setFormData: (data: any) => void
) => {
  const day = getDayFromDate(dateStr);
  setFormData({ ...formData, date: dateStr, day });
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
  console.log('Holiday:', formData);
  alert(successMessage || 'Added successfully!');
  setModalOpen(false);
  setFormData(initialFormData);
};
