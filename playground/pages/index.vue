<script setup lang="ts">
import {
	ref,
	useUi,
	useFetch,
	useAppContext
} from '#imports';

const {ColorType} = useUi();
const appContext = useAppContext();
const statusCode = ref<null | number>(null);
const {execute, error, data} = useFetch('/api/test', {
	method: 'post',
	body: {},
	immediate: false,
	onResponse({response}) {
		statusCode.value = response.status;
	}
});
</script>

<template>
  <AntFormGroup>
    <div class="text-3xl">
      Playground
    </div>

    <AntFormGroup
      direction="row"
    >
      <AntFormGroup class="w-2/3">
        <AntFormGroupLabel>Client</AntFormGroupLabel>

        <AntFormGroup direction="row">
          <AntField
            label="App context from useAppContext composable"
          >
            <pre class="bg-neutral-100 rounded-md p-2.5 h-60 overflow-auto">{{ appContext.context }}</pre>
          </AntField>

          <AntField
            label="App context from plugin"
          >
            <pre class="bg-neutral-100 rounded-md p-2.5 h-60 overflow-auto">{{ $appContextModule.context }}</pre>
          </AntField>
        </AntFormGroup>

        <AntFormGroup direction="row">
          <AntButton @click="() => appContext.setContext('cockpit')">Set cockpit app context</AntButton>
          <AntButton @click="() => appContext.setContext('service', '63f73526b5db16c4a92d6c37')">Set service app context</AntButton>
        </AntFormGroup>

        <AntFormGroup direction="row">
          <AntButton @click="() => appContext.setContext('unknown-service')">Set invalid context</AntButton>
          <AntButton @click="() => appContext.clear()">Clear Context</AntButton>
        </AntFormGroup>

        <AntField
          label="Send request"
          description="Send a test request with context in cookie"
        >
          <AntActionButton @click="() => execute()">Submit</AntActionButton>
        </AntField>
      </AntFormGroup>

      <AntFormGroup class="w-1/3">
        <AntFormGroupLabel>Server</AntFormGroupLabel>

        <AntField label="Response">
          <pre class="bg-neutral-100 rounded-md p-2.5 h-60 overflow-auto">{{ data || error?.data }}</pre>
        </AntField>

        <AntField
          v-if="statusCode"
          label="Status code"
        >
          <AntTag
            :color-type="statusCode === 200 ? ColorType.success : ColorType.danger"
          >
            {{ statusCode }}
          </AntTag>
        </AntField>
      </AntFormGroup>
    </AntFormGroup>
  </AntFormGroup>
</template>
