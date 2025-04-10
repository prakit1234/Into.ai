import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export const useAuthStore = defineStore('auth', () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0()
  const loading = ref(false)

  const setUser = (userData: any) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }

  const login = async () => {
    try {
      loading.value = true
      await loginWithRedirect()
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      loading.value = false
    }
  }

  const handleLogout = async () => {
    try {
      loading.value = true
      await logout({ logoutParams: { returnTo: window.location.origin } })
      clearUser()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    login,
    handleLogout,
    setUser,
    clearUser
  }
}) 