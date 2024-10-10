# **一、项目搭建，rem适配**

## 1.安装vue脚手架，vue cli

​ **_系统命令行_**执行

​ `npm install -g @vue/cli`

​ 注意：

1. 可能会遇到执行权限、执行策略的问题；

2. 下载缓慢、失败，（修改镜像源为淘宝）

   `npm config set registry https://registry.npmmirror.com`

​ 解决-执行策略：

1. 打开 PowerShell 作为管理员。

2. 输入以下命令以查看当前的执行策略：

   ```shell
   Get-ExecutionPolicy
   ```

3. 如果执行策略是 "Restricted" 或者其他限制性策略，你可以使用`Set-ExecutionPolicy RemoteSigned`命令将其更改为 "RemoteSigned"（允许运行签名的远程脚本和本地脚本）或`Set-ExecutionPolicy Unrestricted`将其更改为 "Unrestricted"（允许运行所有脚本）：

## 2.创建项目

​ 执行命令：

​ vue create 目录名称 （例：创建目录名为vue-waimai的项目，vue create vue-waimai）

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101934112.png)

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101934549.png)

​ 等待创建完成，打开localhost:8080,出现如图所示表示成功创建

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101934658.png)

## 3.安装组件（rem适配）

​ `rem`是相对单位，它代表相对于根元素（即 html 元素）的字体大小的倍数

​ post-pxtorem是postcss的插件，用于将像素单元生成rem单位

​ amfe-flexible是配置可伸缩布局方案，主要是将1rem设为viewWidth/10

在**项目目录**，命令行执行：

​ `yarn add postcss-pxtorem@5.1.1 amfe-flexible -S`

​ 或（`npm install postcss-pxtorem@5.1.1 `

`npm install amfe-flexible`）

## 4.使用

​ 在vue.config.js中加入配置代码

```js
const pxtorem = require("postcss-pxtorem");

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("css")
      .oneOf("vue")
      .use("postcss-loader")
      .tap((options) => ({
        ...options,
        postcssOptions: {
          plugins: [
            pxtorem({
              rootValue: 16,
              propList: ["*"],
            }),
          ],
        },
      }))
      .end();

    config.module
      .rule("css")
      .oneOf("normal")
      .use("postcss-loader")
      .tap((options) => ({
        ...options,
        postcssOptions: {
          plugins: [
            pxtorem({
              rootValue: 16,
              propList: ["*"],
            }),
          ],
        },
      }))
      .end();
  },
};
```

​ 记得在main.js中引入相关文件，加入`import 'amfe-flexible'`

# **二、阿里巴巴矢量图标库的使用**

## 1.网址

https://www.iconfont.cn/

## 2.使用

### 1.复制symbol代码

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935470.png)

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935091.png)

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935951.png)

### 2.引入脚本

复制代码后，前面加入http作为script中src的内容

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935368.png)

### 3.插入使用

加入svg标签包裹的内容

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935822.png)

效果如下图

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935997.png)

# **三、路由引入**

## 1.安装

​ 在**项目目录**上，命令行执行：`yarn add vue-router@4 -S`

## 2.创建

​ 在src中创建router和views

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935952.png)

router中index.js内容为

```js
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/home/HomeIndex.vue"),
  },
  {
    path: "/home",
    component: () => import("../views/home/HomeIndex.vue"),
  },
  {
    path: "/order",
    component: () => import("../views/order/OrderIndex.vue"),
  },
  {
    path: "/mine",
    component: () => import("../views/mine/MineIndex.vue"),
  },
  {
    path: "/cart",
    component: () => import("../views/cart/CartIndex.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
```

## 3.引入、使用

最后记得在main.js中引入，并使用

```vue
import router from './router/index' const app =createApp(App) app.use(router)
```

在App.vue中加入`<router-view/>`,这样地址栏修改时相应页面内容就会变化

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935218.png)

<img src="https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935327.png" style="zoom:67%;" />

# 四、less和vant-ui的使用

## 1.less

LESS是一个CSS预处理器，可以为网站启用可自定义，可管理和可重用的样式表。 LESS是一种动态样式表语言，扩展了CSS的功能。 LESS也是跨浏览器友好。

CSS预处理器是一种脚本语言，可扩展CSS并将其编译为常规CSS语法，以便可以通过Web浏览器读取。

### 1.安装

​ 在**项目目录**上，命令行执行`yarn add less less-loader@7 -S`

### 2.使用

​ 例：HomeIndex.vue中内容

