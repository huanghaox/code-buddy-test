<template>
  <router-link 
    v-if="to" 
    :to="to" 
    class="common-button"
    :class="[variant, size]"
    :style="customStyle"
  >
    <slot></slot>
  </router-link>
  <button 
    v-else 
    class="common-button"
    :class="[variant, size]"
    :style="customStyle"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

interface Props {
  to?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'small' | 'medium' | 'large'
  customStyle?: Record<string, string>
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium'
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<style scoped>
.common-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  line-height: 1;
}

/* 尺寸样式 */
.common-button.small {
  padding: 8px 16px;
  font-size: 14px;
}

.common-button.medium {
  padding: 12px 24px;
  font-size: 16px;
}

.common-button.large {
  padding: 16px 32px;
  font-size: 18px;
}

/* 变体样式 */
.common-button.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.common-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.common-button.secondary {
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #e9ecef;
}

.common-button.secondary:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.common-button.outline {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.common-button.outline:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
}

.common-button.text {
  background: transparent;
  color: #667eea;
  padding: 8px 12px;
}

.common-button.text:hover {
  color: #5a67d8;
  background: rgba(102, 126, 234, 0.1);
}

/* 禁用状态 */
.common-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* 焦点样式 */
.common-button:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .common-button {
    width: 100%;
    max-width: 300px;
  }
  
  .common-button.small {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .common-button.medium {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  .common-button.large {
    padding: 14px 28px;
    font-size: 16px;
  }
}
</style>