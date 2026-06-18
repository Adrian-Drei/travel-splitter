<script setup>
import { onMounted } from 'vue'

import { useTripStore } from './stores/tripStore'

import ParticipantForm from './components/ParticipantForm.vue'
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseList from './components/ExpenseList.vue'

const store = useTripStore()

onMounted(() => {
    store.load()
})
</script>

<template>
    <div>
        <h1>Travel Expense Splitter</h1>

        <ParticipantForm />

        <hr>

        <ExpenseForm />

        <hr>

        <ExpenseList />
    </div>
</template>