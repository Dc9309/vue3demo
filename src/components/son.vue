<script setup>
import sonson from './sonson.vue'
import { defineOptions } from 'vue';

//这是vue3.3新特性，可以用来定义任意的选项，比如组件的名字。因为我们现在实在setup下面进行的定义，按选项式的写法，定义组件的名字是和setup()平级的，因此不能直接在sertup下面直接定义。这个时候就用到这个自定义宏，像之前的props，emits，expose，slots都是有对应的defineXXX，因此它们就不需要写在这里面，除了这四个之外，其余的比如name或者一些自定义属性就能放在这里面。
defineOptions({
    name: "son",
    // props: {
    //     name: String,
    //     computedArr: Array,
    //     reactiveArr: Array
    // },
    // emits:['changeArr'],


})

const props = defineProps({
    name: String,
    computedArr: Array,
    reactiveArr: Array
})

const getInfo = () => {
    console.log("接受到了父亲穿过来的值：", props.name);
}
getInfo()

const change = () => {
    // emit('changeArr')
    arr.value.push(123)
}

const emit = defineEmits(['changeArr'])


const hello = () => {
    console.log("哈喽，这是我的(子组件)数据");
}

//默认情况下，组件内部的数据和方法是不暴露给外面使用的，通过defineExpose来暴露给其他组件想要访问的数据
defineExpose({
    hello
})



const str = defineModel('str')
const arr = defineModel('arr')
// arr.value.push(123)
</script>

<template>
    <div>
        <h1>我是子组件</h1>
        <h1>传过来的数据在模板中直接使用，不需要加props</h1>
        <h2>传过来的原数组{{ reactiveArr }}</h2>
        <h2>传过来的计算属性{{ computedArr }}</h2>

        <h2>我要改你传过来的数据了</h2>
        <!-- 1.在子组件的内部，emit触发事件（编译器宏来获取）
        2.在父组件中通过@监听 -->
        <button @click="change">push123</button>
        <input type="text" name="" id="" v-model="str">

        <sonson></sonson>
    </div>
</template>