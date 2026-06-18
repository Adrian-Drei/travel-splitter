<script setup>
import { onMounted } from "vue";
import { useTripStore } from "./stores/tripStore";

import ParticipantForm from "./components/ParticipantForm.vue";
import ExpenseForm from "./components/ExpenseForm.vue";
import ExpenseList from "./components/ExpenseList.vue";
import SettlementView from "./components/SettlementView.vue";
import SettlementList from "./components/SettlementList.vue";

const store = useTripStore();

onMounted(() => {
  store.load();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="max-w-3xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">
        Travel Expense Splitter
      </h1>

      <div class="bg-white rounded-xl shadow p-6 space-y-8">
        <ParticipantForm />

        <div class="border-t"></div>

        <ExpenseForm />

        <div class="border-t"></div>

        <ExpenseList />

        <div class="border-t"></div>

        <SettlementView />

        <div class="border-t"></div>

        <SettlementList />
      </div>
    </div>
  </div>
</template>
