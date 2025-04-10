<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800">
    <!-- Header -->
    <header class="w-full border-b border-gray-800/50 backdrop-blur-sm bg-black/30">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-extralight text-white">AI Instructions</h1>
          <button
            @click="handleLogout"
            class="text-gray-400 hover:text-white font-light transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="w-full">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Query Input -->
        <div class="relative mb-8 group">
          <div class="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-lg group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <textarea
            v-model="query"
            class="relative w-full px-6 py-4 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 text-gray-100 text-lg font-light placeholder-gray-500"
            rows="4"
            placeholder="What would you like instructions for?"
          ></textarea>
        </div>

        <!-- Instruction Type Selection -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            v-for="(type, index) in instructionTypes"
            :key="index"
            class="relative group cursor-pointer"
            @click="selectedType = type.value"
          >
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-lg group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div
              class="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-lg"
              :class="{ 'border-purple-500/50': selectedType === type.value }"
            >
              <h3 class="text-xl font-light text-white mb-2">{{ type.title }}</h3>
              <p class="text-gray-400 font-light">{{ type.description }}</p>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <button
            @click="getInstructions"
            :disabled="loading"
            class="relative w-full py-4 px-6 bg-black text-white font-light rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Getting Instructions...
            </span>
            <span v-else>Get Instructions</span>
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-8">
          <div class="p-4 bg-red-900/20 backdrop-blur-sm border border-red-800/50 rounded-lg">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-400">Error</h3>
                <div class="mt-2 text-sm text-red-300">{{ error }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Response -->
        <div v-if="response" class="mt-8">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-lg blur-lg"></div>
            <div class="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-lg">
              <!-- Download Options -->
              <div class="flex justify-end gap-4 mb-6">
                <button
                  @click="downloadAsPDF"
                  class="flex items-center gap-2 px-4 py-2 text-sm font-light text-gray-300 bg-black/50 hover:bg-black/70 border border-gray-700/50 rounded-lg transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </button>
                <button
                  @click="downloadAsTXT"
                  class="flex items-center gap-2 px-4 py-2 text-sm font-light text-gray-300 bg-black/50 hover:bg-black/70 border border-gray-700/50 rounded-lg transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download TXT
                </button>
              </div>

              <div class="prose prose-invert max-w-none">
                <div v-html="marked(response)" class="text-gray-300 font-light"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { marked } from 'marked'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { generateResponse } from '../services/gemini'
import html2pdf from 'html2pdf.js'

const router = useRouter()
const authStore = useAuthStore()
const { user, handleLogout } = authStore

const query = ref('')
const response = ref('')
const loading = ref(false)
const error = ref('')
const selectedType = ref('basic')

const instructionTypes = [
  {
    title: 'Basic Instructions',
    value: 'basic',
    description: 'Simple, straightforward steps to get you started quickly.'
  },
  {
    title: 'Instructive Guide',
    value: 'instructive',
    description: 'Detailed steps with helpful links and resources.'
  },
  {
    title: 'Explanatory Guide',
    value: 'explanatory',
    description: 'Comprehensive guide with pros, cons, and detailed explanations.'
  }
]

async function getInstructions() {
  if (!query.value.trim()) {
    error.value = 'Please enter a question or task'
    return
  }

  loading.value = true
  error.value = ''
  response.value = ''

  try {
    const result = await generateResponse(query.value, selectedType.value)
    response.value = result
  } catch (e: any) {
    error.value = e.message || 'Failed to get instructions. Please try again.'
  } finally {
    loading.value = false
  }
}

function downloadAsPDF() {
  const element = document.querySelector('.prose')
  if (!element) return

  const opt = {
    margin: 1,
    filename: 'instructions.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }

  html2pdf().set(opt).from(element).save()
}

function downloadAsTXT() {
  const element = document.querySelector('.prose')
  if (!element) return

  const text = element.textContent || ''
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'instructions.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.prose :deep(h1) {
  @apply text-2xl font-extralight text-white mb-4;
}

.prose :deep(h2) {
  @apply text-xl font-extralight text-white mt-6 mb-3;
}

.prose :deep(h3) {
  @apply text-lg font-extralight text-white mt-4 mb-2;
}

.prose :deep(p) {
  @apply text-gray-300 mb-4 leading-relaxed font-light;
}

.prose :deep(ul), .prose :deep(ol) {
  @apply my-4 ml-6 text-gray-300 font-light;
}

.prose :deep(li) {
  @apply mb-2;
}

.prose :deep(a) {
  @apply text-purple-400 hover:text-purple-300 underline font-light;
}

.prose :deep(code) {
  @apply bg-gray-800/50 text-gray-200 px-1.5 py-0.5 rounded text-sm font-light;
}

.prose :deep(pre) {
  @apply bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg overflow-x-auto my-4;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-gray-700/50 pl-4 italic text-gray-400 my-4 font-light;
}
</style> 