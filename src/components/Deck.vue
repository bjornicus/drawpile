<template>
  <div>
    <transition-group name="cards" tag="ul">
      <li v-for="card in cards" :key="card.id">
        {{ card.msg }}
      </li>
    </transition-group>
    <button @click="shuffle">Shuffle</button>
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
.cards-move {
  transition: transform 1s;
}
</style>
