<template>
  <div class="update-wod">
    <transition name="my-modal">
      <div v-if="this.readMoreOpen">
        <div class="overlay" @click.self="onClick">
          <div class="wod-modal my-modal">
            <WodModalInfo :wod="wod"></WodModalInfo>
            <WodModalResponses :wod="wod" :role="role"></WodModalResponses>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import WodModalInfo from "./WodModalInfo";
import WodModalResponses from "./WodModalResponses";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    WodModalInfo: WodModalInfo,
    WodModalResponses: WodModalResponses
  },
  methods: {
    onClick(e) {
      this.$emit("clicked", this.wod);
    }
  },
  props: ["wod", "readMoreOpen", "role"]
};
</script>

<style lang="scss" scoped>
.wod-modal {
  background: white;
  height: 620px;
  display: flex;
  flex-direction: row;
  padding: 0;
  min-width: 600px;
  width: 60vw;
}
</style>