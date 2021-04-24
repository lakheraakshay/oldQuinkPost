import React, { Component } from "react";
import InterviewPost from "./InterviewPost";

class InterviewFeed extends Component {
  state = {
    interviews: [
      {
        name: "Do you really think the electric car can replace the combustion engine?",
        caption:
          "I really do think we're headed toward a future that is 100% electric. Within 20 years, the majority of new cars manufactured will be pure electric. It'll take another 10 or 15 years beyond that for the fleet of existing cars to be primarily electric because it takes a while to switch out things.",
        image: require("../images/elonmusk.jpg"),
      },
      {
        name: "What is your main motivation?",
        caption:
          "Our motivation is not based on outsourcing and it is not based on taking technology from these companies. The synergies we see are the fundamental ones of having in our midst two brands that we greatly respect. The world should look at brands like these for what they are. Who owns them is almost immaterial.",
        image: require("../images/ratantata.jpg"),
      },
      {
        name: "How I Succeeded",
        caption:
          "I think one of the precursors of being able to take risk is to have some kind of support from somebody. You have to have some mentors, you have to have somebody that loves you. These are the kind of things that build up and allow you to jump off into uncharted terrain and do something new, because you know you have a support system. I had a big lottery with my parents.",
        image: require("../images/jeffbezos.jpg"),
      },
      {
        name: "Facebook stronger than other tech companies on free speech",
        caption:
          "We think that it wouldn’t be right for us to do fact checks for politicians. I certainly think our policies have distinguished us from some of the other tech companies in terms of being stronger on free expression and giving people a voice.",
        image: require("../images/markzuckerberg.png"),
      },
      {
        name: "'Hybrid' Work-From-Home Model",
        caption:
          "The search engine giant will be more “flexible” with its workers and offer a “hybrid” model that will include a blend of both remote and in-office methods of working. We firmly believe that in-person, being together, having a sense of community is super important when you have to solve hard problems and create something new so we don’t see that changing. But we do think we need to create more flexibility and more hybrid models.",
        image: require("../images/sundarpichai.jpg"),
      },
      
    ],
  };
  render() {
    return (
      <div className="articleFeed">
        <div className="articleFeed-title">Quink-post Interviews.</div>
        <div className="articlePost">
          <InterviewPost interviews={this.state.interviews} />
        </div>
      </div>
    );
  }
}

export default InterviewFeed;
