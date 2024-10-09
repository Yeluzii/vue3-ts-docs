# Vue 3 基础学习

## 1.创建应用

### 1.1生成模板

执行以下命令使用 Vite 生成项目模板

```bash
npm create vite@latest
```

在交互提示中，

- 输入项目名称，例如 `vue-basic`

- 选择框架为 `Vue`

- 选择语言为 ` TypeScript`

### 1.2进入项目目录并安装依赖

```bash
cd vue-basic
npm install
```

### 1.3启动开发服务器

```bash
npm run dev
```

## 2.模板语法

### 2.1声明式渲染

声明式是指可以像“声明变量”那样表示⻚面结构和绑定⻚面中的数据

Mustache.vue:

![image-20240913084859984](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091730112.png)

在默认情况下，"{{userName}}" 只是普通文本，如果要将其变成真实数据，则需要使用 Vue.js 3 提供的 createApp() 方法创建一个 Vue.js 实例，并挂载在应用的根元素上

![image-20240913084958085](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091730354.png)

![image-20240913085038044](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091730264.png)

注意：要记得在 App.vue 中引入

![image-20240913085318911](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091730824.png)

### 2.2组件系统

Vue.js的两种集成方式如下：

- 普通项目集成：在HTML中直接引入Vue.js文件；

- 工程化项目集成：通过npm命令安装 Vue.js模块。

组件的代码结构从整体上来看可以分为 3个区域。

- `<template></template>`:模板区域，基于HTML，声明式地绑定数据，表示⻚面结构；

- `<script></script>`：脚本区域，提供主要的数据和方法等；

- `<style></style>`：样式区域，用来修饰模板的样式

## 3.Vue.js 的基础概念

### 3.1 插值语法

同上，先声明变量，然后可以用双花括号包裹直接显示在页面上

也可以插表达式

![image-20240913090420401](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091730673.png)

### 3.2属性绑定

#### 3.2.1基础属性绑定

![image-20240913091723703](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091730170.png)

#### 3.2.2绑定多个属性

AttributesBinding.vue:

![image-20240913092848853](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091730355.png)

在浏览器的 Vue 开发者工具中，可以看到多个属性绑定成功

![image-20240913092810357](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731385.png)

#### 3.2.3绑定 class 和 style

class:

![image-20240913093216182](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731313.png)

style:

![image-20240913093240890](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731657.png)

#### 3.2.4动态绑定自定义属性

CustomButton.vue:

![image-20240913101408964](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731655.png)

CustomBinding.vue:

![image-20240913101438045](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731678.png)

报错：上面的 CustomButton.vue 报错显示无法找到模块

原因：TS 不能直接理解 `.vue` 文件，需要为 `.vue` 文件添加类型声明

在 `src` 下创建一个 `shims-vue.d.ts` 文件，添加以下内容

![image-20240913104050105](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731904.png)

### 3.3.状态与方法

#### 3.3.1状态

ref：适用于基本数据类型（如number、string、boolean）以及简单对象。`ref` 包装了一个值，并通过 `.value` 来访问或修改这个值。

![image-20240913110641933](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731143.png)

效果如下：

![image-20240913110603956](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731991.png)

reactive：适用于复杂对象（如数组、对象）。`reactive` 将整个对象转换为响应式的，当对象的任一属性发生改变时，Vue 会自动追踪这些变化

![image-20240913111346385](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731599.png)

效果如下：

![image-20240913111323125](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731503.png)

#### 3.3.2方法

方法是组件中用来处理业务逻辑、响应事件或对状态进行修改的函数

例：无参数方法

![image-20240913111648775](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731888.png)

例：带参数方法

![image-20240913111906147](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731584.png)

#### 3.3.3状态与方法结合使用

![image-20240913125810273](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091731112.png)

### 3.4条件渲染与列表渲染

#### 3.4.1条件渲染

条件渲染指的是根据某些条件，决定是否渲染某个 DOM 元素

例1：![image-20240913125931006](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732889.png)

例2：

![image-20240913130916984](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732231.png)

![image-20240913130952572](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732823.png)

#### 3.4.2列表渲染

列表渲染用于根据数组或对象的数据，动态渲染一组元素

例1：遍历数组渲染列表

![image-20240913131507988](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732648.png)

![image-20240913131518534](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732254.png)

例2：遍历对象数组

![image-20240913132259745](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732818.png)

![image-20240913132242112](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732375.png)

例3：使用索引渲染列表

![image-20240913132756458](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732766.png)

