<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Error Guide</h1>
        <p class="text-gray-600 mt-2">Common errors and how to resolve them</p>
      </header>

      <div class="space-y-6">
        <div v-for="(error, index) in commonErrors" :key="index" class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ error.title }}</h2>
          <div class="bg-red-50 text-red-700 p-4 rounded-md mb-4">
            <pre class="font-mono text-sm">{{ error.code }}</pre>
          </div>
          <div class="prose max-w-none">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Explanation</h3>
            <p class="text-gray-700 mb-4">{{ error.explanation }}</p>
            
            <h3 class="text-lg font-medium text-gray-900 mb-2">How to Fix</h3>
            <ul class="list-disc pl-5 text-gray-700">
              <li v-for="(step, stepIndex) in error.steps" :key="stepIndex">
                {{ step }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const commonErrors = [
  {
    title: 'API Key Not Found',
    code: 'Error: API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.',
    explanation: 'This error occurs when the application cannot find the Gemini API key in the environment variables.',
    steps: [
      'Create a .env file in the root directory if it doesn\'t exist',
      'Add VITE_GEMINI_API_KEY=your_api_key to the .env file',
      'Restart the development server',
      'Make sure the API key is valid and has the necessary permissions'
    ]
  },
  {
    title: 'Authentication Failed',
    code: 'Error: Failed to authenticate with Google. Invalid client configuration.',
    explanation: 'This error occurs when there are issues with Google OAuth configuration.',
    steps: [
      'Verify that VITE_GOOGLE_CLIENT_ID is set correctly in your .env file',
      'Ensure the OAuth consent screen is properly configured in Google Cloud Console',
      'Check if the authorized domains are correctly set up',
      'Clear browser cookies and try again'
    ]
  },
  {
    title: 'Rate Limit Exceeded',
    code: 'Error: Rate limit exceeded. Please try again later.',
    explanation: 'This happens when too many requests are made to the Gemini API in a short period.',
    steps: [
      'Wait a few minutes before trying again',
      'Consider implementing request throttling',
      'Check your API quota in the Google Cloud Console',
      'If needed, request a quota increase from Google'
    ]
  }
]
</script> 