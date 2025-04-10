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

const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
].join(' ')

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const isAuthenticated = ref(!!user.value)
  const loading = ref(false)

  function loadGoogleScript() {
    return new Promise<void>((resolve) => {
      if (window.google?.accounts) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      document.head.appendChild(script)
    })
  }

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

  const login = async () => {
    try {
      loading.value = true
      
      // Ensure Google OAuth is loaded
      await loadGoogleScript()

      if (!window.google?.accounts) {
        throw new Error('Google OAuth not loaded')
      }

      // Initialize Google OAuth client
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: async (response: TokenResponse) => {
          if (response.access_token) {
            // Get user info using the access token
            const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                Authorization: `Bearer ${response.access_token}`
              }
            }).then(res => res.json())

            // Calculate token expiration
            const expires_at = Date.now() + (response.expires_in * 1000)

            // Set user data
            const userData = {
              id: userInfo.sub,
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              token: response.access_token,
              expires_at
            }
            
            setUser(userData)
            router.push('/app')
          }
        }
      })

      // Request access token
      client.requestAccessToken()
    } catch (error) {
      console.error('Login error:', error)
      clearUser()
    } finally {
      loading.value = false
    }
  }

  const handleLogout = async () => {
    try {
      loading.value = true
      // Ensure Google OAuth is loaded before trying to revoke
      if (user.value?.token) {
        await loadGoogleScript()
        if (window.google?.accounts?.oauth2) {
          window.google.accounts.oauth2.revoke(user.value.token, () => {
            console.log('Access token revoked')
          })
        }
      }
      clearUser()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Clear user data even if revoke fails
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
    login,
    handleLogout,
    setUser,
    clearUser,
    isTokenExpired
  }
}) 