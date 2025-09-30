<template>
  <section class="services">
    <div class="services-bg-pattern"></div>
    <div class="services-bg-gradient"></div>
    
    <div class="container">
      <!-- 左侧标题区域 -->
      <div class="services-left">
        <div class="title-container">
          <p class="subtitle">{{ subtitle }}</p>
          <h2 class="title">{{ title }}</h2>
          <div class="title-decoration"></div>
        </div>
        
        <div class="services-description">
          <p>我们提供全方位的工业解决方案，从设备供应到技术支持，满足您的各种需求。</p>
        </div>
        
        <NextButton 
          v-if="showNextButton" 
          @click="$emit('next')" 
          class="next-button"
        />
      </div>

      <!-- 右侧 Tab 切换区域 -->
      <div class="services-right">
        <!-- 标签导航 -->
        <div class="tabs-container">
          <ul class="tabs">
            <li
              v-for="(tab, index) in tabs"
              :key="index"
              :class="{ active: activeTab === index }"
              @click="selectTab(index)"
            >
              <div class="tab-inner">
                <span class="tab-num">{{ twoDigits(index + 1) }}</span>
                <span class="tab-title">{{ tab.title }}</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- 标签内容 - 使用GSAP控制动画 -->
        <div class="tab-content">
          <div class="tab-content-wrapper">
            <div v-for="(tab, index) in tabs" 
                 :key="index"
                 :class="['tab-content-inner', { 'active': activeTab === index }]">
              <div class="tab-image">
                <div class="image-container">
                  <img :src="tab.img" :alt="tab.title" />
                  <div class="image-overlay"></div>
                </div>
              </div>
              <div class="tab-text">
                <h3 v-html="tab.heading"></h3>
                <div class="content-wrapper" v-html="tab.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import NextButton from './NextButton.vue';
import gsap from 'gsap';

// 定义组件属性
defineProps<{
  subtitle: string;
  title: string;
  showNextButton?: boolean;
}>();

// 定义组件事件
defineEmits<{
  (e: 'next'): void;
}>();

// 服务选项卡数据
const tabs = [
  {
    title: "综合技术解决方案和工程",
    heading: "<strong>综合</strong> 技术解决方案和工程",
    img: "https://aftech.by/wp-content/uploads/2019/11/s1.jpg",
    content: `
      <p><strong>我公司组装、供应和调试以下设备：</strong></p>
      <ul>
        <li>接收牛奶和其他类型原材料的设备；</li>
        <li>原材料和成品流分配设备；</li>
        <li>CIP 清洗站；</li>
        <li>用于牛奶、奶油和乳清的初级加工和巴氏杀菌的设备。</li>
      </ul>
    `
  },
  {
    title: "设备、零部件和备件供应",
    heading: "设备、零部件和备件 <strong>供应</strong>",
    img: "https://aftech.by/wp-content/uploads/2019/11/s2.jpg",
    content: `
      <ul>
        <li>阀门、泵、自动化系统等流体传导设备；</li>
        <li>储罐清洗设备；</li>
        <li>分离设备；</li>
        <li>膜元件（ALFA LAVAL、KOCH）；</li>
        <li>测量设备和自动化工具（Siemens、Endress+Hauser 等）。</li>
      </ul>
    `
  },
  {
    title: "食品生产现代化",
    heading: "食品生产 <strong>现代化</strong>",
    img: "https://aftech.by/wp-content/uploads/2019/11/s3.jpg",
    content: `
      <p>我们实施的项目：</p>
      <ul>
        <li>与 MARBO 合作，对奶酪、乳制品设施进行现代化改造；</li>
        <li>使用 A-LIMA-BIS 膜技术对生产设施进行现代化改造。</li>
      </ul>
    `
  },
  {
    title: "审计与服务",
    heading: "<strong>审计</strong> 和服务维护",
    img: "https://aftech.by/wp-content/uploads/2019/11/s4.jpg",
    content: `
      <p>我们延长您的设备使用寿命，<strong>减少停机时间，并帮助优化运营成本。</strong></p>
    `
  }
];

// 当前激活的选项卡
const activeTab = ref(0);

// 选择选项卡
function selectTab(index: number): void {
  if (activeTab.value === index) return;
  
  // 创建动画时间线
  const tl = gsap.timeline();
  
  // 淡出当前内容
  tl.to(`.tab-content-inner:nth-child(${activeTab.value + 1})`, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out'
  });
  
  // 更新activeTab
  activeTab.value = index;
  
  // 淡入新内容
  tl.fromTo(`.tab-content-inner:nth-child(${index + 1})`, 
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 
    '<0.2' // 与淡出动画重叠0.2秒
  );
}

// 数字前补0
function twoDigits(n: { toString: () => string; }): string {
  return n.toString().padStart(2, "0");
}

