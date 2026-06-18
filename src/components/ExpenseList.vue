<script setup>
import { useTripStore } from '../stores/tripStore'

const store = useTripStore()

function getPersonName(id) {
    return store.participants.find(
        p => p.id === id
    )?.name
}
</script>

<template>
    <div>
        <h2>Expenses</h2>

        <div
            v-for="expense in store.expenses"
            :key="expense.id"
        >
            <strong>
                {{ expense.description }}
            </strong>

            - ₱{{ expense.amount }}

            (Paid by
            {{ getPersonName(expense.paidBy) }})
        </div>
    </div>
</template>