```vue
<template>
  <div class="home"><div>首页</div></div>
</template>

<style lang="less" scoped>
.home {
  div {
    color: #2ae9a0;
  }
}
</style>
```

## 2.vant-ui

### 1.网址

​ [Vant 4 - 轻量、可定制的移动端组件库](https://vant.pro/vant/#/zh-CN#jie-shao)

### 2.安装

​ 在**项目目录**上，命令行执行`yarn add i vant@next -S`

### 3.使用

#### 方法一（常规）

##### 1.注册、引入组件

```js
// 1. 引入你需要的组件
import { Button } from "vant";
// 2. 引入组件样式
import "vant/lib/index.css";

const app = createApp(App);
app.use(router).use(Button);
```

##### 2.使用

​ 例：HomeIndex.vue中加入`<van-button type="primary">点击</van-button>`

```vue
<template>
  <div class="home">
    <div>首页</div>
    <van-button type="primary">点击</van-button>
  </div>
</template>
```

#### 方法二（按需引入）

##### 1.安装插件

​ 在项目目录上，命令行执行`yarn add unplugin-vue-components -D`

##### 2.使用

```js
const { VantResolver } = require("unplugin-vue-components/resolvers");
const { ComponentsPlugin } = require("unplugin-vue-components/webpack");
module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolver: [VantResolver()],
      }),
    ],
  },
};
```

# 五、Footer组件

在src的components下创建main-ooter.vue,内容如下：

```vue
<template>
  <div class="footer">
    <div class="item">
      <router-link to="/home" class="nav-item" active-class="nav-color">
        <van-icon name="wap-home-o" size="30" />
        首页
      </router-link>
    </div>
    <div class="item">
      <router-link to="/cart" class="nav-item" active-class="nav-color">
        <van-icon name="shopping-cart-o" size="30" />
        购物车
      </router-link>
    </div>
    <div class="item">
      <router-link to="/order" class="nav-item" active-class="nav-color">
        <van-icon name="orders-o" size="30" />
        订单
      </router-link>
    </div>
    <div class="item">
      <router-link to="/mine" class="nav-item" active-class="nav-color">
        <van-icon name="user-o" size="30" />
        我的
      </router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.footer {
  display: flex;

  .item {
    flex: 1;

    .nav-color {
      color: #ffc400;
    }

    .nav-item {
      display: flex;
      flex-flow: column;
      align-items: center;
    }
  }
}
</style>
```

# 六、首页-header静态实现

## 1.header的书写：

​

```vue
<template>
  <div class="home">
    <div class="content">
      <div class="header">
        <div class="text">外卖</div>
        <div class="location">
          <van-icon name="location-o" />
          <span>json课程</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
```

## 2.样式中header的书写：

```vue
<div class="header">
                <div class="text">外卖</div>
                <div class="location">
                    <van-icon name="location-o" />
                    <span>json课程</span>
                    <van-icon name="arrow" />
                </div>
</div>
```

注意：如果效果不对，记得修改vue.config.js中rootValue的值

# 七、首页搜索静态实现

## 1.搜索框的书写

```vue
<div class="main">
            <div class="main-bg">
                <div class="search">
                    <input type="text"/>
                    <div class="search-text">搜索</div>
                </div>
                <div class="sort">
                    <div class="big-sort"></div>
                    <div class="small-sort"></div>
                </div>
            </div>
         </div>
```

## 2.样式main中search的书写

```css
.main {
  margin-top: -30px;
  .main-bg {
    background-image: linear-gradient(#fff, #f5f5f5);
    padding: 10px 20px 0px 20px;
    border-radius: 30px 30px 0 0;
    .search {
      position: relative;
      input {
        width: 100%;
        border: 1px solid #ffc400;
        border-radius: 20px;
        height: 30px;
      }
      .search-text {
        position: absolute;
        right: -6px;
        top: 1px;
        background-color: #ffc400;
        border-radius: 16px;
        width: 50px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
```

# 八、首页大小分类静态实现

## 1.引入reactive

```vue
<script>
import Footer from "../../components/main-footer.vue";
// 引入reactive
import { reactive, toRefs } from "vue";
export default {
  components: {
    Footer,
  },
  setup() {
    let data = reactive({
      // 加入分类数据
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>
```

**注意**：使用阿里巴巴矢量图标库时，在每次插入图标后，public中index.html的script脚本要重新引用

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935876.png)

## 2.分类样式(大分类)

```css
.sort {
  padding: 20px 0;
  .big-sort {
    display: flex;
    div {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-flow: column;
      align-items: center;
      .icon {
        width: 50px;
        height: 50px;
        margin-bottom: 5px;
      }
    }
  }
}
```

