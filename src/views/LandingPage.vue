<template>
  <div class="min-h-screen w-full">
    <!-- Navbar -->
    <nav class="w-full fixed top-0 z-50 border-b border-gray-800/50 backdrop-blur-sm bg-black/30">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-extralight text-white tracking-wider">Into.AI</router-link>
        </div>
        <div class="flex items-center space-x-6">
          <router-link to="/login" class="text-gray-300 hover:text-white font-light transition-colors">Login</router-link>
          <router-link to="/signup" class="px-4 py-2 border border-white/30 backdrop-blur-sm hover:bg-white/10 text-white font-light transition-all duration-200 rounded-sm">
            Sign Up
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="hero-section relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
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

      <!-- Content -->
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-16">
        <h1 class="text-6xl sm:text-7xl font-extralight mb-6 tracking-wider">
          AI-Powered Instructions
        </h1>
        <p class="text-xl sm:text-2xl font-extralight mb-12 max-w-2xl mx-auto text-gray-300">
          Get detailed, step-by-step guidance for any task using advanced artificial intelligence
        </p>
        <router-link
          to="/login"
          class="inline-block px-12 py-4 text-lg font-light border border-white/30 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 rounded-sm"
        >
          Get Started
        </router-link>
      </div>
    </div>

    <!-- About Section -->
    <div class="w-full py-24 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-extralight text-center mb-16 text-white">About Into.AI</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 class="text-2xl font-extralight mb-6 text-white">What is Into.AI?</h3>
            <p class="text-gray-400 font-light leading-relaxed mb-4">
              Into.AI is a revolutionary platform that harnesses the power of advanced artificial intelligence to provide detailed, step-by-step instructions for virtually any task or question.
            </p>
            <p class="text-gray-400 font-light leading-relaxed mb-4">
              Whether you're looking to learn a new skill, solve a complex problem, or simply need guidance on a specific task, our AI-powered system generates clear, concise, and customized instructions tailored to your unique requirements.
            </p>
            <p class="text-gray-400 font-light leading-relaxed">
              No more searching through countless websites or watching lengthy tutorials. Into.AI delivers exactly what you need, when you need it.
            </p>
          </div>
          <div>
            <h3 class="text-2xl font-extralight mb-6 text-white">Why Choose Into.AI?</h3>
            <ul class="text-gray-400 font-light space-y-4">
              <li class="flex items-start">
                <span class="text-purple-400 mr-2">✓</span>
                <span>Instant results powered by cutting-edge AI technology</span>
              </li>
              <li class="flex items-start">
                <span class="text-purple-400 mr-2">✓</span>
                <span>Customized instructions based on your specific needs</span>
              </li>
              <li class="flex items-start">
                <span class="text-purple-400 mr-2">✓</span>
                <span>Simple, intuitive interface that anyone can use</span>
              </li>
              <li class="flex items-start">
                <span class="text-purple-400 mr-2">✓</span>
                <span>Comprehensive coverage across countless topics and tasks</span>
              </li>
              <li class="flex items-start">
                <span class="text-purple-400 mr-2">✓</span>
                <span>Continuously improving and expanding capabilities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="w-full py-24 bg-black">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div class="text-center group">
            <h3 class="text-2xl font-extralight mb-4 text-white group-hover:text-purple-400 transition-colors">Instant Results</h3>
            <p class="text-gray-400 font-light">Get immediate, detailed instructions for any task you need help with.</p>
          </div>
          <div class="text-center group">
            <h3 class="text-2xl font-extralight mb-4 text-white group-hover:text-blue-400 transition-colors">AI-Powered</h3>
            <p class="text-gray-400 font-light">Leveraging advanced AI to provide accurate and relevant guidance.</p>
          </div>
          <div class="text-center group">
            <h3 class="text-2xl font-extralight mb-4 text-white group-hover:text-indigo-400 transition-colors">Any Task</h3>
            <p class="text-gray-400 font-light">From simple how-tos to complex procedures, we've got you covered.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div class="w-full py-24 bg-black">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-extralight text-center mb-16 text-white">How It Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center transform hover:scale-105 transition-transform duration-300">
            <div class="text-7xl font-thin text-gray-700 mb-4">1</div>
            <h3 class="text-xl font-extralight mb-2 text-white">Enter Your Task</h3>
            <p class="text-gray-400 font-light">Simply describe what you need help with</p>
          </div>
          <div class="text-center transform hover:scale-105 transition-transform duration-300">
            <div class="text-7xl font-thin text-gray-700 mb-4">2</div>
            <h3 class="text-xl font-extralight mb-2 text-white">AI Processing</h3>
            <p class="text-gray-400 font-light">Our AI analyzes and creates custom instructions</p>
          </div>
          <div class="text-center transform hover:scale-105 transition-transform duration-300">
            <div class="text-7xl font-thin text-gray-700 mb-4">3</div>
            <h3 class="text-xl font-extralight mb-2 text-white">Get Results</h3>
            <p class="text-gray-400 font-light">Receive clear, step-by-step guidance</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer with Credits -->
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

<script setup lang="ts">
// No additional script needed
</script>

<style scoped>
.hero-section {
  background: linear-gradient(to bottom right, #000000, #1a1a1a);
}

.floating-shapes div {
  position: absolute;
  background: linear-gradient(45deg, rgba(76,29,149,0.1), rgba(30,58,138,0.1));
  border-radius: 50%;
  filter: blur(40px);
  animation: float 20s infinite linear;
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: 10%;
  left: 10%;
  animation-delay: 0s !important;
}

.shape-2 {
  width: 300px;
  height: 300px;
  top: 50%;
  right: 10%;
  animation-delay: -5s !important;
}

.shape-3 {
  width: 200px;
  height: 200px;
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