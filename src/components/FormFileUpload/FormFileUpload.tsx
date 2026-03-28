import { useRef, useState, useId } from 'react';
import './FormFileUpload.css';

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
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="form-file-icon">
      <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
    </svg>
  );
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
      <div
        className="form-file-dropzone"
        data-drag={isDragOver || undefined}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        aria-label="Upload file — click or drag and drop"
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
      </div>
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
