<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Made With
      <VIcon
        icon="mdi-heart-outline"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      By <a
        href="https://ictedu.co.kr/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >ICT 3 Team</a>
    </span>
    <!-- 👉 Footer: right content -->
  </div>
</template>
