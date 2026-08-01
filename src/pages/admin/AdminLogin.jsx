import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

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
      setError('Please enter both email and password.');
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
    <div className="login-wrapper">
      {/* Ambient background grid & orbs */}
      <div className="login-bg-grid" />
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />

      <div className="login-card">
        <div className="login-card-glow" />

        <div className="login-header">
          <div className="logo-badge">
            <ShieldCheck size={28} />
          </div>
          <span className="login-eyebrow">EXECUTIVE_GOVERNANCE // CMS</span>
          <h1 className="login-title">Yousafzai Group CMS</h1>
          <p className="login-sub">Authorized Executive Administration Portal</p>
        </div>

        {displayError && (
          <div className="login-alert">
            <span>{displayError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">
              <Mail size={13} /> Corporate Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@yousafzaigroup.com"
              disabled={loginLoading}
              className="login-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              <Lock size={13} /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loginLoading}
              className="login-input"
            />
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className={`login-btn ${loginLoading ? 'loading' : ''}`}
          >
            <span>{loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="login-footer">
          <span>YOUSAFZAI EGGS TRADERS & POULTRY FARMS © 2026</span>
        </div>
      </div>

      <style>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #060e1a;
          color: #fff;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .login-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .login-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .login-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(200,162,74,0.12), transparent 70%);
          top: 15%; left: -150px;
        }

        .login-orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(74,140,220,0.08), transparent 70%);
          bottom: 15%; right: -150px;
        }

        .login-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 44px 36px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
          z-index: 2;
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-badge {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: rgba(200,162,74,0.12);
          border: 1px solid rgba(200,162,74,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8a24a;
          margin: 0 auto 20px;
          box-shadow: 0 0 30px rgba(200,162,74,0.15);
        }

        .login-eyebrow {
          font-family: monospace;
          font-size: 10px;
          color: #c8a24a;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 8px;
        }

        .login-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 8px;
          background: linear-gradient(135deg, #ffffff 0%, #c8a24a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-sub {
          font-size: 13.5px;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }

        .login-alert {
          background: rgba(248,113,113,0.1);
          border: 1px solid rgba(248,113,113,0.25);
          color: #f87171;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 24px;
          text-align: center;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
        }

        .login-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: #fff;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.3s, box-shadow 0.3s;
          box-sizing: border-box;
        }

        .login-input::placeholder {
          color: rgba(255,255,255,0.25);
        }

        .login-input:focus {
          outline: none;
          background: rgba(255,255,255,0.05);
          border-color: rgba(200,162,74,0.5);
          box-shadow: 0 0 0 3px rgba(200,162,74,0.12);
        }

        .login-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 15px 0;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #c8a24a 0%, #F2E7C9 100%);
          color: #060e1a;
          margin-top: 10px;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 10px 30px rgba(200,162,74,0.25);
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(200,162,74,0.4);
        }

        .login-btn.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-footer {
          text-align: center;
          margin-top: 32px;
          font-family: monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.1em;
        }
      `}</style>
    </div>
  );
}
