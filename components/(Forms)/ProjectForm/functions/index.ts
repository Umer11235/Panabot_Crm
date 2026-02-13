export const handleFormChange = <T extends Record<string, any>>(
  formData: T,
  setFormData: (data: T) => void,
  name: string,
  value: string
) => {
  setFormData({ ...formData, [name]: value });
};

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  type: "preview" | "attached",
  setPreviewImage: (file: File | null) => void,
  setAttachedFiles: (files: File[]) => void
) => {
  if (e.target.files && e.target.files[0]) {
    if (type === "preview") {
      setPreviewImage(e.target.files[0]);
    } else {
      setAttachedFiles(Array.from(e.target.files));
    }
  }
};

export const openFilePreview = (file: File) => {
  const url = URL.createObjectURL(file);
  window.open(url, "_blank");
};

export const handleFormSubmit = <T extends Record<string, any>>(
  e: React.FormEvent,
  formData: T,
  previewImage: File | null,
  attachedFiles: File[]
) => {
  e.preventDefault();
  console.log("Form:", formData, "Image:", previewImage, "Files:", attachedFiles);
};
