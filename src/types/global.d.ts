interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
  client_id: string;
}

interface GoogleButtonOptions {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: number;
  locale?: string;
}

interface GoogleOneTapConfig {
  client_id: string;
  auto_select?: boolean;
  callback: (response: GoogleCredentialResponse) => void;
  login_uri?: string;
  cancel_on_tap_outside?: boolean;
  prompt_parent_id?: string;
  nonce?: string;
  context?: string;
  state_cookie_domain?: string;
  ux_mode?: 'popup' | 'redirect';
  allowed_parent_origin?: string | string[];
  intermediate_iframe_close_callback?: () => void;
}

declare global {
  interface Window {
    handleCredentialResponse?: (response: GoogleCredentialResponse) => void;
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleOneTapConfig) => void;
          prompt: (momentListener?: (moment: { moment: string }) => void) => void;
          renderButton: (parent: HTMLElement, options?: GoogleButtonOptions) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
} 