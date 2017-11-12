<template>
  <div class="card-deck">
    <transition-group name="cards" tag="div">
        <v-touch v-on:swiperight="discard(topCard.id)" class="card stacked" :key="topCard.id" v-bind:style="topCard.styleObject">{{ topCard.msg }}</v-touch>
        <div class="card stacked" v-for="(card, index) in futureCards" :key="card.id" v-bind:style="card.styleObject">
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
      })),
      discarded: []
    };
  },
  computed: {
    remaingCards() {
      return this.cards
        .filter(c => !this.discarded.includes(c.id))
        .map((c, i) => ({
          ...c,
          styleObject: {
            zIndex: 100 - i,
            top: 4 * i + "px",
            left: 2 * i + "px"
          }
        }));
    },
    topCard() {
      return this.remaingCards[0];
    },
    futureCards() {
      return this.remaingCards.slice(1);
    }
  },
  methods: {
    shuffle() {
      // debugger;
      // console.log(shuffle([1, 2, 3]));
      this.discarded = [];
      this.cards = shuffle(this.cards);
    },
    discard: function(id) {
      this.discarded.push(id);
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
  transition: transform 0.5s;
}
.card {
  height: 80vw;
  width: 80vw;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  background: wheat;
}

.card-deck {
  position: relative;
  margin: 5vw;
}
.stacked {
  position: absolute;
}
</style>
