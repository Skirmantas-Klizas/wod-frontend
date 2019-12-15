<template>
  <div class="books">
    <div class="books__cards">
      <WodCard
        v-for="(wod, i) in wods"
        :key="wod._id + i"
        @readMore="readMoreClick"
        @update="onUpdateClick"
        :wod="wod"
        :role="role"
      ></WodCard>
    </div>
    <WodModal @clicked="readMoreClick" :readMoreOpen="readMoreOpen" :wod="wod" :role="role"></WodModal>
    <UpdateWodModal
      v-if="role === 'Administrator'"
      @clicked="onModalClick"
      :isOpen="isOpen"
      :wod="wod"
    ></UpdateWodModal>
  </div>
</template>

<script>
import WodCard from "./WodCard";
import WodModal from "./wod-modal/WodModal";
import UpdateWodModal from "./../admin/UpdateWodModal";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    WodCard: WodCard,
    WodModal: WodModal,
    UpdateWodModal: UpdateWodModal
  },
  computed: {
    ...mapState("wods", ["wods"])
  },
  created() {
    this.getWods();
  },
  data() {
    return {
      wod: '',
      readMoreOpen: false,
      isOpen: false
    };
  },
  methods: {
    ...mapActions("wods", ["getWods"]),
    onModalClick(value) {
      this.isOpen = value;
    },
    readMoreClick(value) {
      this.wod = value;
      this.readMoreOpen = !this.readMoreOpen;
    },
    onUpdateClick(value) {
      this.wod = value;
      this.isOpen = !this.isOpen;
    }
  },
  props: ["role"]
};
</script>

<style lang="scss">
.books {
  &__cards {
    display: grid;
    grid-template-columns: auto auto auto auto;
    @media (max-width: 768px) {
      grid-template-columns: auto;
    }
    @media (min-width: 769px) and (max-width: 1099px) {
      grid-template-columns: auto auto;
    }
    @media (min-width: 1100px) and (max-width: 1440px) {
      grid-template-columns: auto auto auto;
    }
  }
}
</style>