<script setup>
import { ref, computed, watch } from "vue";
import { useTripStore } from "../stores/tripStore";

const store = useTripStore();

const description = ref("");
const amount = ref("");
const contributors = ref([]);
const selectedParticipants = ref([]);

watch(
  () => store.participants,
  (participants) => {
    contributors.value = participants.map((person) => ({
      participantId: person.id,
      amount: 0,
    }));
  },
  { immediate: true }
);

const allSelected = computed({
  get() {
    return (
      store.participants.length > 0 &&
      selectedParticipants.value.length === store.participants.length
    );
  },

  set(value) {
    selectedParticipants.value = value
      ? store.participants.map((p) => p.id)
      : [];
  },
});

function addExpense() {
  if (!description.value) return;
  if (!amount.value) return;
  if (!selectedParticipants.value.length) return;

  const totalContributed = contributors.value.reduce(
    (sum, contributor) => sum + Number(contributor.amount || 0),
    0
  );

  if (totalContributed !== Number(amount.value)) {
    alert("Contribution total must equal expense amount");
    return;
  }

  store.addExpense({
    description: description.value,
    amount: Number(amount.value),

    contributors: contributors.value.filter(
      (contributor) => contributor.amount > 0
    ),

    participants: [...selectedParticipants.value],
  });

  description.value = "";
  amount.value = "";
  selectedParticipants.value = [];

  contributors.value = store.participants.map((person) => ({
    participantId: person.id,
    amount: 0,
  }));
}
</script>

<template>
  <div>
    <h2>Add Expense</h2>

    <div>
      <label>Description</label>

      <input v-model="description" placeholder="Hotel" />
    </div>

    <div>
      <label>Amount</label>

      <input v-model.number="amount" type="number" min="0" />
    </div>

    <div>
      <h3>Who Paid?</h3>

      <div v-for="contributor in contributors" :key="contributor.participantId">
        <label>
          {{
            store.participants.find((p) => p.id === contributor.participantId)
              ?.name
          }}
        </label>

        <input type="number" min="0" v-model.number="contributor.amount" />
      </div>
    </div>

    <div>
      <h3>Shared By</h3>

      <label>
        <input type="checkbox" v-model="allSelected" />

        Select All
      </label>

      <div v-for="person in store.participants" :key="person.id">
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

    <button @click="addExpense">Add Expense</button>
  </div>
</template>
