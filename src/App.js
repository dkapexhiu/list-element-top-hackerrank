import React from "react";
import "./styles.css";

const UP = -1;
const DOWN = 1;

const handleClick = e => {
  var list = document.getElementsByTagName("ul")[0];
  var li = e.target.parentNode;
  list.insertBefore(li, list.firstChild);
};

class FruitList extends React.Component {
  render() {
    const { fruitList, onMove } = this.props;

    return (
      <ul>
        {fruitList.map(item => (
          <li
            onClick={handleClick}
            key={item.id}
            style={{ backgroundColor: item.bgColor }}
          >
            <div className="fruitsId">{item.id}</div>
            <div className="fruitsName">{item.name}</div>
            <div className="fruitsArrows">
              <a onClick={() => onMove(item.id, UP)}>&#x25B2;</a>
              <a onClick={() => onMove(item.id, DOWN)}>&#x25BC;</a>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default class App extends React.Component {
  state = {
    // set new state for bind key items
    items: [
      { id: 1, name: "orange", bgColor: "#f9cb9c" },
      { id: 2, name: "lemon", bgColor: "#fee599" },
      { id: 3, name: "strawberry", bgColor: "#e06666" },
      { id: 4, name: "apple", bgColor: "#b6d7a7" }
    ]
  };

  handleMove = (id, direction) => {
    const { items } = this.state;

    const position = items.findIndex(i => i.id === id);
    if (position < 0) {
      throw new Error("Given item not found.");
    } else if (
      (direction === UP && position === 0) ||
      (direction === DOWN && position === items.length - 1)
    ) {
      return; // canot move outside of array
    }

    const item = items[position]; // save item for later
    const newItems = items.filter(i => i.id !== id); // remove item from array
    newItems.splice(position + direction, 0, item);

    this.setState({ items: newItems });
  };

  render() {
    return <FruitList fruitList={this.state.items} onMove={this.handleMove} />;
  }
}
