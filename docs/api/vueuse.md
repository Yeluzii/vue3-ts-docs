### VueUse：提升组合式 API 的开发效率

VueUse 是一个为 Vue 3 设计的实用工具库，它提供了一系列的组合式函数（Composition Functions），这些函数可以帮助开发者更高效地处理常见的开发任务，如状态管理、事件监听、浏览器功能集成等。

安装 vueuse

```bash
npm i @vueuse/core
```

#### 1.使用`useMouse`

```vue
<template>
  <div>
    <p>鼠标坐标：{{ x }},{{ y }}</p>
  </div>
</template>

<script setup lang="ts">
import { useMouse } from "@vueuse/core";

const { x, y } = useMouse();
</script>
```

#### 2.浏览器窗口大小自动调整响应式布局

使用 `useWindowSize` 组合函数，实时获取浏览器窗口的宽度和高度

```vue
<template>
  <div>
    <p>当前窗口大小：宽：{{ width }}px, 高：{{ height }}px</p>
    <div :class="{ 'mobile-layout': isMobile }">
      <p>{{ isMobile ? "移动端布局" : "桌面端布局" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

const { width, height } = useWindowSize();

const isMobile = computed(() => width.value < 768);
</script>

<style>
div {
  text-align: center;
  margin-top: 20px;
}

.mobile-layout {
  background-color: lightblue;
}

.mobile-layout p {
  font-size: 18px;
}

@media (min-width: 768px) {
  .mobile-layout {
    background-color: lightcoral;
  }

  .mobile-layout p {
    font-size: 24px;
  }
}
</style>
```

效果图：

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091250542.png" alt="image-20241009125038475" style="border-radius:10px;" />

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091251105.png" alt="image-20241009125111041" style="border-radius:10px;" />

#### 3.使用 VueUse 实现白天/夜间模式切换

/components/ThemeToggle.vue

```vue
<template>
  <div :class="theme">
    <button @click="toggleTheme">
      切换到{{ theme === "light" ? "夜间" : "白天" }}模式
    </button>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque rerum, rem
      ut illo ipsum magni eaque impedit.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStorage } from "@vueuse/core";

// 使用 useStorage 来持久化存储主题设置
const storedTheme = useStorage("app-theme", "light");

// 计算属性来决定当前的主题
const theme = computed({
  get: () => storedTheme.value,
  set: (value) => {
    storedTheme.value = value;
    document.documentElement.className = value;
  },
});

// 切换主题的方法
function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<style scoped>
button {
  border-radius: 5px;
}

.light {
  background-color: white;
  color: black;

  button {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
  }
}

.dark {
  background-color: black;
  color: white;

  button {
    background-color: #333;
    color: #f0f0f0;
    border: 1px solid #666;
  }
}
</style>
```

效果图：

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091645654.gif" alt="主题切换" style="border-radius:10px;" />

#### 4利用 `onClickOutside` 监听点击事件，如果点击发生在模态框外部，则关闭模态框

Modal.vue:

```vue
<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2>模态框标题</h2>
      <p>这是一个模态框内容。</p>
      <button @click="closeModal">关闭</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

// 获取模态框内容的引用
const modalContent = ref(null);

// 当点击模态框外部时关闭模态框
onClickOutside(modalContent, closeModal);

defineExpose({ openModal });
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
```

ModalParent.vue:

```vue
<template>
  <div>
    <button @click="openModal">打开模态框</button>
    <Modal ref="modal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";

const modal = ref(null);

const openModal = () => {
  modal.value?.openModal();
};
</script>
```

效果图：

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091811402.gif" alt="监听关闭模态框" style="border-radius:10px;" />

#### 5.使用 `useClipboard` 复制文本到剪贴板

ClipboardExample.vue:

```vue
<template>
  <div>
    <h2>复制文本到剪贴板示例</h2>
    <textarea v-model="text" placeholder="输入要复制的文本"></textarea>
    <button @click="copyText">复制文本</button>
    <p v-if="copied">已复制到剪贴板!</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useClipboard } from "@vueuse/core";

const text = ref("");
const { copy, copied } = useClipboard({ source: text });

const copyText = async () => {
  await copy();
};
</script>

<style scoped>
textarea {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 100px;
}

button {
  padding: 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

p {
  font-size: 18px;
  color: green;
  font-weight: bold;
}
</style>
```

效果图：

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091837286.gif" alt="复制文本到剪贴板" style="border-radius:10px;" />