# 九、首页tabs静态实现

## 1.van-tabs的书写

```vue
<van-tabs v-model:active="active">
          <van-tab title="标签 1">内容 1</van-tab>
          <van-tab title="标签 2">内容 2</van-tab>
          <van-tab title="标签 3">内容 3</van-tab>
          <van-tab title="标签 4">内容 4</van-tab>
</van-tabs>
```

## 2.引入(参考vant官网)

### 1.在main.js中引入

```js
import { createApp } from "vue";
import { Tab, Tabs } from "vant";

const app = createApp();
app.use(Tab);
app.use(Tabs);
```

### 2.在HomeIndex.vue中引入ref

```js
import { reactive, toRefs, ref } from "vue";
const active = ref(0);
return {
  active,
};
```

## 3.样式（样式穿透）

```css
/deep/ .van-tabs__wrap {
  border-radius: 10px;
}
```

## 4.循环遍历(包括标签、标签内容)

```vue
<van-tabs v-model:active="active" class="vant-tabs">
          <van-tab v-for="(item, index) in centent_nav_list" :title="item.tab" :key="index">
            <nav-list :navList="item.data" />
          </van-tab>
</van-tabs>
```

**注意**：实现标签内容要在home下新建组件components文件夹，创建NavList.vue,记得要在HomeIndex.vue中引入并且注册，实现NavList需要再创建NavListItem.vue实现(相当于嵌套使用)

NavList.vue:

```vue
<template>
  <div v-for="(item, index) in navList" :key="index">
    <nav-list-item :itemContent="item" />
  </div>
</template>

<script>
import NavListItem from "./NavListItem.vue";
export default {
  props: ["navList"],
  components: { NavListItem },
};
</script>
```

NavListItem.vue:

```vue
<template>
  <div class="item">
    <img :src="itemContent.pic" alt="图片" />
    <div class="item-right">
      <div class="title">{{ itemContent.title }}</div>
      <div class="sales">{{ itemContent.sales }}</div>
      <div class="price">{{ itemContent.price }}</div>
      <div class="label">
        <div v-for="(i, index) in itemContent.label" :key="index">
          {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["itemContent"],
};
</script>
```

# 十、店铺Header实现

## 1.新增StoreIndex.vue页

## 2.添加路由

```vue
// 在 router/index.js 中添加对应的跳转页 { path: '/store', component: () =>
import('../views/store/StoreIndex.vue') } // 在 NavListItem.vue 中添加 @click
<template>
  <div class="item" @click="toStore">... ...</div>
</template>
```

```vue
// 相应的在 NavListItem.vue 中添加 toStore 方法
<script>
import { useRouter } from "vue-router";
export default {
  props: ["itemContent"],
  setup() {
    const router = useRouter();
    const toStore = () => {
      // 跳转到商店详情页
      router.push("/store");
    };
    return {
      toStore,
    };
  },
};
</script>
```

## 3.在 StoreIndex.vue 中引入 store-header

```vue
<template>
  <div class="storeDetails">
    <Header></Header>
  </div>
</template>

<script>
import Header from "../../components/store-header.vue";
export default {
  components: {
    Header,
  },
};
</script>
```

# 十一、店铺中间tabs实现

## 1.加入 van-tabs([同九、首页tabs](#1.van-tabs的书写))

## 2.将各个食品处理为组件

FoodList.vue

```vue
<template>
  <div class="food-list" v-if="index === 0">
    <van-tree-select
      v-model:main-active-index="activeIndex"
      height="88vw"
      :items="items"
    >
      <template #content>商品</template>
    </van-tree-select>
  </div>

  <div v-else>
    {{ foodData.content }}
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: ["index", "foodData"],
  setup() {
    let data = reactive({
      activeIndex: 0,
      items: [{ text: "分组 1" }, { text: "分组 2" }],
    });

    // console.log('Items:', data.items);

    return {
      ...toRefs(data),
    };
  },
};
</script>
```

**注意**：使用 **van-tree-select** 时要在 **main.js** 中引入、使用

## 3.加入数据，遍历

```vue
<van-tabs color="#ffc400">
                    <van-tab v-for="(item, index) in storeData" :title="item.name" :key="index">
                        <FoodList :index="index" :foodData="item.data" />
                    </van-tab>
                </van-tabs>
```

## 4.效果

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101935192.png)

# 十二、店铺tabs数据的具体实现

