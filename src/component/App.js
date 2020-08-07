import React, {Component} from 'react';
import SearchItems from './SearchItems';
import AddItems from './AddItems';
import ListItems from './ListItems';
import '../css/App.css';


class App extends Component {
  constructor () {
    super();
    this.state ={
      itemList:[],
      lastIndex: 0,
    }
  }

  componentDidMount(){
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
      const items = result.map(item => { 
        item.itemId = this.state.lastIndex; // controlla alla fine che serva... hai il prodId
        this.setState({ lastIndex: this.state.lastIndex +1})
        return item;
        })
        this.setState({ itemList : items });
    })
};

  render() {

  return (
    <main className="main">
      <div className="container">
          <div className="row">
              <AddItems />
              <SearchItems />
              <ListItems list={this.state.itemList} />
            </div>
          </div>
    </main>
  );
}
}
export default App;
