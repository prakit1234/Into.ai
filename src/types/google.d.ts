interface GoogleAccounts {
  id: {
    initialize: (config: {
      client_id: string;
      callback: (response: { credential: string }) => void;
    }) => void;
    prompt: () => void;
  };
  oauth2: {
    initTokenClient: (config: {
      client_id: string;
      scope: string;
      callback: (response: { access_token: string }) => void;
    }) => {
      requestAccessToken: () => void;
    };
    revoke: (token: string, callback: () => void) => void;
  };
}

declare global {
  interface Window {
    google: GoogleAccounts;
  }
} 