## 1.“分组1，分组2”的替换

```vue
<script>
import { reactive, toRefs } from "vue";

export default {
  props: ["index", "foodData"],
  setup(props) {
    let data = reactive({
      activeIndex: 0,
      items: [{ text: "分组 1" }, { text: "分组 2" }],
    });

    // console.log('Items:', data.items);

    // 初始化数据
    const initData = () => {
      // 定义 newArray
      let newArray = [];
      if (props.foodData && props.foodData.items) {
        props.foodData.items.forEach((item) => {
          newArray.push({
            text: item.text,
          });
        });
      }
      data.items = newArray;
    };
    // 写完调用一下
    initData();
    return {
      ...toRefs(data),
    };
  },
};
</script>
```

**注意**：将props传入setup()中；newArray自行定义；push的时候要判断内容是否真正传进：`if (props.foodData && props.foodData.items) {}`

## 2.步进器(点菜的数量)

```vue
<van-stepper />
```

```js
import { Stepper } from "vant";

app.component("van-stepper", Stepper);
```

**注意**：同样注意在main.js中全局注册

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101936583.png)

## 3.小功能：加号隐藏

FoodList.vue:

```vue
<FoodListItem :item="item" :handleAdd="handleAdd" />
```

```js
const handleAdd = (id) => {
  data.subItem.forEach((item) => {
    if (item.id === id) {
      item.add = false;
    }
  });
};
```

FoodListItem.vue:

```vue
<van-icon name="add-o" v-if="item.add" @click="handleAdd(item.id)" />
<van-stepper v-else />
```

## 4.真正修改存储 num 属性值

FoodListItem.vue:

```vue
<van-stepper v-else v-model="localNum" @change="handleChange" :name="item.id" />
```

FoodList.vue:

```vue
<FoodListItem
  :item="item"
  :handleAdd="handleAdd"
  :handleChange="handleChange"
/>
```

```js
const handleChange = (value, detail) => {
  data.subItem.forEach((item) => {
    if (item.id === detail.name) {
      item.num = value;
    }
  });
  // console.log(data.subItem);
};
```

**注意**：写的数据或方法记得要在 **props** 中接收

```js
props: ['item', 'handleAdd','handleChange'],
```

# 十三、店铺底部加入购物车实现

## 1.安装 vuex@next 插件

`yarn add vuex@next`

## 2.同十二，写对应方法

StoreIndex.vue:

```vue
<van-action-bar>
	<van-action-bar-icon icon="chat-o" text="客服" dot />
	<van-action-bar-icon icon="cart-o" text="购物车" 	:badge="store.state.cartList.length />
	<van-action-bar-button type="warning" text="加入购物车" @click="handleAddCart" />
	<van-action-bar-button type="danger" text="立即购买" />
</van-action-bar>
```

```js
import { useStore } from "vuex";

const handleAddCart = () => {
  const newList = [];
  data.storeData.forEach((item) => {
    item.data.items?.forEach((item) => {
      item.children.forEach((item) => {
        if (item.num > 0) {
          newList.push(item);
        }
      });
    });
  });
  store.commit("addCart", newList);
};
```

## 3.新建js

在src下新建store文件夹，在其中新建store1.js

store1.js：

```js
import { createStore } from "vuex";

export default createStore({
  state: {
    cartList: [], // 购物车的数据
  },
  mutations: {
    addCart(state, value) {
      state.cartList = value;
    },
  },
  actions: {},
});
```

**注意**：记得在 **main.js** 中引入使用

# 十四、店铺底部立即购买实现

## 1.购物车跳转

```vue
<van-action-bar-icon
  icon="cart-o"
  text="购物车"
  :badge="store.state.cartList.length"
  @click="goCart"
/>
```

```js
import { useRouter } from "vue-router";

let router = useRouter();

const goCart = () => {
  router.push("/cart");
};
```

**注意**：每个方法定义使用时，不要忘了引入和返回return

## 2.立即购买

### 1.在 main.js 中引入

```js
import "vant/es/toast/style";
```

### 2.具体实现

StoreIndex.vue:

```js
import { Toast } from "vant";

const handleAddCart = (type) => {
  const newList = [];
  data.storeData.forEach((item) => {
    item.data.items?.forEach((item) => {
      item.children.forEach((item) => {
        if (item.num > 0) {
          newList.push(item);
        }
      });
    });
  });
  if (newList.length === 0) {
    Toast("请选择商品");
    return;
  }
  store.commit("addCart", newList);
  type === "buy" ? goCart() : "";
};
```

