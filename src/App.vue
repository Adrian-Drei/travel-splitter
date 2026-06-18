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
  <h1>Travel Expense Splitter</h1>

  <ParticipantForm />

  <hr />

  <ExpenseForm />

  <hr />

  <ExpenseList />

  <hr />

  <SettlementView />
  
  <hr />

  <SettlementList />
</template>
