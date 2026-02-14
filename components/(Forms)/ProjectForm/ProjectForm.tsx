"use client";

import React, { useState } from 'react';
import styles from './CreateProject.module.css';
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor';
import FileUpload from '@/components/FileUpload/FileUpload';
import Button from '@/components/(Inputs)/Button/Button';
import ClientSelector from './ClientSelector';
import TeamSelector from './TeamSelector';
import MilestoneManager from './MilestoneManager';
import { handleFormChange } from './functions';

export default function CreateProjectPage() {
  const [formData, setFormData] = useState({
    projectName: '',
    projectId: '',
    startDate: '',
    endDate: '',
    description: '',
    budget: '',
    priority: '',
    category: '',
    manager: '',
    client: '',
    team: '',
    tags: ''
  });
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleFormChange(formData, setFormData, name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form:", formData, "Image:", previewImage, "Files:", attachedFiles);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* <h2 className={styles.title}>Create New Project</h2> */}
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
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Categories</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="research">Research</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label>Project Manager</label>
                <select name="manager" value={formData.manager} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Add Team Members</label>
                <select name="team" value={formData.team} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Team A">Team A</option>
                  <option value="Team B">Team B</option>
                  <option value="Team C">Team C</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label>Project Tags</label>
                <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Enter tags" />
              </div>
            </div>

            <div className={styles.actions}>
              <Button variant="primary" type='submit' size='md' onClick={() => console.log("Submit")}>
                + Create Project
              </Button>
              <Button variant="danger" type='reset' size='md'>
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

        <ClientSelector
          isOpen={showClientModal}
          onClose={() => setShowClientModal(false)}
          onSelect={setSelectedClient}
          selected={selectedClient}
        />

        <TeamSelector
          isOpen={showTeamModal}
          onClose={() => setShowTeamModal(false)}
          onSelect={setSelectedTeam}
          selected={selectedTeam}
        />
      </div>
    </div>
  );
}