// 组件挂载后的动画
onMounted(() => {
  // 标题动画
  gsap.from('.title-container', {
    opacity: 0,
    x: -50,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  // 选项卡动画
  gsap.from('.tabs li', {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.5,
    delay: 0.3
  });
  
  // 内容动画
  gsap.from('.tab-content-inner', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.6
  });
});
</script>

<style scoped>
/* 主容器样式 */
.services {
  width: 100%;
  height: 100%;
  background: #0c111a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 背景装饰元素 */
/* .services-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.5;
  z-index: 1;
}

.services-bg-gradient {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 70%;
  height: 200%;
  background: radial-gradient(ellipse at center, rgba(241, 138, 0, 0.15) 0%, rgba(12, 17, 26, 0) 70%);
  z-index: 1;
  transform: rotate(-30deg);
} */

/* 主内容容器 */
.container {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  margin: 0 auto;
  padding: 0 60px;
  color: #fff;
  max-width: 1400px;
  gap: 60px;
}

/* 左侧内容区域 */
.services-left {
  flex: 1;
  max-width: 380px;
}

.title-container {
  position: relative;
  margin-bottom: 40px;
}

.subtitle {
  color: #f18a00;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #b0b0b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-decoration {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #f18a00, rgba(241, 138, 0, 0.3));
  margin-bottom: 30px;
}

.services-description {
  margin-bottom: 40px;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.next-button {
  margin-top: 30px;
}

/* 右侧内容区域 */
.services-right {
  flex: 2;
  display: flex;
  flex-direction: column;
}

/* 标签导航 */
.tabs-container {
  margin-bottom: 40px;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.tabs-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.tabs {
  display: flex;
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tabs li {
  padding: 0;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-inner {
  display: flex;
  align-items: center;
  padding: 15px 25px;
  background: rgba(28, 34, 47, 0.7);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.tabs li:hover .tab-inner {
  background: rgba(241, 138, 0, 0.2);
  transform: translateY(-3px);
}

.tabs li.active .tab-inner {
  background: linear-gradient(135deg, #f18a00, #e57b00);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(241, 138, 0, 0.2);
  transform: translateY(-3px);
}

.tab-num {
  font-size: 16px;
  font-weight: 700;
  margin-right: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.tabs li.active .tab-num {
  color: #fff;
}

.tab-title {
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.tabs li.active .tab-title {
  color: #fff;
}

/* 标签内容 */
.tab-content {
  position: relative;
  min-height: 350px;
}

.tab-content-inner {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.tab-image {
  flex: 1;
}

.image-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.image-container img {
  width: 100%;
  display: block;
  border-radius: 12px;
  transition: transform 0.5s ease;
}

.image-container:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(12, 17, 26, 0) 0%, rgba(12, 17, 26, 0.8) 100%);
  pointer-events: none;
}

.tab-text {
  flex: 1;
  padding: 20px 0;
}

.tab-text h3 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #fff;
  position: relative;
  padding-bottom: 15px;
}

.tab-text h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: #f18a00;
}

.tab-text h3 strong {
  color: #f18a00;
}

.content-wrapper {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  line-height: 1.7;
}

.content-wrapper p {
  margin-bottom: 20px;
}

.content-wrapper ul {
  padding-left: 20px;
  margin-bottom: 20px;
}

.content-wrapper li {
  margin-bottom: 12px;
  position: relative;
  padding-left: 5px;
}

.content-wrapper li::before {
  content: '•';
  color: #f18a00;
  font-weight: bold;
  display: inline-block;
  margin-right: 10px;
}

.content-wrapper strong {
  color: #fff;
  font-weight: 600;
}

/* 标签内容样式 */
.tab-content-wrapper {
  position: relative;
  min-height: 400px;
}

.tab-content {
  position: relative;
  min-height: 400px;
  overflow: hidden;
}

.tab-content-inner {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: none; /* 禁用CSS过渡，由GSAP控制 */
}

.tab-content-inner.active {
  position: relative;
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .container {
    padding: 0 40px;
  }
  
  .tab-content-inner {
    flex-direction: column;
  }
  
  .tab-image {
    margin-bottom: 30px;
  }
}

@media (max-width: 992px) {
  .container {
    flex-direction: column;
    padding: 40px;
    gap: 40px;
  }
  
  .services-left {
    max-width: 100%;
  }
  
  .title {
    font-size: 40px;
  }
}

@media (max-width: 768px) {
  .tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 10px;
    scroll-snap-type: x mandatory;
  }
  
  .tabs li {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }
  
  .tab-inner {
    padding: 12px 20px;
  }
  
  .tab-title {
    font-size: 14px;
  }
  
  .tab-text h3 {
    font-size: 24px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 30px 20px;
  }
  
  .title {
    font-size: 32px;
  }
  
  .tab-inner {
    padding: 10px 15px;
  }
  
  .tab-num {
    margin-right: 8px;
    font-size: 14px;
  }
  
  .tab-title {
    font-size: 13px;
  }
}
</style>
