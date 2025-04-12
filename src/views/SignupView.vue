<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
    <!-- Animated Background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 opacity-50">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(30,58,138,0.1))]"></div>
      </div>
      <!-- Floating Elements -->
      <div class="floating-shapes">
        <div class="shape-1"></div>
        <div class="shape-2"></div>
        <div class="shape-3"></div>
      </div>
    </div>

    <div class="max-w-md w-full relative z-10">
      <!-- Logo -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-flex items-center">
          <span class="text-3xl font-extralight text-white tracking-wider">Into.AI</span>
        </router-link>
        <h2 class="mt-6 text-3xl font-extralight text-white">Create your account</h2>
        <p class="mt-2 text-sm text-gray-400 font-light">
          Sign up to access AI-powered instructions
        </p>
      </div>

      <!-- Signup Card -->
      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-lg group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div class="relative py-8 px-6 bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-lg">
          <div class="space-y-6">
            <!-- Google One Tap Button -->
            <div id="googleButtonContainer" class="flex justify-center"></div>
          </div>
        </div>
      </div>

      <!-- Login Link -->
      <p class="mt-8 text-center text-sm text-gray-500 font-light">
        Already have an account?
        <router-link to="/login" class="font-light text-purple-400 hover:text-purple-300">
          Sign in
        </router-link>
      </p>

      <!-- Credits -->
      <p class="mt-6 text-center text-xs text-gray-600 font-light">
        Made with ♥ by <a href="https://github.com/prakit1234" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-400">Kaii</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const clientId = computed(() => import.meta.env.VITE_GOOGLE_CLIENT_ID)

onMounted(() => {
  // Load Google One Tap script
  if (!document.getElementById('google-script')) {
    const script = document.createElement('script')
    script.id = 'google-script'
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = initializeGoogleButton
    document.head.appendChild(script)
  } else {
    initializeGoogleButton()
  }
})

function initializeGoogleButton() {
  if (window.google?.accounts?.id) {
    // Render the Google button
    window.google.accounts.id.renderButton(
      document.getElementById('googleButtonContainer')!,
      { 
        theme: 'outline',
        size: 'large',
        text: 'signup_with',
        shape: 'rectangular',
        logo_alignment: 'center',
        width: 280
      }
    )
  }
}
</script>

<style scoped>
.floating-shapes div {
  position: absolute;
  background: linear-gradient(45deg, rgba(76,29,149,0.1), rgba(30,58,138,0.1));
  border-radius: 50%;
  filter: blur(40px);
  animation: float 20s infinite linear;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation-delay: 0s !important;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 40%;
  right: 10%;
  animation-delay: -5s !important;
}

.shape-3 {
  width: 150px;
  height: 150px;
  bottom: 10%;
  left: 30%;
  animation-delay: -10s !important;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -50px) rotate(120deg);
  }
  66% {
    transform: translate(-30px, 50px) rotate(240deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}
</style> 