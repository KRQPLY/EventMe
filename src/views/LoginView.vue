<template>
  <div class="login-container">
    <div class="forms">
      <SignForm signup v-if="signType === 'signup'" />
      <SignForm v-else />
    </div>
    <div class="credit desktop">
      Image by
      <a
        target="_blank"
        href="https://pixabay.com/users/cocoparisienne-127419/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1843350"
        >Anja</a
      >
      from
      <a
        target="_blank"
        href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1843350"
        >Pixabay</a
      >
    </div>
  </div>
</template>

<script setup>
import SignForm from '../components/SignForm.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const signType = computed(() => {
  return router.currentRoute.value.name
})
</script>

<style lang="scss" scoped>
.login-container {
  padding-top: 10px;
  display: flex;
  justify-content: center;
  position: relative;
  background-image: url('@/assets/sign-background-sm.jpg');
  background-color: #cccccc;
  background-position: bottom left;
  background-repeat: no-repeat;
  background-size: cover;
  .credit {
    font-size: 8px;
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #fff;
    a {
      color: #fff;
    }
  }
}

@include media-xs {
  .login-container {
    padding: 80px 0;
    background-image: url('@/assets/sign-background-md.jpg');
  }
}
@include media-xs {
  .login-container {
    background-image: url('@/assets/sign-background-xl.jpg');
  }
}
</style>
