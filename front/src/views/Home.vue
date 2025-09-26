<template>
  <div class="home">
    <div class="container">
    <section class="panel">1
      <h1>欢迎来到首页</h1>
    <p>这是导航栏示例项目的主页内容</p>
    </section>
    <CommonButton 
      to="/products" 
      variant="primary" 
      size="large"
      class="products-button"
    >
      查看产品
    </CommonButton>
    <section class="panel">2</section>
    <section class="panel">3</section>
    <section class="panel">4</section>
  </div>
    

    
  </div>
</template>

<script setup lang="ts">
import CommonButton from '../components/CommonButton.vue'
</script>

<style scoped>
.home {
  text-align: center;
  /* padding: 2rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

h1 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

p {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  max-width: 600px;
}

.products-button {
  margin-top: 1rem;
  animation: fadeInUp 0.6s ease-out;
}
/* 容器 */
    .container {
      display: flex;
      height: 100vh;
      width: 400vw; /* 4个页面宽度 */
    }

    /* 每一屏 */
    .panel {
      flex: 0 0 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 4rem;
      font-weight: bold;
      color: #fff;
    }

    .panel:nth-child(1) { background: #3498db; }
    .panel:nth-child(2) { background: #3498db; }
    .panel:nth-child(3) { background: #3498db; }
    .panel:nth-child(4) { background: #3498db; }
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
}
</style>