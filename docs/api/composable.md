## 组合式函数 Composable

### 1.组合式 API 的概念

Vue 3 引入了一种新的 API 风格，称为组合式 API（Composition API）。这种 API 设计的主要目的是为了提高代码的可重用性和逻辑的组织性。在大型应用开发中，随着组件变得越来越复杂，使用传统的选项式 API（Options API）可能会导致逻辑分散和难以维护的问题。组合式 API 允许开发者以更灵活的方式组织和复用逻辑代码。

假设有一个需要在多个组件之间共享的状态管理需求，使用组合式 API 可以通过创建一个单独的文件来定义这个状态及其相关逻辑，然后在需要的组件中引入并使用。这种方式不仅提高了代码的可维护性，也使得逻辑更加清晰。

### 2.自定义组合函数

起步操作：创建项目

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091055835.png" style="border-radius:10px;" />

#### 2.1计数器组合函数

src 下新建 composables 子目录，新建 useCounter.ts

```ts
import { ref } from "vue";

export function useCounter(initValue = 0) {
  const count = ref<number>(initValue);

  const increament = () => {
    count.value++;
  };

  const decreament = () => {
    count.value--;
  };

  const reset = () => {
    count.value = 0;
  };

  return {
    count,
    increament,
    decreament,
    reset,
  };
}
```

components/Counter.vue 中使用自定义计数器的组件:

```vue
<template>
  <div>
    <p>当前计数的值：{{ count }}</p>
    <button @click="increament">增加</button>
    <button @click="decreament">减少</button>
    <button @click="reset">清空</button>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from "../composables/useCounter";

const { count, increament, decreament, reset } = useCounter(10);
</script>

<style scoped></style>
```

注意记得在 App.vue 中引入 Counter.vue 组件

```vue
<script setup lang="ts">
import Counter from "./components/Counter.vue";
</script>

<template>
  <Counter />
</template>
```

效果图：

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091209396.png" alt="image-20241009120930339" style="zoom:80%;border-radius:10px;" />

#### 2.2本地存储管理组合函数

/composables/useLocalStorage.ts

```ts
import { ref, watch } from "vue";

export function useLocalStorage(key: string, defaultValue: string) {
  const storedValue = localStorage.getItem(key) || defaultValue;
  const data = ref<string>(storedValue);
  watch(data, (newValue) => {
    localStorage.setItem(key, newValue);
  });
  return data;
}
```

/components/LocalStorage.vue

```vue
<template>
  <div>
    <p>本地存储的值: {{ myData }}</p>
    <input type="text" v-model="myData" placeholder="更多本地存储的值" />
  </div>
</template>

<script setup lang="ts">
import { useLocationStorage } from "../composables/useLocalStorage";
const myData = useLocationStorage("username", "张三");
</script>
```

效果图：

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091218139.png" alt="image-20241009121853075" style="border-radius:10px;" />
