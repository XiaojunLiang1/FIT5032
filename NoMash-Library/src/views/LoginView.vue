<template>
    <!-- Login Form -->
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">Login</h1>
          <p class="text-center">
            If you hava an account, login in here
          </p>
        </div>
        <form @submit.prevent="submitForm">
            <div class="row mb-3 justify-content-center">
                <!-- username -->
                <div class="col-md-6">
                    <label for="username" class="form-label" >Username:</label>
                    <input 
                        type="text"
                        class="form-control"
                        id="username"
                        v-model="formData.username"
                    />
                </div>
            </div>
            <!-- password -->
            <div class="row mb-3 justify-content-center" >
                <div class="col-md-6">
                    <label for="password" class="form-label" >Password:</label>
                    <input 
                        type="text"
                        class="form-control"
                        id="password"
                        v-model="formData.password"
                    />
                </div>
            </div>
            
            <!-- Login button -->
            <div class="text-center">
                <button type="submit" class="btn btn-primary me-2">Login</button>
                <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
            <div v-if="errors.match" class="text-danger text-center">{{ errors.match }}</div>
        </form>

      </div>
    </div>
          

  </template>
  
  <script setup>
  import {ref} from 'vue'
  import {useRouter} from 'vue-router'
  
  const formData = ref({
    username: '',
    password: ''
  })

  const submittedCards = ref([])

  const submitForm = () => {
    validMatch(true)
    if (!errors.value.username && !errors.value.password && !errors.value.match) {
        submittedCards.value.push({ ...formData.value })
        clearForm()
    }
  }
  
  const clearForm = () => {
    formData.value = {
        username: '',
        password: ''
    }
  }

  const errors = ref({
    username: '',
    password: '',
    match: ''
  })

  const router = useRouter();

  const isLogged = ref(localStorage.getItem('isLogged') === 'true');

  const validMatch = () => {
    if(formData.value.username == "user" && formData.value.password == "123") {
        errors.value.match = null
        localStorage.setItem('isLogged', 'true')
        isLogged.value = true
        router.push('/about');
    } else {
        errors.value.match = "username and password does not match"
    }
  }
  


  </script>
  
<style scoped>
</style>