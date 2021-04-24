import React, { Component } from "react";
import "./ArticleFeed.css";
import ArticlePost from "./ArticlePost";

class ArticleFeed extends Component {
  state = {
    articles: [
      {
        name: "Artificial Intelligence so far...",
        caption:
          "Artificial intelligence today is properly known as narrow AI (or weak AI), in that it is designed to perform a narrow task (e.g. only facial recognition or only internet searches or only driving a car). However, the long-term goal of many researchers is to create general AI (AGI or strong AI). While narrow AI may outperform humans at whatever its specific task is, like playing chess or solving equations, AGI would outperform humans at nearly every cognitive task.",
        body: "abcd",
        image: require("../images/ai.jpg"),
      },
      {
        name: "Is Space reachable any soon..?",
        caption:
          "We can fly to virtually any country in the world without any trouble, but what if we could all one day see the earth from space? Companies such as Virgin Galactic, SpaceX and even Amazon's Blue Origin, want to make it a reality one day, and give us a (very expensive) seat aboard a spaceship to take us into orbit. Passengers on Amazon's New Shepard space shuttle will be taken 100km above sea level, before parachuting back to earth.",
        body: "abcd",
        image: require("../images/space.jpg"),
      },
      {
        name: "The thing we crave other than flying cars ..!",
        caption:
          "It might have been popularised by Minority Report, but the concept of gesture-based computing has been around for a while. It's also already appearing in multiple different technologies and is almost second-nature for most anyway. How many gestures do we already use on a day-to-day basis on our smartphones, tablets and other smart devices? It's reasonable to see a future where we're no longer restricted by mouse and keyboard and instead rely on voice and action to manipulate data in a virtual space. ",
        body: "abcd",
        image: require("../images/gesture.webp"),
      },
      {
        name: "Agriculture is on the up..",
        caption:
          "As the population of Earth continues to grow, living space also shrinks, not only for human beings but for the animals and plants we rely on too. It's reasonable to see a future where tech will need to be developed to allow for farmland in unusual places. This concept of high-rise farms in the middle of a city isn't totally out of this world.",
        body: "abcd",
        image: require("../images/agri.jpg"),
      },
    ],
  };
  render() {
    return (
      <div className="articleFeed">
        <div className="articleFeed-title">Quink-post Articles.</div>
        <div className="articlePost">
          <ArticlePost articles={this.state.articles} />
        </div>
      </div>
    );
  }
}

export default ArticleFeed;
