import React from "react";
import IconButton from "./IconButton";
import Card from "./Card";

const cardObjects = [
  {
    title: "Card 1",
    description: "This is card 1.",
    link: "https://card1.com/1",
  },
  {
    title: "Card 2",
    description: "This is card 2.",
    link: "https://card2.com/2",
  },
  {
    title: "Card 3",
    description: "This is card 3.",
    link: "https://card3.com/3",
  },
  {
    title: "Card 4",
    description: "This is card 4.",
    link: "https://card4.com/4",
  },
];

const CardList: React.FC = () => {
  const visible = cardObjects.slice(0, 3);
  const showButton = cardObjects.length > 3;

  return (
    <div className="flex items-center gap-8 overflow-x-auto p-4">
      {visible.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          buttonText="Button"
          buttonOnClick={() => console.log("Card clicked")}
        />
      ))}

      {showButton && (
        <div className="flex justify-center ml-auto mr-auto">
          <IconButton
            icon={<span className="text-white text-lg font-bold">→</span>}
            text="View More"
            onClick={() => console.log("View More clicked")}
            customStyle="flex-shrink-0 px-4 py-3 ml-auto rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default CardList;
