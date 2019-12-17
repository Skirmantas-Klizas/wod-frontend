<template>
  <div class="wod-card card">
    <img
      class="wod-card__image card-img-top"
      :src="'http://wods-api.herokuapp.com/' + wod.example"
      alt
    />
    <div class="wod-card__content">
      <div class="wod-card__information">
        <p class="wod-card__label">Title</p>
        <p class="wod-card__text">{{ wod.title }}</p>
      </div>
      <div class="wod-card__information">
        <p class="wod-card__label">Type</p>
        <p class="wod-card__text">{{ wod.type }}</p>
      </div>
      <div class="wod-card__information">
        <p class="wod-card__label">Difficulty</p>
        <p class="wod-card__text">{{ wod.difficulty }}</p>
      </div>
      <div class="wod-card__information">
        <p class="wod-card__label">Workout</p>
        <p class="wod-card__text">{{ wod.workout }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["wod"]
};
</script>

<style lang="scss" scoped>
.wod-card {
  background-color: white;
  border: 0;
  border-right: 1px solid $color-storm;
  border-radius: 0 !important;
  margin: 0;
  max-width: 240px;
  height: 100%;
  &__image {
    height: 300px;
  }
  &__information {
    flex-direction: column;
    font-size: 14px;
    &--rating {
      font-size: 16px;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  &__label,
  &__text {
    margin: 4px 0 2px;
  }
}
</style>