## 补：店铺返回按钮

store-header.vue中，加入toBack

```vue
<van-icon name="arrow-left" class="icon" @click="toBack" />
```

js代码中写具体实现

```js
// HeaderOf1.vue
const toBack = () => {
  router.back();
};
```

## 保留问题（版本问题）

商品数为0时点击 "加入购物车" 或者 "立即购买" 的页内弹窗处理(Toast)

# 十五、购物车空列表页实现

## 1.新建Empty.vue页

在src/components下新建Empty.vue

```vue
<template>
  <div class="empty-content">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-inbox"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.empty-content {
  flex: 1;
  margin: 20px;
  font-size: 16px;
  overflow-y: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  height: 72vh;

  .icon {
    margin-bottom: 10px;
  }
}
</style>
```

## 2.引入

在views/cart/CartIndex.vue中引入（包括之前的Header，用于返回主页）

## 3.处理

给出一个isShow，用v-if标签显示空购物车和购物车列表

```vue
<template>
  <div class="cart">
    <Header title="购物车" />
    <CartDetail v-if="isShow" />
    <Empty v-else />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../../components/main-footer.vue";
import Empty from "../../components/EmptyIndex1.vue";
import Header from "../../components/HeaderOf1.vue";
import CartDetail from "./components/CartDetail.vue";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

export default {
  components: {
    Footer,
    Empty,
    Header,
    CartDetail,
  },
  setup() {
    const isShow = ref(true);
    const store = useStore();

    const init = () => {
      if (store.state.cartList.length === 0) {
        isShow.value = false;
      }
    };
    onMounted(() => {
      init();
    });

    return {
      isShow,
    };
  },
};
</script>
```

# 十六、购物车列表组件抽离

## 1.抽离

将store/components/FoodListItem.vue抽取出来放到src/components里用于购物车界面

## 2.CheckBox复选框（购物车点选）

跟之前的vant引入一样，注意引入后要use一下

## 3.循环实现

```vue
// CartDetail.vue
<van-checkbox-group v-model="checked">
	<div v-for="(item, index) in store.state.cartList" :key="index">
		<ListItem  :item="item" :handleChange="handleChange" :showCheckBox="true"/>
	</div>
</van-checkbox-group>
```

ListItem中加入v-if判断显示

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101936381.png)

**注意**：查清楚对应的方法参数传入，以及对应的方法要在setup()中return一下，对于引用的组件要注意在components中注册

# 十七、购物车选中功能

## 1.默认全选

加入购物车后默认全选

```js
const init = () => {
  data.checked = store.state.cartList.map((item) => item.id);
};

onMounted(() => {
  init();
});
```

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101936697.png)

## 2.加入购物车bug解决

描述：加入购物车之后点进购物车页面，再返回点选项目，此时再进入购物车页面，发现后来点选的并没有被选进去展示出来

解决：StoreIndex.vue中handleAddCart函数书写的问题；点加入购物车每次都要调用handleAddCart，导致newList初始化，所以修改了初始化newList

```js
const newList = store.state.cartList || [];
```

# 十八、购物车价格实现

## 1.submitBar的使用

```vue
<van-submit-bar :price="3050" button-text="结算" @submit="onSubmit">
	<van-checkbox v-model="checked">全选</van-checkbox>
</van-submit-bar>
```

## 2.全选的实现

通过判断选择的和展现出的是否相等来实现全选功能

```js
const chooseAll = () => {
  if (data.checked.length !== store.state.cartList.length) {
    init();
  } else {
    data.checked = [];
  }
};
```

```js
const groupChange = (result) => {
  if (result.length === store.state.cartList.length) {
    data.submitChecked = true;
  } else {
    data.submitChecked = false;
  }
  data.checked = result;
};
```

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101936983.png)

## 3.计算的实现

在van-submit-bar中给出allPrice属性；

filter过滤，结算勾选的

```js
const allPrice = computed(() => {
  let countList = store.state.cartList.filter((item) => {
    return data.checked.includes(item.id);
  });
  let sum = 0;
  countList.forEach((item) => {
    sum += item.price * item.num;
  });
  return sum * 100;
});
```

# 十九、购物车编辑逻辑实现

## 1.编辑

```vue
// CartIdex.vue中传个属性
<Header title="购物车" :edit="true" />
```

```vue
// header中用v-if在购物车页面中显示出来
<div class="edit" v-if="edit">编辑</div>
```

## 2.全选、删除

点击编辑 下面的全选删除要出来

