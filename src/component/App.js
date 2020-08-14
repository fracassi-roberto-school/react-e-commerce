import React, {Component} from 'react';
import SearchItems from './SearchItems';
import AddItems from './AddItems';
import ListItems from './ListItems';
import {without} from 'lodash';
import '../css/App.css';


class App extends Component {
  constructor () {
    super();
    this.state ={
      itemList:[],
      lastIndex: 0,
      formDisplay: 'add'
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.submitNewItem = this.submitNewItem.bind(this);
  };

  deleteItem (item){
    let tempList = this.state.itemList; // Delete product
    tempList = without(tempList, item); 
    this.setState({itemList: tempList}); 
  }

  submitNewItem (newItem){      //Add new product
    let tempList = this.state.itemList; 
    tempList.itemId = this.state.lastindex; 
    tempList.unshift(newItem); 
    this.setState({itemList: tempList,
        lastindex: this.state.lastindex + 1}); 
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
            {'add' === this.state.formDisplay ? <AddItems 
                submitNewItem = {this.submitNewItem}
                list= {this.state.itemList}/> : ''}
            {'search' === this.state.formDisplay ? <AddItems /> : ''}  
              <ListItems  
                template= 'admin'
                list= {this.state.itemList}
                deleteItem = {this.deleteItem} />
            </div>
          </div>
    </main>
  );
}
}
export default App;
