<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { googleOneTap } from 'vue3-google-login'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.clearUser()
  router.push('/login')
}

onMounted(() => {
  // Initialize Google One Tap if user is not authenticated
  if (!authStore.isAuthenticated) {
    googleOneTap()
      .then((response: any) => {
        const { credential } = response
        const decoded = JSON.parse(atob(credential.split('.')[1]))
        
        authStore.setUser({
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture
        })
      })
      .catch(() => {
        // Silently fail as this is just an enhancement
      })
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <span class="text-xl font-bold text-blue-600">Into.AI</span>
            </router-link>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[$route.path === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700']"
              >
                Home
              </router-link>
              <router-link
                to="/blog"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[$route.path === '/blog' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700']"
              >
                Blog
              </router-link>
              <router-link
                to="/errors"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[$route.path === '/errors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700']"
              >
                Error Guide
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <template v-if="authStore.isAuthenticated">
              <div class="flex items-center space-x-4">
                <img
                  :src="authStore.user?.picture"
                  :alt="authStore.user?.name"
                  class="h-8 w-8 rounded-full"
                />
                <span class="text-sm text-gray-700">{{ authStore.user?.name }}</span>
                <button
                  @click="handleLogout"
                  class="text-sm text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            </template>
            <template v-else>
              <router-link
                to="/login"
                class="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation -->
    <div class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="block pl-3 pr-4 py-2 text-base font-medium"
          :class="[$route.path === '/' ? 'text-blue-600 border-l-4 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700']"
        >
          Home
        </router-link>
        <router-link
          to="/blog"
          class="block pl-3 pr-4 py-2 text-base font-medium"
          :class="[$route.path === '/blog' ? 'text-blue-600 border-l-4 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700']"
        >
          Blog
        </router-link>
        <router-link
          to="/errors"
          class="block pl-3 pr-4 py-2 text-base font-medium"
          :class="[$route.path === '/errors' ? 'text-blue-600 border-l-4 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700']"
        >
          Error Guide
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="text-gray-500 text-sm">
            © 2024 Into.AI. All rights reserved.
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-700">
              Terms of Service
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-700">
              Contact
            </a>
          </div>
        </div>
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