```js
// src/store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    cartList: [], // 购物车的数据
    isDelete: true, // 确定header组件 点击编辑的时候 底部组件的展示
  },
  mutations: {
    addCart(state, value) {
      state.cartList = value;
    },
    changeDelete(state) {
      state.isDelete = !state.isDelete;
    },
  },
  actions: {},
});
```

```js
// 在header中写上编辑
const handleEdit = () => {
  if (store.state.cartList.length) {
    store.commit("changeDelete");
  } else {
    Toast.fail("请先添加商品到购物车!");
  }
};
```

保留：同十四的弹窗问题，Toast的应用

## 3.删除商品

分为“删除部分”和“删除所有”，当“删除所有”的时候**空购物车兜底样式**要出来

```js
const updateData = (type) => {
  return store.state.cartList.filter((item) => {
    return type === "delete"
      ? !data.checked.includes(item.id)
      : data.checked.includes(item.id);
  });
};

const handleDelete = () => {
  // 判断data的checked是否有值
  if (data.checked.length) {
    store.commit("delete", updateData("delete"));
    data.checked = [];
    // 购物车没有数据的时候显示空页面
    if (!store.state.cartList.length) {
      props.changeShow();
    }
  } else {
    Toast("请先选择要删除的商品");
  }
};
```

## 4.空购物车提示

当购物车没有东西的时候 此时点击编辑有提示

## 5.点击编辑以后，显示完成

```vue
<div
  class="edit"
  v-if="edit"
  @click="handleEdit"
>{{store.state.edit ? '编辑' :'完成'}}</div>
```

# 二十、生成订单

## 其一（点击结算的处理）

### 1.onSubmit的书写

```js
// CartDetail.vue
const onSubmit = () => {
  if (data.checked.length) {
    store.commit("pay", updateData());
  } else {
    Toast.fail("请选择!!!");
  }
};
```

### 2.在js中加入pay的配置

```vue
// src/store/index.js pay(state, value) { state.orderList = value }
```

## 其二（点击结算的新路由）

### 1.新建路由（及页面）

在views下新建createOrder文件夹，在其中新建CreateOrderIndex.vue;
记得在router/index.js中加入新路由路径（与之前大致相同）;
要在点击结算后跳转，所以在之前的onSubmit中写上`router.push("/createOrder");`

### 2.编辑联系人

同样需要注意在main.js中引入使用

```vue
<van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
```

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101936164.png)

### 3.取orderList，Card组件

```vue
<div v-for="(item, index) in store.state.orderList" s>
                <van-card 
                :num="item.num" 
                :price="item.price" 
                :title="item.title"
                :thumb="item.pic" />
</div>
```

### 4.金额，生成订单按钮

```vue
<div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{totalPrice}}</span>
            </div>
            <van-button type="primary" class="pay-btn" block color="#ffc400">生成订单</van-button>
</div>
```

```js
// 金额的处理
const initPrice = () => {
  let price = 0;
  if (store.state.orderList.length) {
    store.state.orderList.forEach((item) => {
      price += item.price * item.num;
    });
  }
  data.totalPrice = price;
};
onMounted(() => {
  initPrice();
});
```

## 其三（生成订单）

### 1.Dialog弹出框

```js
// 点击生成订单后，弹窗提示，路由跳转
const handleCreateOrder = () => {
            Dialog({
                title: '提示',
                message: '生成订单成功！',
            }).then(() => {
                router.push("/order")
});
```

### 2.订单要联系购物车

订单完成，对应购物车的商品要清掉；

点击结算时，购物车就要传过来

```js
// 修改CartDetail.vue中onSubmit的代码
const onSubmit = () => {
  if (data.checked.length) {
    store.commit("pay", updateData());
    router.push({
      path: "/createOrder",
      qurey: {
        list: data.checked,
      },
    });
  } else {
    Toast.fail("请选择!!!");
  }
};
```

```js
// 订单生成成功的东西，相应的在购物车中要删掉
// 首先检查 route.query.list 是否存在，然后确保它是一个数组。如果它是一个字符串，则使用 split(',') 将其转换为数组；如果它不存在或为 undefined，则设置为一个空数组。
const handleCreateOrder = () => {
  Dialog({
    title: "提示",
    message: "生成订单成功！",
  }).then(() => {
    // 要和购物车联系起来,过滤
    // 确保 route.query.list 是一个数组
    const listIds = route.query.list
      ? Array.isArray(route.query.list)
        ? route.query.list
        : route.query.list.split(",")
      : [];
    console.log(listIds);

    let newList = store.state.cartList.filter((item) => {
      // 确保 item.id 被转换为字符串
      return !listIds.includes(item.id + "");
    });
    store.commit("delete", newList);
    router.push("/order");
  });
};
```

