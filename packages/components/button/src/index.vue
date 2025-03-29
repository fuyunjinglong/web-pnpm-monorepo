<script setup>
import { computed } from "vue";
import { useNamespace } from "@lw-ui/hooks";
defineOptions({
  name: "LWButton",
});
const props = defineProps({
  type: {
    type: String,
    default: "default",
  },
});
// 调用一下userNamespace
const ns = useNamespace("button");

console.log(ns.block()); // x-button
console.log(ns.element("content")); // x-button__content
console.log(ns.modifier("size", "small")); // x-button--size_small
console.log(ns.is("disabled", true)); // is-disabled
const butonClass = computed(() => [
  ns.block(),
  ns.modifier("size", "small"),
  ns.modifier(props.type),
]);
</script>

<template>
  <button :class="butonClass">
    <span>
      <slot>buttonxx</slot>
    </span>
  </button>
</template>
