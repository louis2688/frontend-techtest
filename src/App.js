import React, { Component } from "react";
import "./App.css";
import Container from "./Components/Container";

const arrayList = [
  [
    { id: "101", value: "Vegetarian", disabled: false },
    { id: "102", value: "Nut allergy", disabled: false },
    { id: "103", value: "Halal", disabled: false },
  ],
  [
    { id: "201", value: "Cashew chicken", disabled: true },
    { id: "202", value: "Sweet and sour pork", disabled: true },
    { id: "203", value: "Stir fried Tofu", disabled: true },
    { id: "204", value: "Vegetable fried rice", disabled: true },
    { id: "205", value: "Pad Thai", disabled: true },
    { id: "206", value: "Massaman beef", disabled: true },
  ],
  [
    { id: "301", value: "Peanut sauce", disabled: true },
    { id: "302", value: "Oyster sauce", disabled: true },
    { id: "303", value: "Vegetable spring rolls", disabled: true },
    { id: "304", value: "Steamed rice", disabled: true },
  ],
];

const conditions = {
  101: [201, 202, 206, 302],
  102: [201, 301],
  103: [202],
  204: [304],
  205: [304],
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayList: [...arrayList],
      selectedValues: [
        { selected: null, disabled: false },
        { selected: null, disabled: true },
        { selected: null, disabled: true },
      ],
    };
  }

  onChange = (item, groupNumber) => {
    let selectedValues = [...this.state.selectedValues];

    switch (groupNumber) {
      case 0:
        selectedValues[1].selected = null;
        selectedValues[2].selected = null;
        break;
      case 1:
        selectedValues[2].selected = null;
        break;
      default:
        break;
    }
    selectedValues[groupNumber].selected = item.id;
    if (item.id in conditions) {
      for (let i = groupNumber + 1; i < arrayList.length; i++) {
        for (let z = 0; z < arrayList[i].length; z++) {
          let id = parseInt(arrayList[i][z].id);

          if (conditions[item.id].includes(id)) {
            arrayList[i][z].disabled = true;
          } else if (conditions[selectedValues["0"].selected].includes(id)) {
            arrayList[i][z].disabled = true;
          } else {
            if (groupNumber === 0 && i === 2) {
              arrayList[i][z].disabled = true;
            } else {
              arrayList[i][z].disabled = false;
            }
          }
        }
      }
    } else if (groupNumber < 2) {
      let arrayNumber = groupNumber + 1;
      for (let i = 0; i < arrayList[arrayNumber].length; i++) {
        if (
          conditions[selectedValues["0"].selected].includes(
            parseInt(arrayList[arrayNumber][i].id)
          )
        ) {
          arrayList[arrayNumber][i].disabled = true;
        } else {
          arrayList[arrayNumber][i].disabled = false;
        }
      }
    }
    this.setState({ selectedValues, arrayList });
  };

  componentDidMount() {
    this.setState({
      arrayList: arrayList,
    });
  }

  render() {
    return (
      <div>
        <Container
          arrayData={this.state.arrayList}
          onChange={this.onChange}
          selectedValues={this.state.selectedValues}
        />
      </div>
    );
  }
}

export default App;
