<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import SocialMediaBar from './components/SocialMediaBar.vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <el-container>
      <el-aside width="200px">
        <SocialMediaBar />
      </el-aside>
      <el-container>
        <el-header>
          <NavigationBar />
        </el-header>
        <el-main>
          <main class="main-content">
            <router-view />
          </main>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<style scoped>
.main-content {
  /* margin-top: 70px; 与导航栏高度匹配 */
  /* min-height: calc(100vh - 70px); */
  /* padding: 2rem; */
  width: 100%;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
