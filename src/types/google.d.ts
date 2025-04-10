interface CredentialResponse {
  credential: string;
  select_by: string;
  client_id: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser: string;
  prompt: string;
}

interface GoogleOAuthConfig {
  client_id: string;
  scope?: string;
  callback?: (response: TokenResponse) => void;
}

interface GoogleIdentityConfig {
  client_id: string;
  callback: (response: CredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface GoogleAccounts {
  id: {
    initialize: (config: GoogleIdentityConfig) => void;
    prompt: (moment?: { moment: string }) => void;
    renderButton: (parent: HTMLElement, options: object) => void;
    disableAutoSelect: () => void;
  };
  oauth2: {
    initTokenClient: (config: GoogleOAuthConfig) => {
      requestAccessToken: () => void;
    };
    hasGrantedAllScopes: (token: string, ...scopes: string[]) => boolean;
    revoke: (token: string, callback?: () => void) => void;
  };
}

declare global {
  interface Window {
    google?: {
      accounts: GoogleAccounts;
    };
  }
} 