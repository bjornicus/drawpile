<template>
  <div>
    <transition-group name="cards" tag="div">
      <div class="card" v-for="card in cards" :key="card.id">
        {{ card.msg }}
      </div>
    </transition-group>
    <button class="shuffle-button" @click="shuffle">Shuffle</button>
  </div>
</template>

<script>
function shuffle(arrayToShuffle) {
  let array = Array.from(arrayToShuffle);
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default {
  name: "deck",
  data() {
    return {
      cards: ["zero", "one", "two", "three", "four"].map((s, i) => ({
        msg: s,
        id: i
      }))
    };
  },
  methods: {
    shuffle() {
      // debugger;
      // console.log(shuffle([1, 2, 3]));
      this.cards = shuffle(this.cards);
    }
  }
};
</script>

<style>
.shuffle-button {
  position: fixed;
  bottom: 5px;
  left: 25vw;
  background: lightseagreen;
  width: 50vw;
  font-size: 3rem;
}
.cards-move {
  transition: transform 1s;
}
.card {
  height: 80px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
}
</style>
