<script setup>
import { useCountStore } from '../store/count'
import { storeToRefs } from 'pinia'

const CountStore = useCountStore()

const { count,double } = storeToRefs(CountStore)
const { add } = CountStore
</script>
<template>
    <div>
        当前值：{{ count }}
        <br>
        双数：{{ double }}
        <br>
        <button @click="add">++</button>
    </div>
</template>