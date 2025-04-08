# Into.AI - AI-Powered Instruction Assistant

Into.AI is an open-source intelligent instruction generation platform that uses Google's Gemini AI to provide detailed, customized instructions for any task. The application offers three levels of instruction detail to suit different user needs.

## Features

- **Three Instruction Variants:**
  - Basic: Quick, essential instructions
  - Instructive: Detailed steps with relevant links
  - Explanatory: Comprehensive guides with alternatives and best practices

- **Google Authentication:** Secure login using Google OAuth
- **Blog Section:** Insights and tutorials about using the platform
- **Error Guide:** Comprehensive troubleshooting documentation

## Prerequisites

- Node.js 16.x or higher
- Google Cloud Platform account
- Gemini API access

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/into.ai.git
   cd into.ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your:
   - Google OAuth Client ID
   - Gemini API Key

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following content:

```
# Google OAuth Client ID (required for authentication)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Gemini API Key (required for AI functionality)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Analytics ID
VITE_ANALYTICS_ID=your_analytics_id_here
```

Replace the placeholder values with your actual API keys and credentials.

## Configuration

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google OAuth API
4. Configure the OAuth consent screen
5. Create OAuth 2.0 credentials
6. Add your application's domain to the authorized origins
7. Copy the Client ID to your `.env` file

### Gemini API Setup

1. Visit [AI Studio](https://aistudio.google.com)
2. Create a new API key
3. Copy the API key to your `.env` file

## Usage

1. Visit the application in your browser
2. Sign in with your Google account
3. Select the instruction type you need
4. Enter your question or task
5. Receive AI-generated instructions

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

This is an open-source project. Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
