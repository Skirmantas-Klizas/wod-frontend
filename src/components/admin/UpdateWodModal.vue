<template>
  <div class="update-book">
    <transition name="my-modal">
      <div v-if="this.isOpen">
        <div class="overlay" @click.self="onClick">
          <div class="my-modal">
            <h2 class="my-modal__heading">EDIT WOD</h2>
            <form @submit.prevent="update" class="update-book__form form-group">
              <label class="form-group__label" for="title">Title</label>
              <input
                v-model="wod.title"
                class="form-group__input form-control"
                type="text"
                id="title"
                :class="{ 'is-invalid': submitted && !wod.title }"
              />
              <small
                v-show="submitted && !wod.title"
                class="form-group__error form-text"
                id="titleError"
              >Incorrect Title</small>

              <label class="form-group__label" for="type">Type</label>
              <div class="form-group__select col-md-4">
                <select v-model="wod.type" id="type" class="form-control">
                  <option selected>Cardio</option>
                  <option>Weightlifting</option>
                  <option>Powerlifting</option>
                  <option>Gymnastics</option>
                </select>
              </div>
              <small
                v-show="submitted && !wod.type"
                class="form-group__error form-text"
                id="typeError"
              >Incorrect Type</small>

              <label class="form-group__label" for="difficulty">Difficulty</label>
              <div class="form-group__select col-md-4">
                <select v-model="wod.difficulty" id="difficulty" class="form-control">
                  <option selected>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <small
                v-show="submitted && !wod.difficulty"
                class="form-group__error form-text"
                id="difficultyError"
              >Incorrect difficulty</small>

              <label class="form-group__label" for="workout">Workout</label>
              <input
                v-model="wod.workout"
                class="form-group__input form-control"
                type="text"
                id="workout"
                :class="{ 'is-invalid': submitted && !wod.workout }"
              />
              <small
                v-show="submitted && !wod.workout"
                class="form-group__error form-text"
                id="workoutError"
              >Incorrect Workout</small>

              <div class="form-group__buttons">
                <input class="form-group__button btn" type="submit" value="Update Wod" />
                <button
                  class="form-group__button btn"
                  @click="isOpen = !isOpen"
                  type="button"
                >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      wods: state => state.wods.wods
    })
  },
  data() {
    return {
      submitted: false
    };
  },
  methods: {
    ...mapActions("wods", ["updateWod"]),
    update(e) {
      this.submitted = true;
      const editWod = {
        _id: this.wod._id,
        title: this.wod.title,
        type: this.wod.type,
        difficulty: this.wod.difficulty,
        workout: this.wod.workout
      };
      if (
        editWod.title &&
        editWod.type &&
        editWod.difficulty &&
        editWod.workout
      ) {
        this.updateWod(editWod);
        this.onClick(e);
        this.submitted = false;
      }
    },
    onClick(e) {
      this.$emit("clicked", !this.isOpen);
    },
    selectFile() {
      this.wod.example = this.$refs.file.files[0];
    }
  },
  props: ["wod", "isOpen"]
};
</script>

<style lang="scss" scoped>
.update-book {
  &__button {
    background: $color-moon !important;
    border: 2px solid $color-storm;
    margin: 0 0 10px 0;
    max-width: 320px;
    text-transform: uppercase;
    width: 100%;
    &:focus,
    &:hover {
      background: darken($color-moon, 10) !important;
      color: black !important;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
}
.form-group {
  &__buttons {
    margin-top: 15px;
  }
}
</style>