# 二十一、订单页完成

## 1.header，van-tabs(大致和之前一样)

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101936956.png)

## 2.内容遍历

```vue
<van-tabs color="#ffc400">
                <van-tab :title="item" v-for="(item, index) in navData" :key="index">
                <div v-for="(i,index) in store.state.orderList" :key="index">
                    <van-card 
                    :num="i.num" 
                    :price="i.price" 
                    :title="i.title"
                    :thumb="i.pic" />
                </div>
                </van-tab>
</van-tabs>
```

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101937766.png)

## 3.新增订单，相同商品不往下递增显示的bug

src/store/index.js的state中加入orderListEnd数组;在mutations中加入orderListEnd，将前后的拼接起来

```js
// src/store/index.js
orderListEnd(state){
            state.orderListEnd = state.orderListEnd.concat(state.orderList)
}
```

```js
// views/createOrder/CreateOrderIndex.vue
// 在路由跳转之前，清空购物车之后，进行订单拼接操作
store.commit("delete", newList);
store.commit("orderListEnd");
router.push("/order");
```

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101937302.png)

# 二十二、地址管理

## 其一

### 1.路由，header（与之前大致相同）

点击生成订单页中的的地址信息，进行路由跳转

### 2.van-address-list地址列表

```vue
<van-address-list
  :list="list"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
/>
```

```js
const init = () => {
            data.list = store.state.userAddress.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
                    isDefault: item.isDefault,
                };
            });
        };
onMounted(()=>{
            init();
);
```

### 3.新建地址编辑页，路由跳转

新建views/addressEdit/AddressEditIndex.vue;

点击地址列表中的地址信息，跳转到修改地址页（与之前大致相同）;

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101937237.png)

## 其二

### 1.van-address-edit地址编辑

```vue
<van-address-edit
  :area-list="areaList"
  show-delete
  show-set-default
  show-search-result
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
/>
```

```js
const init = () => {
  store.state.userAddress.forEach((item) => {
    if (item.id === Number(route.query.id)) {
      data.addressInfo = item;
    }
  });
};
onMounted(() => {
  init();
});
```

```js
// AddressIndex.vue中路由跳转传值修改
const onAdd = () => {
  router.push({
    path: "/addressEdit",
    query: {
      type: "add",
    },
  });
};
const onEdit = (item) => {
  router.push({
    path: "/addressEdit",
    query: {
      id: item.id,
      type: "edit",
    },
  });
};
```

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101937843.png)

### 2.新增地址（保存）

```js
// src/store/index.js
addAddress(state, value) {
            state.userAddress.map((item) => {
                if (value.isDefault) {
                    item.isDefault = false;
                }
            });
            state.userAddress.push(value);
        },
editAddress(state, value) {
            state.userAddress.map((item) => {
                if (value.isDefault) {
                    item.isDefault = false;
                }
                if (item.id === value.id) {
                    return value
                }else{
                    return item
                }
            });
},
```

```js
// 保存代码
// views/addressEdit/addressEditInex.vue
const onSave = (content) => {
  // 新增和编辑
  if (route.query.type === "add") {
    store.commit("addAddress", content);
  } else {
    store.commit("edit", content);
  }
};
```

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101937923.png)

### 3.编辑时不保存的bug

```js
editAddress(state, value) {
// 处理的时候要重新赋值
            state.userAddress = state.userAddress.map((item) => {...});
},
```

#### 保留bug

当修改，初始化时就为默认的，地址时，勾选设置为默认地址，再保存的时候，会保存失败，bug仅存在于第一次打开页面的时候

### 4.删除地址功能

```js
// src/store/index.js
deleteAddress(state, value){
            state.userAddress = state.userAddress.filter((item) => {
                return !(item.id == value.id)
            })
            if(value.isDefault){
                state.userAddress[0].isDefault = true
            }
        },
```

```js
// views/addressEdit/addressEditIndex.vue
const onDelete = (content) => {
  store.commit("deleteAddress", content);
  Toast("删除成功！");
  setTimeout(() => {
    router.back();
  }, 1000);
};
```

# 二十三、我的页面的编写

## 1.我的页面

