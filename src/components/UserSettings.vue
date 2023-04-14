<template>
  <div class="user-settings-container">
    <div class="settings">
      <div class="label">Settings</div>
      <Button filled danger radius="12% / 50%" @click="handleAccountDelete">Delete account</Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

async function handleAccountDelete() {
  await userStore.removeAccount()

  router.push({ name: 'signin' })
}
</script>

<style lang="scss" scoped>
.user-settings-container {
  padding: 0 10px;
  margin-top: 10px;

  .label {
    color: $color-contrast;
    font-size: 30px;
  }

  .settings {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@include media-xs {
  .user-settings-container {
    padding: 0 30px;
  }
}
@include media-sm {
  .user-settings-container {
    padding: 0 70px;
  }
}
@include media-md {
  .user-settings-container {
    padding: 0 150px;
  }
}
@include media-lg {
  .user-settings-container {
    padding: 0 250px;
  }
}
@include media-xl {
  .user-settings-container {
    padding: 0 350px;
  }
}
@include media-hd {
  .user-settings-container {
    padding: 0 450px;
  }
}
</style>
