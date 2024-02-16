import React from 'react';

const TEXT = {
  0: `This is California’s <b>Central Valley</b>, home to over 7 million people and 18% of California’s total population. (2020 US Census)`,
  1: `We have lots of demand that tends to cycle through highs and lows depending on the time of the year, peaking at around July. Each drop that you see represents a unit of <b>demand</b> for water.`,
  2: `However, our groundwater supply stays consistent throughout the year, and usually cannot keep up during peak demands.`,
  3: `This leads to unmet demand. For example, take May 2007. This is the demand of that month.`,
  4: `This is unmet demand. As you can see, not everyone will get their demand. Notice anything?`,
  5: `Let’s try another timestep. This is water demand from July 2021.`,
  6: `This is unmet demand.`,
  7: `These are owners.`,
};

const TEXT_AMT = Object.values(TEXT).length;

export default function Card({ slide, transitioning }) {
  if (transitioning) return;

  return (
    <div className="cardContainer">
      <p
        className="cardP"
        dangerouslySetInnerHTML={{ __html: TEXT[slide % TEXT_AMT] }}
      ></p>
    </div>
  );
}
