<template>
  <div class="book-card card">
    <button class="book-card__controls book-card__controls--read-more" @click="readMore">
      <img
        class="book-card__image card-img-top"
        :src="'http://wods-api.herokuapp.com/' + wod.example"
        alt
      />
      <p class="book-card__controls-text">Comments</p>
    </button>
    <div class="book-card__content">
      <div class="book-card__information">
        <p class="book-card__label">Title</p>
        <p class="book-card__text">{{ wod.title }}</p>
      </div>
      <div class="book-card__information">
        <p class="book-card__label">Type</p>
        <p class="book-card__text">{{ wod.type }}</p>
      </div>
      <div class="book-card__information">
        <p class="book-card__label">Difficulty</p>
        <p class="book-card__text">{{ wod.difficulty }}</p>
      </div>
      <div class="book-card__information">
        <p class="book-card__label">Workout</p>
        <p class="book-card__text">{{ wod.workout }}</p>
      </div>
      <div v-if="role === 'Administrator'" class="book-card__controls">
        <button @click="updateWod" class="book-card__button btn" type="button">Update</button>
        <button @click="deleteWod(wod._id)" class="book-card__button btn" type="button">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("wods", ["wods"])
  },
  data() {
    return {
      editWod: {},
      isOpen: false
    };
  },
  methods: {
    ...mapActions("wods", ["deleteWod"]),
    updateWod() {
      this.$emit("update", this.wod);
    },
    readMore() {
      this.$emit("readMore", this.wod);
    }
  },
  props: ["wod", "role"]
};
</script>

<style lang="scss">
.book-card {
  background: $color-nude;
  border: 2px solid $color-storm;
  border-radius: 6px;
  margin: 0 0 20px 0;
  max-width: 320px;
  width: 320px;
  overflow: hidden;
  &__button {
    background-color: $color-storm !important;
    color: $color-moon;
    margin: 10px 5px 0;
    width: 90%;
    &:hover {
      background-color: darken($color-storm, 25) !important;
      color: $color-moon;
    }
  }
  &__content {
    margin: 10px;
  }
  &__controls {
    background-color: $color-nude;
    display: flex;
    &--read-more {
      border: 0;
      display: block;
      opacity: 1;
      padding: 0;
      position: relative;
      transition: transform 0.3s ease;
      :first-child {
        transition: opacity 0.3s ease;
      }
      :last-child {
        color: $color-storm;
        font-family: $Roboto;
        font-weight: 600;
        font-size: 60px;
        left: 50%;
        opacity: 0;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
      }
      &:hover {
        cursor: pointer;
        transform: scale(1.02);
        :first-child {
          opacity: 0.2;
        }
        :last-child {
          opacity: 1;
        }
      }
    }
  }
  &__image {
    border-radius: 0;
    height: 400px;
    max-width: 320px;
    object-fit: cover;
  }
  &__information {
    border-bottom: 1px solid $color-storm;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    &:last-of-type {
      border: 0;
    }
    &--rating {
      font-size: 18px;
      justify-content: flex-start;
    }
  }
  &__label {
    font-weight: 600;
    margin: 6px 0 4px;
    text-transform: uppercase;
  }
  &__text {
    margin: 6px 0 4px;
    &--rating {
      font-weight: 600;
      margin-left: 12px;
    }
  }
}
</style>