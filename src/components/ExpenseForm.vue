<script setup>
import { ref, computed } from 'vue'
import { useTripStore } from '../stores/tripStore'

const store = useTripStore()

const description = ref('')
const amount = ref('')
const paidBy = ref(null)

const selectedParticipants = ref([])

const allSelected = computed({
    get() {
        return (
            store.participants.length > 0 &&
            selectedParticipants.value.length ===
                store.participants.length
        )
    },

    set(value) {
        if (value) {
            selectedParticipants.value =
                store.participants.map(p => p.id)
        } else {
            selectedParticipants.value = []
        }
    }
})

function addExpense() {
    if (!description.value) return
    if (!amount.value) return
    if (!paidBy.value) return
    if (!selectedParticipants.value.length) return

    store.addExpense({
        description: description.value,
        amount: Number(amount.value),
        paidBy: paidBy.value,
        participants: [...selectedParticipants.value]
    })

    description.value = ''
    amount.value = ''
    paidBy.value = null
    selectedParticipants.value = []
}
</script>

<template>
    <div>
        <h2>Add Expense</h2>

        <div>
            <label>Description</label>

            <input
                v-model="description"
                placeholder="Hotel"
            />
        </div>

        <div>
            <label>Amount</label>

            <input
                v-model="amount"
                type="number"
            />
        </div>

        <div>
            <label>Paid By</label>

            <select v-model="paidBy">
                <option :value="null">
                    Select
                </option>

                <option
                    v-for="person in store.participants"
                    :key="person.id"
                    :value="person.id"
                >
                    {{ person.name }}
                </option>
            </select>
        </div>

        <div>
            <h3>Shared By</h3>

            <label>
                <input
                    type="checkbox"
                    v-model="allSelected"
                />

                Select All
            </label>

            <div
                v-for="person in store.participants"
                :key="person.id"
            >
                <label>
                    <input
                        type="checkbox"
                        :value="person.id"
                        v-model="selectedParticipants"
                    />

                    {{ person.name }}
                </label>
            </div>
        </div>

        <button @click="addExpense">
            Add Expense
        </button>
    </div>
</template>