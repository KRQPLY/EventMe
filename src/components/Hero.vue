<template>
  <div class="hero" :class="content.img">
    <span class="neon-text">{{ content.title }}</span>
    <div class="credit" v-if="!noCredit">
      Image by
      <a :href="content.url" target="_blank">{{ content.name }}</a>
      from
      <a
        href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1867754"
        target="_blank"
        >Pixabay</a
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: String,
  noCredit: {
    type: Boolean,
    default: false
  }
})

const content = {}

if (props.type === 'findEvents') {
  content.title = 'find events'
  content.url =
    'https://pixabay.com/users/stocksnap-894430/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2616946'
  content.name = 'StockSnap'
  content.img = 'find-events'
}
if (props.type === 'myEvents') {
  content.title = 'my events'
  content.url =
    'https://pixabay.com/users/mariya_m-12752456/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7637669'
  content.name = 'Mariya Muschard'
  content.img = 'my-events'
}
if (props.type === 'friends') {
  content.title = 'friends'
  content.url =
    'https://pixabay.com/users/sasint-3639875/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1807524'
  content.name = 'Sasin Tipchai'
  content.img = 'friends'
}
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #cccccc;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
  width: 100%;
  font-size: 45px;
  padding-bottom: 40px;
  &.my-events {
    background-image: url('@/assets/my-background-sm.jpg');
  }
  &.find-events {
    background-image: url('@/assets/find-background-sm.jpg');
  }
  &.friends {
    background-image: url('@/assets/friends-background-sm.jpg');
  }
  .credit {
    display: none;
  }
}

@include media-xs {
  .hero {
    height: 400px;
    font-size: 70px;
    &.my-events {
      background-image: url('@/assets/my-background-md.jpg');
    }
    &.find-events {
      background-image: url('@/assets/find-background-md.jpg');
    }
    &.friends {
      background-position: center;
      background-image: url('@/assets/friends-background-md.jpg');
    }
    .credit {
      display: block;
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
}
@include media-md {
  .hero {
    height: 500px;
    font-size: 100px;
  }
}
@include media-hd {
  .hero {
    height: 600px;
    &.my-events {
      background-image: url('@/assets/my-background-xl.jpg');
    }
    &.find-events {
      background-image: url('@/assets/find-background-xl.jpg');
    }
    &.friends {
      background-image: url('@/assets/friends-background-xl.jpg');
    }
  }
}
</style>
