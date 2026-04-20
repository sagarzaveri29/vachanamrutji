import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { UI_SERIF, UI_SANS } from '../theme/tokens';
import { useAuth } from '../lib/auth';
import { Icon } from '../components/Icon';

export function LoginScreen({ theme }) {
  const { signInWithCredential } = useAuth();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const clientMissing = !clientId || clientId === '' || clientId === 'YOUR_GOOGLE_CLIENT_ID';

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: theme.bg,
        color: theme.ink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: theme.page,
          border: `0.5px solid ${theme.rule}`,
          borderRadius: 14,
          boxShadow: theme.shadow,
          padding: '48px 36px 40px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: theme.accentSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.accent,
            }}
          >
            <Icon name="lotus" size={28} strokeWidth={1.3} />
          </div>
        </div>

        <div
          style={{
            fontFamily: UI_SERIF,
            fontStyle: 'italic',
            fontSize: 30,
            color: theme.ink,
            marginBottom: 8,
            letterSpacing: 0.2,
          }}
        >
          Vachanamrut Ji
        </div>
        <div
          style={{
            fontFamily: UI_SANS,
            fontSize: 13,
            color: theme.inkMuted,
            marginBottom: 36,
            lineHeight: 1.5,
          }}
        >
          A quiet place to read, study, and return to
          <br />
          the words of Shrimad Rajchandra.
        </div>

        {clientMissing ? (
          <div
            style={{
              fontFamily: UI_SANS,
              fontSize: 12,
              color: theme.inkSoft,
              background: theme.accentSoft,
              border: `0.5px solid ${theme.rule}`,
              borderRadius: 8,
              padding: '12px 14px',
              textAlign: 'left',
              lineHeight: 1.5,
            }}
          >
            <strong>Set up Google Sign-In</strong>
            <br />
            Add your Google OAuth Client ID to a <code>.env</code> file at the project
            root:
            <br />
            <code style={{ display: 'block', marginTop: 6 }}>
              VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
            </code>
            <br />
            See <code>README.md</code> for details.
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={(resp) => signInWithCredential(resp.credential)}
              onError={() => console.error('Google sign-in failed')}
              theme={theme.id === 'dark' ? 'filled_black' : 'outline'}
              shape="pill"
              size="large"
              text="continue_with"
            />
          </div>
        )}

        <div
          style={{
            marginTop: 32,
            fontFamily: UI_SANS,
            fontSize: 11,
            color: theme.inkMuted,
            lineHeight: 1.5,
          }}
        >
          By continuing you agree that your Google name and email
          <br />
          are stored locally on this device to personalize the app.
        </div>
      </div>
    </div>
  );
}
