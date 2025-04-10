import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Instruction {
  id: string
  query: string
  type: string
  content: string
  createdAt: string
  shared: boolean
}

export const useInstructionsStore = defineStore('instructions', () => {
  const instructions = ref<Instruction[]>(JSON.parse(localStorage.getItem('instructions') || '[]'))
  const loading = ref(false)

  function saveInstruction(query: string, type: string, content: string) {
    const newInstruction: Instruction = {
      id: crypto.randomUUID(),
      query,
      type,
      content,
      createdAt: new Date().toISOString(),
      shared: false
    }
    
    instructions.value.push(newInstruction)
    localStorage.setItem('instructions', JSON.stringify(instructions.value))
    return newInstruction
  }

  function deleteInstruction(id: string) {
    instructions.value = instructions.value.filter(inst => inst.id !== id)
    localStorage.setItem('instructions', JSON.stringify(instructions.value))
  }

  function toggleShare(id: string) {
    const instruction = instructions.value.find(inst => inst.id === id)
    if (instruction) {
      instruction.shared = !instruction.shared
      localStorage.setItem('instructions', JSON.stringify(instructions.value))
    }
  }

  function getSharedInstructions() {
    return instructions.value.filter(inst => inst.shared)
  }

  function getInstructionById(id: string) {
    return instructions.value.find(inst => inst.id === id)
  }

  return {
    instructions,
    loading,
    saveInstruction,
    deleteInstruction,
    toggleShare,
    getSharedInstructions,
    getInstructionById
  }
}) 