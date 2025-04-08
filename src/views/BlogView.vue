<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Into.AI Blog</h1>
        <p class="text-gray-600 mt-2">Insights, tutorials, and user experiences</p>
      </header>

      <!-- Create New Blog Post Button -->
      <div class="mb-6">
        <button 
          @click="showCreateForm = true" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Create New Blog Post
        </button>
      </div>

      <!-- Create Blog Post Form -->
      <div v-if="showCreateForm" class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ editingIndex !== null ? 'Edit Blog Post' : 'Create New Blog Post' }}</h2>
        <form @submit.prevent="createBlogPost">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              v-model="newPost.title" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          
          <div class="mb-4">
            <label for="author" class="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input 
              type="text" 
              id="author" 
              v-model="newPost.author" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          
          <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              id="date" 
              v-model="newPost.date" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input 
              type="text" 
              id="image" 
              v-model="newPost.image" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            >
          </div>
          
          <div class="mb-4">
            <label for="excerpt" class="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea 
              id="excerpt" 
              v-model="newPost.excerpt" 
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label>
            <textarea 
              id="content" 
              v-model="newPost.content" 
              rows="10"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              required
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <div 
                v-for="(tag, index) in newPost.tags" 
                :key="index" 
                class="flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1"
              >
                <span>{{ tag }}</span>
                <button 
                  type="button" 
                  @click="removeTag(index)" 
                  class="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex">
              <input 
                type="text" 
                v-model="newTag" 
                @keyup.enter="addTag"
                class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a tag and press Enter"
              >
              <button 
                type="button" 
                @click="addTag" 
                class="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              type="button" 
              @click="cancelEdit" 
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {{ editingIndex !== null ? 'Update Post' : 'Create Post' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Blog Posts List -->
      <div class="grid gap-6">
        <article v-for="(post, index) in blogPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="flex justify-between items-start p-6">
            <h2 class="text-xl font-semibold text-gray-900">{{ post.title }}</h2>
            <div class="flex space-x-2">
              <button 
                @click="editBlogPost(index)" 
                class="text-gray-500 hover:text-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button 
                @click="deleteBlogPost(index)" 
                class="text-gray-500 hover:text-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
          <div class="p-6">
            <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <span>{{ formatDate(post.date) }}</span>
              <span>•</span>
              <span>{{ post.author }}</span>
            </div>
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
      <div v-if="selectedPost" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
import { ref, reactive } from 'vue'
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

const showCreateForm = ref(false)
const editingIndex = ref<number | null>(null)
const selectedPost = ref<BlogPost | null>(null)
const newTag = ref('')

const newPost = reactive<Omit<BlogPost, 'id'>>({
  title: '',
  author: '',
  date: new Date().toISOString().split('T')[0],
  excerpt: '',
  content: '',
  image: '',
  tags: []
})

const blogPosts = ref<BlogPost[]>([
  {
    id: 1,
    title: 'Getting Started with Into.AI',
    author: 'AI Team',
    date: '2024-04-08',
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
    date: '2024-04-07',
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
])

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function addTag() {
  if (newTag.value.trim() && !newPost.tags.includes(newTag.value.trim())) {
    newPost.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

function removeTag(index: number) {
  newPost.tags.splice(index, 1)
}

function createBlogPost() {
  if (editingIndex.value !== null) {
    // Update existing post
    const updatedPost = { ...newPost, id: blogPosts.value[editingIndex.value].id }
    blogPosts.value[editingIndex.value] = updatedPost
    editingIndex.value = null
  } else {
    // Create new post
    const newId = Math.max(...blogPosts.value.map(post => post.id), 0) + 1
    blogPosts.value.push({ ...newPost, id: newId })
  }
  
  // Reset form
  newPost.title = ''
  newPost.author = ''
  newPost.date = new Date().toISOString().split('T')[0]
  newPost.excerpt = ''
  newPost.content = ''
  newPost.image = ''
  newPost.tags = []
  
  showCreateForm.value = false
}

function editBlogPost(index: number) {
  const post = blogPosts.value[index]
  newPost.title = post.title
  newPost.author = post.author
  newPost.date = post.date
  newPost.excerpt = post.excerpt
  newPost.content = post.content
  newPost.image = post.image || ''
  newPost.tags = [...post.tags]
  
  editingIndex.value = index
  showCreateForm.value = true
}

function deleteBlogPost(index: number) {
  if (confirm('Are you sure you want to delete this blog post?')) {
    blogPosts.value.splice(index, 1)
  }
}

function cancelEdit() {
  showCreateForm.value = false
  editingIndex.value = null
  newPost.title = ''
  newPost.author = ''
  newPost.date = new Date().toISOString().split('T')[0]
  newPost.excerpt = ''
  newPost.content = ''
  newPost.image = ''
  newPost.tags = []
}

function readMore(post: BlogPost) {
  selectedPost.value = post
}
</script>