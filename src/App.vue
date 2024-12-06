<!-- 加上setup是为了允许在script中直接编写组合式API ，这个组合式给我的感觉就是我定义的变量以及对这个变量进行相关操作的函数就可以写在一起，这样代码就是一块一块的，每一块都是实现对应相关操作；而以前的选项式API这个变量和函数都在不同的地方，看着就会比较不方便，彼此分离的感觉-->
<script setup>
// 这里导入的组件直接就可以放在下面使用
import { computed, onMounted, provide, ref, watch } from 'vue';
import son from './components/son.vue'
import test from './components/test.vue'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
const arr = [1, 2, 3, 4, 5] //这个变量不是响应式的变量,所以即使我通过事件改变它的值，在控制台上能看到它的变化，但DOM上不会有变化。

const reactiveArr = ref(arr)  //通过ref将变量转化成了响应式对象，因为这个函数的返回的是一个对象，因此对一个普通变量转化成响应式对象的时候是会在外面给它包一层，因此在脚本中访问的时候我们需要.value来获取这个变量，在template中可以直接使用，不用.value。
const computedArr = computed(() => reactiveArr.value.filter(item => item > 2))

const str = ref("123456")
// watch(reactiveArr, (newValue,oldValue) => {
//   console.log(newValue,oldValue);
// }, {
//   // immediate: true,
//   deep:true     //因为我这里监视的是数组里面变化的值，如果不加deep的话它就只是监视了整个数组的地址，我往数组里面添加值并没有改变地址，所以它不会监视到。
// })

//想要直接监视到数组里面的变化，还有另一种写法：

watch(() => reactiveArr.value.length, (newValue, oldValue) => {
  console.log(newValue, oldValue);
})

const change = () => {
  reactiveArr.value.push(123)
}

// const getList = () => {
//   setTimeout(() => {
//     console.log("发送请求");
//   }, 20)
//   console.log("我是created和beforeCreate");
// }
// getList()

// onMounted(() => {
//   console.log("我是mounted");
// })


const inp = ref(null)
const sonCompo = ref(null)

//这里要借助生命周期是因为在setup阶段的时候，DOM结构并没有加载完毕，所以元素还没绑定上去。
onMounted(() => {
  console.log(inp.value);
  console.log(sonCompo.value);
  sonCompo.value.hello()
})

//跨层传递响应式数据
provide('arr', reactiveArr)

//跨层传递函数=>给子孙后代传递可以修改数据的方法  
provide('changeArr', () => {
  reactiveArr.value.push(123)
})

</script>


<template>
  <!-- 根元素不在要求唯一 -->
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
  <div style="margin: 20px auto;">
    <h2>我是父组件</h2>
    arr:{{ reactiveArr }}
    <br>
    str:{{ str }}
    <br>
    <button @click="change">push123</button>
    <input ref="inp" type="text" value="123">
  </div>
  <div>
    <son ref="sonCompo" name="儿子" :computedArr="computedArr" :reactiveArr="reactiveArr" @changeArr="change"
      v-model:str="str" v-model:arr="reactiveArr"></son>
  </div>
  <div>
    我是count组件
    <test></test> 
    </div>
</template>

<style scoped>
div {
  border: 1px solid #000;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
