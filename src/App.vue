<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.clearUser()
  router.push('/login')
}

onMounted(() => {
  // Initialize Google One Tap if user is not authenticated
  if (!authStore.isAuthenticated) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (response: any) => {
        const { credential } = response
        const decoded = JSON.parse(atob(credential.split('.')[1]))
        
        authStore.setUser({
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
          token: credential
        })
        
        // Redirect to app page after successful authentication
        router.push('/app')
      }
    })
    
    window.google.accounts.id.prompt()
  }
})
</script>

<template>
  <div class="min-h-screen w-full">
    <!-- Navigation -->
    <nav class="w-full fixed top-0 z-50 border-b border-gray-800/50 backdrop-blur-sm bg-black/30">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-extralight text-white tracking-wider">Into.AI</router-link>
        </div>
        <div class="flex items-center space-x-6">
          <template v-if="authStore.isAuthenticated">
            <div class="flex items-center space-x-4">
              <img
                v-if="authStore.user?.picture"
                :src="authStore.user.picture"
                :alt="authStore.user.name"
                class="w-8 h-8 rounded-full"
              />
              <span class="text-gray-300 font-light">{{ authStore.user?.name }}</span>
              <button
                @click="handleLogout"
                class="text-gray-400 hover:text-white font-light transition-colors"
              >
                Logout
              </button>
            </div>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="text-gray-300 hover:text-white font-light transition-colors"
            >
              Login
            </router-link>
          </template>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="w-full py-12 bg-black border-t border-gray-800/50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-400 font-light mb-4">
          Made with ♥ by Kaii
        </p>
        <a 
          href="https://github.com/prakit1234" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center text-gray-400 hover:text-white transition-colors font-light"
        >
          <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
          github.com/prakit1234
        </a>
        <p class="text-gray-600 font-light text-sm mt-6">
            © 2024 Into.AI. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.prose {
  max-width: none;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
