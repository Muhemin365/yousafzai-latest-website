import { useRef } from 'react';

export default function ImageUpload({ value, onChange, label }) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {label && <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>{label}</label>}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        <input
          value={typeof value === 'string' && value.startsWith('http') ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL..."
          style={{
            flex: 1, padding: '10px 14px', border: '1.4px solid #DBDFE6', borderRadius: 8,
            fontSize: 13, fontFamily: "'Inter',sans-serif", color: '#1B2230', background: '#FFFFFF',
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          style={{
            padding: '10px 16px', background: '#0B2545', color: '#fff', border: 'none',
            borderRadius: 8, fontSize: 12, cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap',
          }}
        >
          Upload
        </button>
      </div>
      {value && (
        <div style={{ marginTop: 8, borderRadius: 8, overflow: 'hidden', width: 140, height: 90, border: '1px solid #EEF1F5' }}>
          <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
      )}
    </div>
  );
}
