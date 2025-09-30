<template>
  <div class="content_sides">
    <div class="content_side__left">
      <div class="main_title_wrapper">
        <div class="main_subtitle">{{ subtitle }}</div>
        <div class="main_title">{{ title }}</div>
      </div>
      <NextButton v-if="showNextButton" @click="$emit('next')" />
    </div>
    <div class="content_side__right">
      <FactItem 
        v-for="fact in facts" 
        :key="fact.id" 
        :id="fact.id" 
        :icon="fact.icon" 
        :text="fact.text" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FactItem from './FactItem.vue';
import NextButton from './NextButton.vue';

interface Fact {
  id: string;
  icon: string;
  text: string;
}

defineProps<{
  subtitle: string;
  title: string;
  facts: Fact[];
  showNextButton?: boolean;
}>();

defineEmits<{
  (e: 'next'): void;
}>();
</script>

<style scoped>
.content_sides {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 0;
}

.content_side__left {
  width: 40%;
  padding-right: 30px;
}

.content_side__left,
.content_side__right {
  position: relative;
  left: 0;
  top: 0;
  opacity: 1;
}

.main_title_wrapper {
  position: relative;
  line-height: 1;
}

.main_subtitle {
  color: #e58707;
  font-family: ProximaNova sb;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1.1px;
}

.main_title {
  color: #fff;
  font-family: ProximaNova b;
  font-size: 7.2rem;
  line-height: 1.1;
  /* width: 10rem; */
}

.main_title_wrapper:not(:last-child) {
  margin-bottom: 7rem;
}

.main_title_wrapper>:not(:last-child) {
  margin-bottom: 2.5rem;
}

.content_side__right {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem 3.5rem; 
}
</style>