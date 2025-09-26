<template>
  <div class="viewport">
    <PanelSlider 
      ref="sliderRef"
      v-model:currentIndex="currentIndex"
      @animation-complete="onAnimationComplete"
    >
      <Panel 
        v-for="(panel, i) in allPanels" 
        :key="i" 
        :id="panel.id"
      >
        <HomePanel 
          v-if="panel.id === 'home'" 
          title="Sangyie" 
          description="工业五金制造商" 
        />
        
        <AboutPanel 
          v-else-if="panel.id === 'about'" 
          subtitle="一些事实" 
          title="关于公司" 
          :facts="facts"
          :showNextButton="i < allPanels.length - 1"
          @next="goTo(i + 1)"
        />
        
        <GenericPanel 
          v-else 
          :title="panel.text"
        >
          <p>{{ panel.text }}的内容将在这里显示</p>
        </GenericPanel>
      </Panel>
    </PanelSlider>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import gsap from 'gsap';
import Observer from 'gsap/Observer';
import { PanelInfo, Fact } from './PanelTypes';
import PanelSlider from './PanelSlider.vue';
import Panel from './Panel.vue';
import HomePanel from './HomePanel.vue';
import AboutPanel from './AboutPanel.vue';
import GenericPanel from './GenericPanel.vue';

gsap.registerPlugin(Observer);

// 首页panel
const homePanel: PanelInfo = { id: "home", text: "Sangyie" };

// 内容panels
const panels: PanelInfo[] = [
  { id: "about", text: "关于公司" },
  { id: "catalog", text: "目录" },
  { id: "services", text: "服务" },
  { id: "partners", text: "合作伙伴" },
  { id: "clients", text: "客户" },
  { id: "contact", text: "联系方式" }
];

// 公司事实数据
const facts: Fact[] = [
  { id: "01", icon: "icon-laurel", text: "10年食品行业设备供应经验" },
  { id: "02", icon: "icon-partner", text: "我们的合作伙伴是全球领先的公司" },
  { id: "03", icon: "icon-flag", text: "阿法拉伐在白俄罗斯的唯一总代理商合作伙伴" },
  { id: "04", icon: "icon-team", text: "内部工程师团队" },
  { id: "05", icon: "icon-idea", text: "新的服务模式" },
  { id: "06", icon: "icon-warehouse", text: "常设备件仓库" }
];

// 合并所有panels，首页放在第一位
const allPanels = [homePanel, ...panels];
const currentIndex = ref(0);
const isAnimating = ref(false);
const LOCK_MS = 400;
const sliderRef = ref(null);

// 根据id查找对应的panel索引
function findPanelIndexById(id) {
  return allPanels.findIndex(panel => panel.id === id);
}

// 根据索引获取panel的id
function getPanelIdByIndex(index) {
  if (index >= 0 && index < allPanels.length) {
    return allPanels[index].id;
  }
  return null;
}

// 创建一个自定义事件，用于通知导航栏当前活动的section
function notifyActiveSectionChange(sectionId) {
  // 更新全局currentSectionId变量
  window.currentSectionId = sectionId;

  // 创建并分发自定义事件
  const event = new CustomEvent('section-change', {
    detail: { sectionId }
  });
  window.dispatchEvent(event);
}

// 滚动到指定索引的panel
function goTo(index) {
  if (isAnimating.value) return;
  
  const targetIndex = Math.max(0, Math.min(index, allPanels.length - 1));
  if (targetIndex === currentIndex.value) return;
  
  isAnimating.value = true;
  sliderRef.value?.slideTo(targetIndex);
}

// 动画完成后的回调
function onAnimationComplete() {
  const panelId = getPanelIdByIndex(currentIndex.value);
  if (panelId) {
    history.pushState(null, '', `#${panelId}`);
    notifyActiveSectionChange(panelId);
  }
  
  setTimeout(() => {
    isAnimating.value = false;
  }, LOCK_MS);
}

// 根据锚点ID滚动到对应的panel
function goToById(id) {
  const index = findPanelIndexById(id);
  if (index !== -1) {
    goTo(index);
  }
}

// 处理URL哈希变化
function handleHashChange() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    goToById(hash);
  }
}

// 暴露方法给全局，以便NavigationBar可以调用
function exposeScrollMethod() {
  window.scrollToSection = (sectionId) => {
    goToById(sectionId);
    return false; // 阻止默认行为
  };
}

// 监听当前索引变化
watch(currentIndex, (newIndex) => {
  const panelId = getPanelIdByIndex(newIndex);
  if (panelId) {
    notifyActiveSectionChange(panelId);
  }
});

onMounted(() => {
  // 初始化时通知导航栏当前活动的section
  const initialPanelId = getPanelIdByIndex(0);
  if (initialPanelId) {
    window.currentSectionId = initialPanelId;
    notifyActiveSectionChange(initialPanelId);
  }

  // 监听滚轮/触摸
  const observer = Observer.create({
    target: window,
    type: "wheel,touch,pointer",
    tolerance: 10,
    preventDefault: true,
    passive: false,
    onDown: () => goTo(currentIndex.value + 1),
    onUp: () => goTo(currentIndex.value - 1),
    onRight: () => goTo(currentIndex.value + 1),
    onLeft: () => goTo(currentIndex.value - 1),
  });

  // 添加哈希变化事件监听
  window.addEventListener('hashchange', handleHashChange);

  // 暴露滚动方法给全局
  exposeScrollMethod();

  // 如果URL中包含哈希值，则滚动到对应位置
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    setTimeout(() => goToById(hash), 300);
  }
});

onBeforeUnmount(() => {
  // 移除事件监听
  window.removeEventListener('hashchange', handleHashChange);

  // 移除全局方法
  if (window.scrollToSection) {
    delete window.scrollToSection;
  }

  // 清理全局currentSectionId变量
  if (window.hasOwnProperty('currentSectionId')) {
    delete window.currentSectionId;
  }
});

// 暴露方法给父组件
defineExpose({
  goTo,
  goToById
});
</script>

<style scoped>
.viewport {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: radial-gradient(at 70% center,
      rgba(27, 33, 45, 0.7) 0px,
      rgba(27, 33, 45, 0.9) 30%,
      rgb(27, 33, 45) 50%,
      rgb(27, 33, 45) 100%);
}
</style>