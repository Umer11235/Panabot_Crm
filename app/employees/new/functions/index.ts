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
  files?: File[],
  successMessage?: string
) => {
  e.preventDefault();
  console.log('Form Data:', formData);
  if (files) console.log('Files:', files);
  alert(successMessage || 'Form submitted successfully!');
};
