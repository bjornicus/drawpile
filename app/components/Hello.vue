<template>
  <div class="card-deck">
    <transition-group name="cards" tag="div">
        <v-touch v-on:swiperight="discard(topCard.id)" class="card stacked" :key="topCard.id" v-bind:style="topCard.styleObject">{{ topCard.msg }}</v-touch>
        <div class="card stacked" v-for="(card, index) in futureCards" :key="card.id" v-bind:style="card.styleObject">
          {{ card.msg }}
        </div>
    </transition-group>
    <button class="shuffle-button" @click="shuffle">Shuffle</button>
    <button class="draw-button" @click="discard(topCard.id)">Draw</button>
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

function getInitialDeck() {
  let cards = []
    .concat(Array(3).fill("Move pirates in one orbit."))
    .concat(Array(3).fill("Move pirates out one orbit."))
    .concat(Array(6).fill("Move pirates clockwise."))
    .concat(Array(6).fill("Move pirates counder-clockwise."))
    .concat(Array(4).fill("Fuel subsidy, 2 for 1"))
    .concat(Array(4).fill("Mining bonus, 2 for one action"))
    //.concat(Array(2).fill("Slingshot, boost orbit for 25% less"))
    .concat(Array(2).fill("Fuel leak, lose one fuel"))
    .concat(
      Array(4).fill(
        "Equipment malfunction, spend one action to fix before using"
      )
    )
    .concat(Array(2).fill("Engines malfunction, do not move this turn"));
  return shuffle(cards);
}

export default {
  name: "deck",
  data() {
    return {
      cards: getInitialDeck().map((s, i) => ({
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
      this.discarded = [];
      this.cards = shuffle(this.cards);
    },
    discard: function(id) {
      this.discarded.push(id);
      if (this.discarded.length == this.cards.length) {
        this.shuffle();
      }
    }
  }
};
</script>

<style>
.shuffle-button {
  position: fixed;
  bottom: 5px;
  right: 5vw;
  background: darkred;
  color: white;
  width: 40vw;
  font-size: 2.5rem;
  z-index: 200;
}
.draw-button {
  position: fixed;
  bottom: 5px;
  left: 5vw;
  background: darkgreen;
  color: white;
  width: 40vw;
  font-size: 2.5rem;
  z-index: 200;
}
.cards-move {
  transition: transform 0.5s;
}
.card {
  height: 60vw;
  width: 50vw;
  /* border: 1px solid black; */
  box-shadow: 3px 1px 1px lightgrey;
  border-radius: 5px;
  margin: 5px;
  background: black;
  color: white;
  font-size: 1.6rem;
  padding: 3rem;
}

.card-deck {
  position: relative;
  margin: 5vw;
}
.stacked {
  position: absolute;
}
</style>