import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { defineStore } from 'pinia'

export const useOptionUpdateStore = defineStore('optionUpdate', () => {
  const processing = ref(false)
  
  // Helper function to convert data to FormData recursively
  function convertToFormData(data, formData = new FormData(), parentKey = '') {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key]
        const formKey = parentKey ? `${parentKey}[${key}]` : key

        if (value instanceof File) {
          // If it's a File, append it directly
          formData.append(formKey, value)
        } else if (value !== null && typeof value === 'object' && !(value instanceof Date)) {
          // If it's an object or array, recurse
          convertToFormData(value, formData, formKey)
        } else if (value !== null && value !== undefined) {
          // Otherwise, append the value as a string
          formData.append(formKey, value)
        }
      }
    }
    return formData
  }

  function submit(key, fData, files = []) {
    processing.value = true

    files?.forEach((property) => {
      if (!(fData[property] instanceof File)) {
        fData[property] = null
      }
    })

    // Convert data to FormData for file upload support
    const formData = convertToFormData(fData)

    router.post(route('admin.page-settings.update', key), formData, {
      onFinish: () => (processing.value = false),
      forceFormData: true
    })
  }

  return { processing, submit }
})
