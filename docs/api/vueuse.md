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
