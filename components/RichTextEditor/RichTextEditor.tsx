"use client";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import '@/components/RichTextEditor/Tiptap.module.css';
import { EditorProps } from '@/utils/types/form.types';
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div style={{height: '200px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px'}} /> 
});
const RichTextEditor = ({ value, onChange }: EditorProps) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean'],
    ],
  };
  return (
    <div className="custom-quill-editor">
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Write Description..."
      />
      <style jsx global>{`
        .custom-quill-editor .ql-toolbar.ql-snow {
          border: 1px solid #e2e8f0;
          border-radius: 8px 8px 0 0;
          background: #f8fafc;
        }
        .custom-quill-editor .ql-container.ql-snow {
          border: 1px solid #e2e8f0;
          border-radius: 0 0 8px 8px;
          min-height: 200px;
          font-family: inherit;
        }
      `}</style>
    </div>
  );
};
export default RichTextEditor;
