import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function AdminLogin() {
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loginLoading = useAuthStore((s) => s.loginLoading);
  const loginError = useAuthStore((s) => s.loginError);
  const clearLoginError = useAuthStore((s) => s.clearLoginError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    clearLoginError();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const result = await login(email, password);
    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  const displayError = error || loginError;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0B2545' }}>
      <div style={{ background: '#fff', borderRadius: 32, padding: 48, width: '100%', maxWidth: 420, boxShadow: '0 28px 70px rgba(11,37,69,0.16)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(145deg,#0B2545,#123A6B)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#F1E4C3" strokeWidth="1.6" width="28" height="28">
              <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: '#0B2545', margin: 0 }}>Admin Login</h1>
          <p style={{ fontSize: 13, color: '#707888', marginTop: 6 }}>Yousafzai Group CMS</p>
        </div>
        {displayError && <div style={{ background: '#FEF2F2', color: '#B91C1C', padding: '10px 14px', borderRadius: 9, fontSize: 13, marginBottom: 20 }}>{displayError}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#0B2545', marginBottom: 8 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@yousafzaigroup.com" disabled={loginLoading} style={{ width: '100%', padding: '13px 16px', border: '1.4px solid #DBDFE6', borderRadius: 9, fontSize: 13.5, fontFamily: "'Inter',sans-serif", color: '#1B2230', background: '#FFFFFF' }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#0B2545', marginBottom: 8 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" disabled={loginLoading} style={{ width: '100%', padding: '13px 16px', border: '1.4px solid #DBDFE6', borderRadius: 9, fontSize: 13.5, fontFamily: "'Inter',sans-serif", color: '#1B2230', background: '#FFFFFF' }} />
          </div>
          <button type="submit" disabled={loginLoading} style={{ width: '100%', padding: '14px 0', background: '#0B2545', color: '#fff', border: 'none', borderRadius: 9, fontWeight: 600, fontSize: 14, cursor: loginLoading ? 'not-allowed' : 'pointer', opacity: loginLoading ? 0.7 : 1 }}>
            {loginLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
