<template>
  <div class="social-media-bar">
    <div class="social-icons">
      <a v-for="item in socialItems" :key="item.id" :href="item.url" :title="item.name" target="_blank" rel="noopener noreferrer" class="social-link">
        <span class="social-icon">{{ item.icon }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SocialItem {
  id: number
  name: string
  url: string
  icon: string
}

const socialItems: SocialItem[] = [
  { id: 1, name: '微信', url: '#', icon: '💬' },
  { id: 2, name: '微博', url: '#', icon: '📱' },
  { id: 3, name: '抖音', url: '#', icon: '🎵' },
  { id: 4, name: '小红书', url: '#', icon: '📕' },
  { id: 5, name: 'B站', url: '#', icon: '📺' }
]
</script>

<style scoped>
.social-media-bar {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
}

.social-icons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 15px 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.social-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.social-icon {
  font-size: 18px;
}

/* 暗黑模式适配 */
@media (prefers-color-scheme: dark) {
  .social-icons {
    background: rgba(36, 36, 36, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .social-media-bar {
    left: 10px;
    bottom: 20px;
    top: auto;
    transform: none;
  }
  
  .social-icons {
    flex-direction: row;
    padding: 10px 15px;
    border-radius: 25px;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
  }
}
</style>