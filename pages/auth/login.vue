<template>
  <main class="n-stack-horizontal">
    <nord-stack style="max-width: 340px; margin: var(--n-space-xl) auto">
      <nord-banner shadow variant="warning">
        You’ve been signed out. Please sign in to continue.
      </nord-banner>
      <nord-card padding="l">
        <h1 slot="header">Sign in</h1>
        <form action="#" @submit.prevent="handleFormSubmit">
          <nord-stack>
            <div class="n-stack n-gap-s">
              <label class="n-label" for="input1">Email</label>
              <div class="n-caption n-hint">Default email &nbsp; <strong>emily.johnson@x.dummyjson.com</strong></div>
              <div class="n-input" :class="{'n-input-invalid': formErrors.email}">
                <input
                  v-model="formData.email"
                  type="email"
                  id="input1"
                  :aria-invalid="formErrors.email ? true : false"
                  aria-describedby="error1"
                  placeholder="user@example.com"
                  style="border: none; background: transparent; outline: none; display: block; width: 100%"
                />
              </div>
              <div v-if="formErrors.email" class="n-error" id="error3" role="alert">{{ formErrors.email }}</div>
            </div>
            <div class="n-stack n-gap-s">
              <label class="n-label" for="input2">Password</label>
              <div class="n-caption n-hint">Default password &nbsp; <strong>emilyspass</strong></div>
              <div class="n-input passwordWrapper" :class="{'n-input-invalid': formErrors.password}">
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="input2"
                  :aria-invalid="formData.password ? true : false"
                  aria-describedby="error2"
                  placeholder="••••••••"
                  style="border: none; background: transparent; outline: none; display: block; width: 100%"
                />
                <nord-icon size="s" :name="showPassword ? 'interface-edit-on' : 'interface-edit-off'" class="passwordIcon" @click="togglePasswordVisibility" />
              </div>
              <div v-if="formErrors.password" class="n-error" id="error4" role="alert">{{ formErrors.password }}</div>
            </div>
            <nord-button type="submit" expand variant="primary">Sign in</nord-button>
          </nord-stack>
        </form>
      </nord-card>
      <nord-card class="n-align-center">
        New here? <a href="#">Create an account</a>.
      </nord-card>
    </nord-stack>
  </main>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { SignInValidationSchema } from '~/schemas/SignInValidationSchema.js'

// Define page meta
definePageMeta({
  layout: false,
});

// Form data and error state
const formData = ref({
  email: '',
  password: ''
});

const formErrors = ref({
  email: '',
  password: ''
});

const showPassword = ref(false)

const router = useRouter();

// Get the authentication store
const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

// Watchers for immediate validation
watch(() => formData.value.email, (newEmail) => {
  const emailValidation = SignInValidationSchema.shape.email.safeParse(newEmail);
  formErrors.value.email = emailValidation.success ? '' : emailValidation.error.issues[0].message;
});

watch(() => formData.value.password, (newPassword) => {
  const passwordValidation = SignInValidationSchema.shape.password.safeParse(newPassword);
  formErrors.value.password = passwordValidation.success ? '' : passwordValidation.error.issues[0].message;
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleFormSubmit = async () => {
  const validation = SignInValidationSchema.safeParse(formData.value);

  if (!validation.success) {
    validation.error.issues.forEach((issue) => {
      formErrors.value[issue.path[0] as keyof typeof formErrors.value] = issue.message;
    });
  } else {
      // If validation passes, proceed with authentication
      await authenticateUser(formData.value);

      // Redirect to success page if authenticated
      if (authenticated.value) {
        router.push('/success');
      } else {
        alert('Authentication failed');
      }
  }
};
</script>

<style scoped>
.passwordWrapper {
  position: relative;
}

.passwordIcon {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>