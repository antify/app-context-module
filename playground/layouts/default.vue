<script setup lang='ts'>
const navItems = [
	{
		label: 'Home',
		to: {name: 'index'}
	}
];
</script>

<template>
  <AntNavLeftLayout :navbar-items="navItems">
    <AntContent class="h-full">
      <slot />
    </AntContent>

    <AntToaster />
  </AntNavLeftLayout>
</template>
