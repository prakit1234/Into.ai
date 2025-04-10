import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const isAuthenticated = ref(!!user.value)
  const loading = ref(false)

  async function login() {
    try {
      loading.value = true
      
      // Initialize Google OAuth client
      const client = google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        callback: async (response: any) => {
          if (response.access_token) {
            // Get user info using the access token
            const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                Authorization: `Bearer ${response.access_token}`
              }
            }).then(res => res.json())

            // Set user data
            const userData = {
              id: userInfo.sub,
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              token: response.access_token
            }
            
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(userData))
    user.value = userData
    isAuthenticated.value = true
            router.push('/app')
          }
        }
      })

      // Request access token
      client.requestAccessToken()
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      loading.value = false
    }
  }

  async function handleLogout() {
    try {
      loading.value = true
      // Revoke the access token
      if (google.accounts.oauth2 && user.value?.token) {
        google.accounts.oauth2.revoke(user.value.token, () => {
          console.log('Access token revoked')
        })
      }
      // Clear user data
      localStorage.removeItem('user')
    user.value = null
    isAuthenticated.value = false
      // Redirect to login page
      router.push('/login')
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
    handleLogout
  }
}) 