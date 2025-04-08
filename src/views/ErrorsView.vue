<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Error Guide</h1>
        <p class="text-gray-600 mt-2">Common errors and how to resolve them</p>
      </header>

      <!-- Create New Error Post Button -->
      <div class="mb-6">
        <button 
          @click="showCreateForm = true" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Create New Error Post
        </button>
      </div>

      <!-- Create Error Post Form -->
      <div v-if="showCreateForm" class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Create New Error Post</h2>
        <form @submit.prevent="createErrorPost">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              v-model="newError.title" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          
          <div class="mb-4">
            <label for="code" class="block text-sm font-medium text-gray-700 mb-1">Error Code</label>
            <textarea 
              id="code" 
              v-model="newError.code" 
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              required
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label for="explanation" class="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
            <textarea 
              id="explanation" 
              v-model="newError.explanation" 
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Steps to Fix</label>
            <div v-for="(step, index) in newError.steps" :key="index" class="flex mb-2">
              <input 
                type="text" 
                v-model="newError.steps[index]" 
                class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
              <button 
                type="button" 
                @click="removeStep(index)" 
                class="ml-2 text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <button 
              type="button" 
              @click="addStep" 
              class="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add Step
            </button>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              type="button" 
              @click="showCreateForm = false" 
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>

      <!-- Error Posts List -->
      <div class="space-y-6">
        <div v-for="(error, index) in errorPosts" :key="index" class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start">
            <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ error.title }}</h2>
            <div class="flex space-x-2">
              <button 
                @click="editErrorPost(index)" 
                class="text-gray-500 hover:text-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button 
                @click="deleteErrorPost(index)" 
                class="text-gray-500 hover:text-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
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
import { ref, reactive } from 'vue'

interface ErrorPost {
  title: string
  code: string
  explanation: string
  steps: string[]
}

const showCreateForm = ref(false)
const editingIndex = ref<number | null>(null)

const newError = reactive<ErrorPost>({
  title: '',
  code: '',
  explanation: '',
  steps: ['']
})

const errorPosts = ref<ErrorPost[]>([
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
])

function addStep() {
  newError.steps.push('')
}

function removeStep(index: number) {
  newError.steps.splice(index, 1)
}

function createErrorPost() {
  if (editingIndex.value !== null) {
    // Update existing post
    errorPosts.value[editingIndex.value] = { ...newError }
    editingIndex.value = null
  } else {
    // Create new post
    errorPosts.value.push({ ...newError })
  }
  
  // Reset form
  newError.title = ''
  newError.code = ''
  newError.explanation = ''
  newError.steps = ['']
  
  showCreateForm.value = false
}

function editErrorPost(index: number) {
  const error = errorPosts.value[index]
  newError.title = error.title
  newError.code = error.code
  newError.explanation = error.explanation
  newError.steps = [...error.steps]
  
  editingIndex.value = index
  showCreateForm.value = true
}

function deleteErrorPost(index: number) {
  if (confirm('Are you sure you want to delete this error post?')) {
    errorPosts.value.splice(index, 1)
  }
}
</script> 