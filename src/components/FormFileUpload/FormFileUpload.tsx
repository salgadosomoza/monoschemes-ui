import { useRef, useState, useId } from 'react';
import './FormFileUpload.css';
import { Icon } from '../Icon';

export type FormFileUploadType = 'default' | 'drag-and-drop';

export interface FormFileUploadProps {
  /** Layout variant. */
  type?: FormFileUploadType;
  /** File type filter (e.g. "image/*", ".pdf"). */
  accept?: string;
  /** Allow selecting multiple files. */
  multiple?: boolean;
  /** Callback fired when files are selected. */
  onChange?: (files: FileList) => void;
  /** Label for the trigger button (default type). */
  label?: string;
}

function UploadIcon() {
  return <Icon className="form-file-icon" name="upload" size={24} />;
}

export function FormFileUpload({
  type = 'default',
  accept,
  multiple = false,
  onChange,
  label = 'Choose file',
}: FormFileUploadProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  function handleFiles(files: FileList | null) {
    if (files && files.length > 0) onChange?.(files);
  }

  if (type === 'drag-and-drop') {
    return (
      <label
        className="form-file-dropzone"
        data-drag={isDragOver || undefined}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        htmlFor={id}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          className="form-file-input"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <UploadIcon />
        <span className="form-file-dropzone-text">
          <strong>Click to upload</strong> or drag and drop
        </span>
      </label>
    );
  }

  return (
    <div className="form-file" data-type={type}>
      <input
        ref={inputRef}
        id={id}
        type="file"
        className="form-file-input"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <label className="form-file-button" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
