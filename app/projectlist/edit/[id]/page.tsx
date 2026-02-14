"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { projectsData } from '@/utils/data/projects.data';
import styles from './edit.module.css';
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor';
import FileUpload from '@/components/FileUpload/FileUpload';
import Button from '@/components/(Inputs)/Button/Button';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const project = projectsData.find(p => p.id === decodedId);

  const [formData, setFormData] = useState({
    projectName: project?.name || '',
    projectId: project?.id || '',
    startDate: project?.start || '',
    endDate: project?.end || '',
    description: '',
    budget: project?.budget || '',
    priority: '',
    category: '',
    manager: project?.manager || '',
    team: '',
    tags: ''
  });
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  if (!project) {
    return <div>Project not found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form:", formData, "Image:", previewImage, "Files:", attachedFiles);
    alert('Project updated successfully!');
    router.push('/projectlist');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Edit Project</h2>
        <form onSubmit={handleSubmit} className={styles.formLayout}>
          <div className={styles.leftSection}>
            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Project Name</label>
                <input name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Write Project Name" />
              </div>
              <div className={styles.fieldGroup}>
                <label>Project ID</label>
                <input name="projectId" value={formData.projectId} onChange={handleChange} placeholder="Write Project ID" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
              </div>
              <div className={styles.fieldGroup}>
                <label>End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.fullRow}>
              <label>Description</label>
              <RichTextEditor
                value={formData.description}
                onChange={(content) => setFormData(prev => ({ ...prev, description: content }))}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Budget</label>
                <input name="budget" value={formData.budget} onChange={handleChange} placeholder="Enter Budget" />
              </div>
              <div className={styles.fieldGroup}>
                <label>Priority Status</label>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                </select>
              </div>
            </div>

            <div className={styles.actions}>
              <Button variant="primary" type='submit' size='md'>
                Update Project
              </Button>
              <Button variant="danger" type='button' size='md' onClick={() => router.push('/projectlist')}>
                Cancel
              </Button>
            </div>
          </div>

          <div className={styles.rightSection}>
            <FileUpload
              name='photo'
              label="Project Preview Image"
              multiple={false}
              accept="image/*"
              files={previewImage ? [previewImage] : []}
              setFiles={(files) => setPreviewImage(files[0])}
            />
            <FileUpload
              name='file'
              label="Attached Files"
              multiple={true}
              files={attachedFiles}
              setFiles={setAttachedFiles}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
