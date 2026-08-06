import { useRef, useState } from 'react';

export default function ImageUpload({ value, onChange, label }) {
  const inputRef = useRef(null);
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  const isUrl = typeof value === 'string' && (value.startsWith('http') || value.startsWith('/') || value.startsWith('data:'));

  return (
    <div className="cm-image-upload">
      {label && <span className="cm-field-label">{label}</span>}
      <div className="cm-image-row">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{ display: 'none' }}
        />
        <input
          value={isUrl ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL…"
          className="cm-image-url"
        />
        <button type="button" className="cm-btn cm-upload-btn" onClick={() => inputRef.current?.click()}>
          Upload
        </button>
        {value && (
          <button
            type="button"
            className="cm-btn cm-clear-btn"
            onClick={() => onChange('')}
            title="Remove image"
          >
            ✕
          </button>
        )}
      </div>
      {error && <div className="cm-image-error">{error}</div>}
      {value && (
        <div className="cm-image-preview">
          <img
            src={value}
            alt=""
            className="cm-image-preview-img"
            onError={(e) => { e.target.style.opacity = '0.25'; }}
            onLoad={(e) => { e.target.style.opacity = '1'; }}
          />
        </div>
      )}
      <style>{`
        .cm-image-upload { margin-bottom: 6px; }
        .cm-image-row { display: flex; gap: 8px; align-items: center; }
        .cm-image-url {
          flex: 1;
          padding: 9px 12px;
          border: 1.4px solid #DBDFE6;
          border-radius: 8px;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          color: #111111;
          background: #FFFFFF;
          outline: none;
        }
        .cm-image-url:focus { border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .cm-upload-btn {
          background: linear-gradient(135deg, #2563EB, #1D4ED8);
          color: #FFFFFF;
          padding: 9px 16px;
          font-size: 12.5px;
          white-space: nowrap;
          box-shadow: 0 3px 10px rgba(37,99,235,0.25);
        }
        .cm-upload-btn:hover { transform: translateY(-1px); }
        .cm-clear-btn {
          background: #FEF2F2; color: #DC2626;
          border: 1px solid #FECACA;
          width: 38px; height: 38px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
        }
        .cm-image-error { color: #DC2626; font-size: 11.5px; margin-top: 6px; }
        .cm-image-preview {
          margin-top: 10px;
          border-radius: 10px;
          overflow: hidden;
          width: 180px;
          height: 116px;
          border: 1px solid #E5E9F2;
          background: #F8FAFC;
          display: flex; align-items: center; justify-content: center;
        }
        .cm-image-preview-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: opacity .3s;
        }
      `}</style>
    </div>
  );
}
