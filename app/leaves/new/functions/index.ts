export const calculateDuration = (startDate: string, endDate: string): string => {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return `${diffDays} days`;
  }
  return '';
};

export const handleFormChange = <T extends Record<string, any>>(
  formData: T,
  setFormData: (data: T) => void,
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

export const handleFormSubmit = <T extends Record<string, any>>(
  e: React.FormEvent,
  formData: T,
  successMessage?: string
) => {
  e.preventDefault();
  console.log('Leave Data:', formData);
  alert(successMessage || 'Form submitted successfully!');
};
