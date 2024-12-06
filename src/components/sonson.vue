<script setup>
import { inject } from 'vue';

const arr = inject('arr')
// console.log(arr);
const changeArr = inject('changeArr')

// /**
//  *  
//  * @param {Function} fn tc
//  * @param {Number} time tc
//  */
// const throotle = (fn, time) => {
//     let isThrooletd = false, savedThis, savedArgs

//     function wrapper() {
//         if (isThrooletd) {
//             savedArgs = arguments
//             savedThis = this
//             return
//         }

//         isThrooletd = true
//         fn.apply(this, arguments)

//         setTimeout(() => {
//             isThrooletd = false
//             if (savedArgs) {
//                 wrapper.apply(savedThis, savedArgs)
//                 savedArgs = savedThis = null
//             }
//         }, time);
//     }
//     return wrapper
// }

const clickFn = () => {
    changeArr()
}
</script>
<template>
    <div>
        我是最小的组件
        {{ arr }}

        <h4>我想改这个数据</h4>
        <button @click="clickFn">改原来的数组</button>

    </div>
</template>

<style scoped>
div {
    border: 1px solid #000;
}
</style>