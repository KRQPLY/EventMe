<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="16"
    height="16"
    fill="black"
  >
    <defs>
      <clipPath id="circular-border">
        <circle cx="8" cy="8" r="7" />
      </clipPath>
      <clipPath id="avoid-antialiasing-bugs">
        <rect width="100%" height="12" />
      </clipPath>
    </defs>

    <circle cx="8" cy="8" r="7" fill="white" clip-path="url(#avoid-antialiasing-bugs)" />
    <circle cx="8" cy="6" r="3" />
    <circle cx="8" cy="14" r="5" clip-path="url(#circular-border)" />
  </svg>
</template>

<script setup></script>

<style lang="scss" scoped></style>
