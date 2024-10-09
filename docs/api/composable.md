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

#### 2.3封装倒计时计时器逻辑

/composables/useCountdown.ts

```ts
import { ref } from "vue";

export function useCountdown(initValue = 60) {
  const seconds = ref<number>(initValue);
  let timerId: ReturnType<typeof setInterval> | null = null;

  const startCountdown = () => {
    if (seconds.value <= 0) return;
    // 清除之前可能存在的计时器
    stopCountdown();
    timerId = setInterval(() => {
      seconds.value--;
      // 当秒数为0时，自动停止
      if (seconds.value <= 0) {
        stopCountdown();
      }
    }, 1000);
  };

  const stopCountdown = () => {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  const resetCountdown = () => {
    stopCountdown(); // 停止现有计时器
    seconds.value = initValue;
  };

  return { seconds, startCountdown, stopCountdown, resetCountdown };
}
```

/components/Countdown.vue

```vue
<template>
  <div>
    <p>倒计时：{{ seconds }}</p>
    <button @click="startCountdown">开始</button>
    <button @click="stopCountdown">暂停</button>
    <button @click="resetCountdown">重置</button>
  </div>
</template>

<script setup lang="ts">
import { useCountdown } from "../composables/useCountdown";

const { seconds, startCountdown, stopCountdown, resetCountdown } =
  useCountdown(60);
</script>

<style scoped></style>
```

效果图：<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091632529.gif" alt="倒计时计时器" style="border-radius:10px;" />

#### 2.4封装模拟手机短信发送逻辑

/composables/useMessageSender

```ts
import { ref, watch } from "vue";

export function useMessageSender() {
  const phoneNumber = ref<string>("");
  const sending = ref(false);
  const sended = ref(false);
  const error = ref<string | null>(null);
  const sendMessage = async (phoneNumber: string) => {
    if (!phoneNumber) {
      error.value = "请输入手机号";
      return;
    }
    sending.value = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    sending.value = false;
    sended.value = true;
  };
  watch(phoneNumber, () => {
    error.value = null;
  });
  return {
    phoneNumber,
    sending,
    sended,
    error,
    sendMessage,
  };
}
```

/components/MessageSender.vue

```vue
<template>
  <div>
    <input type="text" v-model="phoneNumber" placeholder="请输入手机号" />
    <p>{{ error }}</p>
    <button @click="sendMessage(phoneNumber)">发送</button>
    <p v-if="sending">发送中...</p>
    <p v-if="sended">已发送至{{ phoneNumber }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessageSender } from "../composables/useMessageSender";

const phoneNumber = ref<string>("");

const { sending, sended, error, sendMessage } = useMessageSender();
</script>

<style scoped></style>
```

效果图：

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091638907.gif" alt="手机短信发送模拟" style="border-radius:10px;" />

#### 2.5封装表单验证组合式函数

/composables/useFormValidation.ts

```ts
import { ref } from "vue";

export function useFormValidation() {
  const phone = ref<number>();
  const email = ref<string>();
  const password = ref<string>();
  const errors = ref<string[]>([]);
  const error = ref<boolean>(false);

  const validateForm = () => {
    errors.value = [];
    error.value = false;

    if (!phone.value) {
      errors.value.push("手机号不能为空！！！");
      error.value = true;
    }

    if (phone.value) {
      if (phone.value.toString().length !== 11) {
        errors.value.push("请输入11位的手机号");
        error.value = true;
      }
    }

    if (!email.value || !validateEmail(email.value)) {
      errors.value.push("请输入正确的邮箱");
      error.value = true;
    }

    if (!password.value || password.value.length < 8) {
      errors.value.push("密码至少8位");
      error.value = true;
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return {
    phone,
    email,
    password,
    errors,
    error,
    validateForm,
  };
}
```

/components/FormValidation.vue

```vue
<template>
  <div>
    <label>手机号:</label>
    <input type="text" v-model="phone" />
  </div>
  <div>
    <label>邮箱:</label>
    <input type="text" v-model="email" />
  </div>
  <div>
    <label>密码:</label>
    <input type="password" v-model="password" />
    <p v-if="error">{{ errors }}</p>
  </div>
  <button @click="validateForm">提交</button>
</template>

<script setup lang="ts">
import { useFormValidation } from "../composables/useFormValidation";

const { phone, email, password, error, errors, validateForm } =
  useFormValidation();
</script>

<style scoped></style>
```

效果图：

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091640476.gif" alt="表单验证" style="border-radius:10px;" />