![image-20240913132735955](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732448.png)

3.4.3条件渲染与列表渲染结合使用

例：根据条件渲染列表中的内容

![image-20240913133517912](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732552.png)

![image-20240913133458903](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732393.png)

### 3.5计算属性与监听器

#### 3.5.1计算属性

例1：使用计算属性计算折扣价格

![image-20240913134144834](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732898.png)

![image-20240913134131690](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091732465.png)

例2：计算属性类型声明

![image-20240913134649503](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733349.png)

![image-20240913134644705](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733950.png)

3.5.2监听器

例1：监听用户输入并打印

![image-20240913140428631](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733736.png)

![image-20240913140452571](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733145.png)

例2：监听多个状态

![image-20240913141430042](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733106.png)

![image-20240913141412877](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733608.png)

例3：深度监听对象

![image-20240913142208338](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733305.png)

![image-20240913142157416](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733736.png)

例4：立即执行的监听器

![image-20240913142809053](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733305.png)

![image-20240913142758237](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733168.png)

### 3.6事件处理

#### 3.6.1基础事件处理

例1：点击按钮触发事件

![image-20240913143310918](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733432.png)

![image-20240913143255035](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733920.png)

例2：访问事件对象

![image-20240913143827894](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091733448.png)

![image-20240913143804628](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734474.png)

#### 3.6.2事件修饰符

例1：阻止表单提交

![image-20240913144336742](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734287.png)

![image-20240913144313528](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734358.png)

例2：阻止事件冒泡

![image-20240913144936836](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734024.png)

![image-20240913144925628](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734456.png)

例3：按钮点击仅触发一次

![image-20240913145412695](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734117.png)

![image-20240913145349657](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734327.png)

#### 3.6.3按键修饰符

例：监听 `Enter` 键

![image-20240913150232672](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734984.png)

![image-20240913150220495](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734426.png)

#### 3.6.4自定义事件

例：子组件触发事件

子组件：

![image-20240913151133984](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734520.png)

父组件：

![image-20240913151149301](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734511.png)

![image-20240913151119077](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734358.png)

#### 3.6.5事件传参

例：传递参数给事件处理函数

![image-20240913152127805](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734903.png)

![image-20240913152114729](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734571.png)

### 3.7表单双向绑定

#### 3.7.1基本用法

例1：文本输入框的双向绑定

![image-20240913152605045](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734872.png)

![image-20240913152547260](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091734374.png)

例2：复选框的双向绑定

![image-20240913153104986](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735775.png)

![image-20240913153056612](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735358.png)

例3：单选按钮的双向绑定

![image-20240913153445739](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735058.png)

![image-20240913153431796](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735346.png)

例4：下拉选择框的双向绑定

![image-20240913153932198](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735758.png)

![image-20240913153921646](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735969.png)

#### 3.7.2多个复选框的绑定

例：

![image-20240913154430980](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735256.png)

![image-20240913154414542](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735042.png)

#### 3.7.3修饰符的使用

例1：使用 `.lazy` 修饰符

![image-20240913155217895](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735039.png)

![image-20240913155137274](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735635.png)

例2：使用 `.number` 修饰符

![image-20240913155713895](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735406.png)

![image-20240913155700812](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735567.png)

例3：使用 `.trim` 修饰符

![image-20240913160124312](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735145.png)

![image-20240913160115108](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091735489.png)

#### 3.7.4 v-model 与组件

例：在自定义组件中使用 `v-model`

![image-20240913161209854](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736372.png)

![image-20240913161222006](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736036.png)

![image-20240913161152746](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736368.png)

#### 3.7.5 v-model 的多绑定语法

例：

![image-20240913162427770](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736332.png)

![image-20240913162446727](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736388.png)

![image-20240913162412450](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736879.png)

### 3.8 DOM 操作

#### 3.8.1基本用法

例：获取并操作 DOM 元素

![image-20240913163122443](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736779.png)

![image-20240913163113733](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736896.png)

#### 3.8.2生命周期钩子中的 DOM 操作

例：在组件挂载后操作 DOM

![image-20240913163736684](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736029.png)

![image-20240913163725962](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736615.png)

## 4.两个不同的待办清单例子

### 4.1原生 TypeScript

![image-20240913164821591](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736911.png)

### 4.2Vue 3 + TypeScript

![image-20240913164954731](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736027.png)

## 5.git仓库

https://github.com/Yeluzii/frontend-study.git

![image-20240913170100942](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736298.png)

![image-20240913170042695](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410091736226.png)
