<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Into.AI Blog</h1>
        <p class="text-gray-600 mt-2">Insights, tutorials, and user experiences</p>
      </header>

      <div class="grid gap-6">
        <article v-for="post in blogPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
          <div class="p-6">
            <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <span>{{ post.date }}</span>
              <span>•</span>
              <span>{{ post.author }}</span>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ post.title }}</h2>
            <p class="text-gray-700 mb-4">{{ post.excerpt }}</p>
            <div class="flex items-center gap-2">
              <span v-for="tag in post.tags" :key="tag" class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {{ tag }}
              </span>
            </div>
            <button class="mt-4 text-blue-600 hover:text-blue-700 font-medium" @click="readMore(post)">
              Read more →
            </button>
          </div>
        </article>
      </div>

      <!-- Blog Post Modal -->
      <div v-if="selectedPost" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h2 class="text-2xl font-bold text-gray-900">{{ selectedPost.title }}</h2>
              <button @click="selectedPost = null" class="text-gray-500 hover:text-gray-700">
                <span class="sr-only">Close</span>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="prose max-w-none" v-html="marked(selectedPost.content)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { marked } from 'marked'

interface BlogPost {
  id: number
  title: string
  author: string
  date: string
  excerpt: string
  content: string
  image?: string
  tags: string[]
}

const selectedPost = ref<BlogPost | null>(null)

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Into.AI',
    author: 'AI Team',
    date: 'April 8, 2024',
    image: '/blog/getting-started.jpg',
    excerpt: 'Learn how to make the most of Into.AI\'s instruction generation capabilities.',
    content: `
# Getting Started with Into.AI

Into.AI is your AI-powered instruction assistant. Here's how to get the most out of it:

## Choosing the Right Instruction Type

1. **Basic Instructions**
   - Perfect for quick, straightforward tasks
   - Gives you the essential steps without extra details
   - Best when you're familiar with the subject matter

2. **Instructive Guide**
   - Includes step-by-step guidance
   - Provides relevant links and resources
   - Ideal for learning new concepts

3. **Explanatory Instructions**
   - Comprehensive coverage with multiple approaches
   - Includes best practices and common pitfalls
   - Perfect for complex tasks or deep learning

## Tips for Better Results

- Be specific in your questions
- Provide context when necessary
- Use relevant keywords
- Start with basic instructions and upgrade if needed

## Examples

Here are some example queries:
- "How to make a sandwich"
- "Setup a React development environment"
- "Train a machine learning model"

Try it out and let us know how it works for you!
    `,
    tags: ['tutorial', 'getting-started', 'tips']
  },
  {
    id: 2,
    title: 'Understanding AI-Generated Instructions',
    author: 'Tech Writer',
    date: 'April 7, 2024',
    image: '/blog/ai-instructions.jpg',
    excerpt: 'Deep dive into how AI generates instructions and how to interpret them effectively.',
    content: `
# Understanding AI-Generated Instructions

AI-generated instructions are becoming increasingly sophisticated. Here's what you need to know:

## How It Works

The AI processes your query through multiple stages:
1. Understanding the context
2. Identifying key requirements
3. Generating appropriate instructions
4. Formatting for clarity

## Benefits

- Consistent quality
- Available 24/7
- Adaptable to different expertise levels
- Continuously improving

## Best Practices

- Review instructions before following them
- Provide feedback when possible
- Compare different instruction types
- Use the error guide when needed

Keep learning and exploring!
    `,
    tags: ['AI', 'technology', 'learning']
  }
]

function readMore(post: BlogPost) {
  selectedPost.value = post
}
</script> 