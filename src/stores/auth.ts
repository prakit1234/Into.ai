import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: string
  email: string
  name: string
  picture: string
  token?: string
  expires_at?: number
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const isAuthenticated = ref(!!user.value)
  const loading = ref(false)

  const setUser = (userData: User | null) => {
    user.value = userData
    isAuthenticated.value = !!userData
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  }

  const clearUser = () => {
    setUser(null)
  }

  const isTokenExpired = () => {
    if (!user.value?.expires_at) return true
    return Date.now() >= user.value.expires_at
  }

  const handleLogout = async () => {
    try {
      loading.value = true
      clearUser()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      clearUser()
      router.push('/login')
    } finally {
      loading.value = false
    }
  }

  // Check token expiration on store initialization
  if (user.value && isTokenExpired()) {
    clearUser()
  }

  return {
    user,
    isAuthenticated,
    loading,
    handleLogout,
    setUser,
    clearUser,
    isTokenExpired
  }
}) 