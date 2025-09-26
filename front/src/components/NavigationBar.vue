<template>
  <nav class="navigation-bar" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <!-- Logo区域 -->
      <div class="logo">
        <router-link to="/">
          <img src="../assets/vue.svg" alt="Logo" class="logo-img">
          <span class="logo-text">Sangyie</span>
        </router-link>
      </div>

      <!-- 主导航菜单 -->
      <ul class="nav-menu" :class="{ 'active': isMenuOpen }">
        <NavItem
          v-for="item in navItems" 
          :key="item.id"
          :id="item.id"
          :text="item.text"
          :path="item.path"
          :anchor="item.anchor"
          :active-section="activeSection"
          @navigate="scrollToSection"
        />
      </ul>

      <!-- 移动端汉堡菜单 -->
      <button 
        class="hamburger-menu" 
        @click="toggleMenu"
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import NavItem from './NavItem.vue'

// 为全局scrollToSection方法声明类型
declare global {
  interface Window {
    scrollToSection?: (sectionId: string) => boolean | void;
    currentSectionId?: string; // 添加全局当前section ID
  }
}

interface NavItemType {
  id: number
  text: string
  path: string
  anchor?: string // 锚点属性，用于页面内导航
}

const navItems: NavItemType[] = [
  { id: 1, text: '首页', path: '/', anchor: 'home' },
  { id: 2, text: '关于公司', path: '/', anchor: 'about' },
  { id: 3, text: '目录', path: '/products', anchor: 'catalog' },
  { id: 4, text: '服务', path: '/', anchor: 'services' },
  { id: 5, text: '合作伙伴', path: '/', anchor: 'partners' },
  { id: 6, text: '客户', path: '/', anchor: 'clients' },
  { id: 7, text: '联系方式', path: '/', anchor: 'contact' }
]

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const activeSection = ref('')
let sectionChangeListener: EventListener | null = null
let currentSectionCheckInterval: number | null = null

// 处理页面滚动事件 - 仅用于更新导航栏样式
const handleScroll = () => {
  // 检测滚动位置，更新导航栏样式
  isScrolled.value = window.scrollY > 50
}

// 监听全局currentSectionId变化
const monitorCurrentSectionId = () => {
  // 初始化activeSection
  if (window.currentSectionId) {
    activeSection.value = window.currentSectionId
  } else if (navItems.length > 0 && navItems[0].anchor) {
    // 默认选中第一个
    activeSection.value = navItems[0].anchor
  }
  
  // 创建一个定时器，定期检查全局currentSectionId是否变化
  currentSectionCheckInterval = window.setInterval(() => {
    if (window.currentSectionId && activeSection.value !== window.currentSectionId) {
      activeSection.value = window.currentSectionId
    }
  }, 200) as unknown as number
}

// 监听自定义section-change事件
const setupSectionChangeListener = () => {
  // 创建事件监听器
  sectionChangeListener = ((event: CustomEvent) => {
    const { sectionId } = event.detail
    if (sectionId && activeSection.value !== sectionId) {
      activeSection.value = sectionId
    }
  }) as EventListener
  
  // 添加事件监听器
  window.addEventListener('section-change', sectionChangeListener)
}

// 平滑滚动到指定section
const scrollToSection = (sectionId?: string) => {
  // 关闭移动端菜单
  closeMobileMenu()
  
  // 如果没有指定section，则不处理
  if (!sectionId) return
  
  // 检查是否存在全局滚动方法（由test.vue提供）
  if (window.scrollToSection) {
    // 使用test.vue提供的滚动方法
    window.scrollToSection(sectionId)
    return
  }
  
  // 如果没有全局滚动方法，则使用默认滚动行为
  const targetElement = document.getElementById(sectionId)
  
  // 如果找到目标元素，则滚动到该位置
  if (targetElement) {
    // 计算目标位置，考虑导航栏高度
    const navHeight = 70
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight
    
    // 使用平滑滚动
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
    
    // 更新URL哈希值，但不触发滚动
    history.pushState(null, '', `#${sectionId}`)
    
    // 更新当前激活的section
    activeSection.value = sectionId
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMobileMenu = () => {
  isMenuOpen.value = false
}

// 处理URL哈希变化
const handleHashChange = () => {
  const hash = window.location.hash.substring(1)
  if (hash) {
    scrollToSection(hash)
  }
}

// 添加触摸事件支持
const initTouchEvents = () => {
  // 获取导航菜单元素
  const navMenu = document.querySelector('.nav-menu')
  if (!navMenu) return
  
  let touchStartX = 0
  let touchEndX = 0
  
  // 添加触摸开始事件
  navMenu.addEventListener('touchstart', (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX
  }, { passive: true })
  
  // 添加触摸结束事件
  navMenu.addEventListener('touchend', (e: TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX
    
    // 向左滑动关闭菜单
    if (touchEndX < touchStartX - 50 && isMenuOpen.value) {
      closeMobileMenu()
    }
  }, { passive: true })
}

onMounted(() => {
  // 添加滚动事件监听（仅用于更新导航栏样式）
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // 添加哈希变化事件监听
  window.addEventListener('hashchange', handleHashChange)
  
  // 设置section-change事件监听
  setupSectionChangeListener()
  
  // 监听全局currentSectionId变化
  monitorCurrentSectionId()
  
  // 初始化触摸事件
  initTouchEvents()
  
  // 如果URL中包含哈希值，则滚动到对应位置
  if (window.location.hash) {
    const hash = window.location.hash.substring(1)
    setTimeout(() => scrollToSection(hash), 700)
  }
})

onUnmounted(() => {
  // 移除事件监听
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('hashchange', handleHashChange)
  
  // 移除自定义事件监听器
  if (sectionChangeListener) {
    window.removeEventListener('section-change', sectionChangeListener)
  }
  
  // 清除定时器
  if (currentSectionCheckInterval !== null) {
    window.clearInterval(currentSectionCheckInterval)
  }
})
</script>

<style scoped lang="less">
@import '../style.less';

.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(var(--background-rgb), 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(var(--background-rgb), 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo {
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .logo-img {
    width: 32px;
    height: 32px;
    margin-right: 0.5rem;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: @primary-color;
  }
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(var(--background-rgb), 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    &.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
}



.hamburger-menu {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 4px;

  span {
    width: 25px;
    height: 3px;
    background: currentColor;
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
}

// 暗黑模式适配
@media (prefers-color-scheme: dark) {
  .navigation-bar {
    --background-rgb: 36, 36, 36;
  }
}

@media (prefers-color-scheme: light) {
  .navigation-bar {
    --background-rgb: 255, 255, 255;
  }
}
</style>