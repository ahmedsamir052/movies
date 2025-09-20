<template>
  <div class="footer">
    <p>
      © 2025 Jason Ujma-Alvis. All rights reserved. <span>Cookie Policy</span>.
    </p>
    <p>Designed and built by me, data provided by <span>TMDb</span>.</p>
    <div class="icons">
      <i class="fa-brands fa-twitter"></i>
      <i class="fa-brands fa-github"></i>
      <i class="fa-brands fa-linkedin"></i>
      <i class="fa-regular fa-envelope"></i>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.footer {
  padding: 2rem 3rem;
}
p {
  color: #80868b;
  margin-bottom: 0;
  font-size: 14px;
}
span {
  border-bottom: 1px solid #80868b;
  cursor: pointer;
}
.icons {
  margin-top: 2rem;
}
.icons .fa-twitter,
.fa-github,
.fa-linkedin,
.fa-envelope {
  color: #585858;
  font-size: 20px;
  margin-right: 1.2rem;
}
@media screen and (max-width: 767px) {
  .footer {
    padding: 1.25rem 0.9rem;
    padding-bottom: 5rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
}
@media screen and (min-width: 768px) and (max-width: 1240px) {
  .footer {
    padding: 1.25rem 2.5rem;
    padding-bottom: 6rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
}
</style>
