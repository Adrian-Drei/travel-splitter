<script setup>
import { ref, computed, watch } from "vue";
import { useTripStore } from "../stores/tripStore";

const store = useTripStore();

const description = ref("");
const amount = ref("");
const contributors = ref([]);
const selectedParticipants = ref([]);
const showForm = ref(false);

watch(
  () => store.participants,
  (participants) => {
    contributors.value = participants.map((person) => ({
      participantId: person.id,
      amount: 0,
    }));
  },
  { immediate: true, deep: true },
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
    0,
  );

  if (totalContributed !== Number(amount.value)) {
    alert("Contribution total must equal expense amount");
    return;
  }

  store.addExpense({
    description: description.value,
    amount: Number(amount.value),

    contributors: contributors.value.filter(
      (contributor) => contributor.amount > 0,
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

  showForm.value = false;
}

function cancelExpense() {
  showForm.value = false;

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
  <div v-if="store.participants.length">
    <div v-if="!showForm">
      <button
        @click="showForm = true"
        class="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        + Add Expense
      </button>
    </div>
    <div v-else class="space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">Add Expense</h2>

      <!-- Description -->
      <div class="space-y-2">
        <label class="block font-medium text-gray-700">Description</label>

        <input
          v-model="description"
          placeholder="Hotel"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Amount -->
      <div class="space-y-2">
        <label class="block font-medium text-gray-700">Amount</label>

        <input
          v-model.number="amount"
          type="number"
          min="0"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Contributors -->

      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-gray-800">Who Paid?</h3>

        <div
          v-for="contributor in contributors"
          :key="contributor.participantId"
          class="flex items-center justify-between gap-4 rounded-lg bg-gray-50 p-3"
        >
          <span class="font-medium">
            {{
              store.participants.find((p) => p.id === contributor.participantId)
                ?.name
            }}
          </span>

          <input
            type="number"
            min="0"
            v-model.number="contributor.amount"
            class="w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-right"
          />
        </div>
      </div>

      <!-- Shared By -->

      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-gray-800">Shared By</h3>

        <label class="flex items-center gap-2 cursor-pointer font-medium">
          <input type="checkbox" v-model="allSelected" class="h-4 w-4" />

          Select All
        </label>

        <div class="grid grid-cols-2 gap-2">
          <label
            v-for="person in store.participants"
            :key="person.id"
            class="flex items-center gap-2 rounded-lg bg-gray-50 p-3 cursor-pointer hover:bg-gray-100"
          >
            <input
              type="checkbox"
              :value="person.id"
              v-model="selectedParticipants"
            />

            {{ person.name }}
          </label>
        </div>
      </div>

      <!-- Button -->

      <div class="flex gap-3">
        <button
          @click="addExpense"
          class="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white"
        >
          Save Expense
        </button>

        <button
          @click="cancelExpense"
          class="flex-1 rounded-lg bg-gray-200 py-3 font-semibold text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  <div v-else class="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
    No participants yet.
  </div>
</template>
