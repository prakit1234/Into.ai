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
        <h2 class="mt-6 text-3xl font-extralight text-white">Welcome back</h2>
        <p class="mt-2 text-sm text-gray-400 font-light">
          Sign in to access AI-powered instructions
        </p>
      </div>

      <!-- Login Card -->
      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-lg group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div class="relative py-8 px-6 bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-lg">
          <div class="space-y-6">
            <!-- Google Login Button -->
            <div>
              <GoogleLogin
                :callback="handleCallback"
                class="w-full"
              >
                <template v-slot="{ signIn }">
                  <button
                    @click="signIn"
                    type="button"
                    class="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 text-gray-200 border border-gray-700/50 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"
                  >
                    <svg class="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span class="text-sm font-light">Continue with Google</span>
                  </button>
                </template>
              </GoogleLogin>
            </div>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-700/50"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-black text-gray-500 font-light">Or continue with</span>
              </div>
            </div>

            <!-- Email/Password Form -->
            <form class="space-y-6" @submit.prevent="handleEmailLogin">
              <div>
                <label for="email" class="block text-sm font-light text-gray-400">
                  Email address
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    class="appearance-none block w-full px-3 py-2 bg-black/70 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 text-gray-300 font-light text-sm"
                  />
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-light text-gray-400">
                  Password
                </label>
                <div class="mt-1">
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                    class="appearance-none block w-full px-3 py-2 bg-black/70 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 text-gray-300 font-light text-sm"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    v-model="rememberMe"
                    type="checkbox"
                    class="h-4 w-4 text-purple-600 focus:ring-purple-500/50 border-gray-700 rounded bg-black/70"
                  />
                  <label for="remember-me" class="ml-2 block text-sm text-gray-400 font-light">
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <a href="#" class="font-light text-purple-400 hover:text-purple-300">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-md blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <button
                  type="submit"
                  :disabled="loading"
                  class="relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-light text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 transition-all duration-200"
                >
                  {{ loading ? 'Signing in...' : 'Sign in' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Sign Up Link -->
      <p class="mt-8 text-center text-sm text-gray-500 font-light">
        Not a member?
        <router-link to="/signup" class="font-light text-purple-400 hover:text-purple-300">
          Create an account
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { GoogleLogin } from 'vue3-google-login'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

const handleCallback = async (response: any) => {
  try {
    const { credential } = response
    const decoded = JSON.parse(atob(credential.split('.')[1]))
    
    authStore.setUser({
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture
    })
    
    router.push('/app')
  } catch (error) {
    console.error('Login error:', error)
  }
}

const handleEmailLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Implement email/password login here
    // For now, just simulate a login and redirect
    setTimeout(() => {
      authStore.setUser({
        id: '123',
        email: email.value,
        name: 'Test User',
        picture: ''
      })
      router.push('/app')
    }, 1000)
  } catch (e: any) {
    error.value = e.message || 'Failed to sign in'
  } finally {
    loading.value = false
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