```vue
<div class="me">
        <Header title="我的" />
        <div class="content">
            <div class="user-info">
                <div class="info">
                    <img src="../../assets/header001.jpg" />
                    <div class="user-desc">
                        <span>昵称：{{ name }}</span>
                        <span class="name">个性签名：{{ describe }}</span>
                    </div>
                </div>
            </div>
            <ul class="user-list">
                <li class="van-hairline--bottom" @click="go('./order')">
                    <span>我的订单</span>
                    <van-icon name="arrow" />
                </li>
                <li class="van-hairline--bottom" @click="go('./address')">
                    <span>地址管理</span>
                    <van-icon name="arrow" />
                </li>
                <li class="van-hairline--bottom" @click="go('./userinfoedit')">
                    <span>账号管理</span>
                    <van-icon name="arrow" />
                </li>
            </ul>
        </div>
        <Footer></Footer>
    </div>
```

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101937171.png)

## 2.定义go方法，进行路由跳转

```js
const go = (path) => {
  router.push(path);
};
```

## 3.路由的增加、跳转，跟之前大致一样

# 二十四、登录注册的静态页面

## 1.登录（注册）页

```vue
    <div class="login">
        <Header title="登录" />
        <div class="img">米团</div>
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请输入用户名' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请输入密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" color="#ffc400">
                    登录
                </van-button>
                <van-button round block type="info" color="#ffc400" class="register" @click="toRegister">
                    去注册
                </van-button>
            </div>
        </van-form>
    </div>
```

## 2.Form表单组件要记得在main.js中引入使用

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101937333.png)

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101937140.png)

# 二十五、登录注册逻辑实现

## 1.路由守卫

在需要守卫的路由加上meta属性

```js
{
        path:'/mine',
        component:()=>import('../views/mine/MineIndex.vue'),
        meta:{
            isAuth:true,
        }
    },
```

```js
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    // 登录以后，会在localstorage中存储一个标识
    // 验证是否登录
    const token = localStorage.isLogin;
    if (token === "login") {
      next();
    } else {
      next("/login");
      Toast("请先登录");
    }
  } else {
    next();
  }
});
```

## 2.注册逻辑

```js
const onSubmit = (value) => {
  // console.log(value);
  if (localStorage.userInfo) {
    let userInfo = JSON.parse(localStorage.getItem);
    if (userInfo["user"] === value["user"]) {
      Toast("该用户名已存在");
      return;
    }
  } else {
    register(value);
  }
};
const register = (value) => {
  localStorage.setItem("userInfo", JSON.stringify(value));
  Toast("注册成功");
  router.push("/login");
};
```

## 3.登录逻辑

```js
const onSubmit = (value) => {
  if (!localStorage.userInfo) {
    Toast("账号未注册！！！");
    return;
  } else {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo["username"] === value["username"]) {
      if (userInfo["password"] === value["password"]) {
        localStorage.setItem("isLogin", "login");
        Toast("登录成功!!!");
        router.push("/home");
      } else {
        Toast("密码错误!!!");
        return;
      }
    } else {
      Toast("账号不存在!!!");
      return;
    }
  }
};
```

暂时以localstorage作为数据库

# 二十六、账号管理页面的实现

## 1.van-field

```vue
<template>
  <Header title="账号管理" />
  <div>
    <van-field v-model="name" label="昵称" placeholder="请输入昵称" />
    <van-field v-model="sign" label="个性签名" placeholder="请输入个性签名" />
    <van-field v-model="password" label="密码" placeholder="请输入密码" />
  </div>
  <van-button
    type="primary"
    color="#ffc400"
    round
    block
    class="save-btn"
    @click="save"
    >保存</van-button
  >
  <van-button
    type="primary"
    color="#ffc400"
    round
    block
    class="save-btn"
    @click="logOut"
    >退出登录</van-button
  >
</template>
```

![](https://yeluzi-pic-go.oss-cn-hangzhou.aliyuncs.com/md/202410101937953.png)

## 2.实现

```js
// 保存修改
const save = () => {
  if (data.name && data.password) {
    let userInfo = JSON.parse(localStorage.userInfo);
    let newUserInfo = {
      username: data.name || userInfo.name,
      password: data.password || userInfo.password,
    };
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    Toast("修改成功！！！");
    router.push("/mine");
  } else {
    Toast("请输入内容！！！");
  }
};
// 退出登录
const logOut = () => {
  localStorage.removeItem("isLogin");
  Toast("退出成功");
  router.push("/login");
};
```

# 补（重要）

## vue3.3.10兼容该项目，高版本有的组件会报错，该版本的vant正常安装，这样的话Toast就能正常使用（无论是局部vue中引入还是全局引入）
