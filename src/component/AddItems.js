import React, {Component} from 'react';
import '../css/App.css';

class AddItems extends Component {
  constructor(){
    super();
    this.state={
      prodId: "", 
      fileName:"",
      description: "",
      stock: 0,
      fullPrice: 0,
      discount: 0,
      price:0,
      reviews: 0,
      errorMessage:[],
      errorListArray:[]
    }
    this.handleChange=this.handleChange.bind(this);
    this.newItem = this.newItem.bind(this);
}

handleChange(e){    
  const target = e.target;
  const value = target.value;
  const name = target.name;
  this.setState({ [name] : value });
}

newItem (e){  
  e.preventDefault();
  let tempItem = {
    prodId: this.state.prodId,
    description: this.state.description,
    fileName:"phone10.jpg",
    stock: Number(this.state.stock),
    fullPrice: Number(this.state.fullPrice),
    discount: Number(this.state.discount),
    favorites: false,
    price: this.state.fullPrice-(this.state.fullPrice/100*this.state.discount),
    reviews: 0
  };
  // initialize form control variables
  let list = this.props.list;
  let formOK = true;
  let tempErrorMessage = [];
  let tempErrorListArray = [];

  // check if prodId exist and is unique
  var found = false;
  for(var i = 0; i < list.length; i++) {
    if (list[i].prodId === tempItem.prodId) {
        found = true;
        break;
    }
  }
  if (found) {
    tempErrorMessage.push('The product ID should be unique');
    tempErrorListArray.push('prodId');
    formOK = false;
  }
 
  if (!tempItem.prodId){
    tempErrorMessage.push('Product ID is a required field');
    tempErrorListArray.push('prodId');
    formOK = false;
  }

// check if descriprion is at least 10 characters long
  if (10 > tempItem.description.length){
    tempErrorMessage.push('Description need to be at least 10 characters');
    tempErrorListArray.push('description');
    formOK = false;
  }

  // check if price is not 0
  if (0 >= tempItem.fullPrice){
    tempErrorMessage.push('price should not be 0');
    tempErrorListArray.push('fullPrice');
    formOK = false;
  }

  if (formOK) {
    tempErrorMessage=[];
    tempErrorListArray=[];
    this.setState({
      prodId: "", 
      fileName:"",
      description: "",
      stock: 0,
      fullPrice: 0,
      discount: 0,
      price:0,
      reviews: 0,
      errorMessage:[],
      errorListArray:[]
       }); // Erase value and form
      this.props.submitNewItem(tempItem); // Send new item to APP
    } else {
      this.setState({ 
        errorMessage : tempErrorMessage,
        errorListArray: tempErrorListArray
      });
      document.getElementById(tempErrorListArray[0]).focus(); // move focus on firs error on form AND remove focus from button
    }
  }
  render(){
    return (
      <div className="container mt-5 ">
      <div className="item-wrapper">
          <div className="item-inner-wrapper">
            {this.state.errorMessage.map(item=> (
              <p key={item} className="text-danger text-center">{item}</p>
              ))}
              <form id="add-item-form" className="row" noValidate>
              <div className="col-5 col-md-4 col-lg-3 d-flex align-items-center">
                  {/* <div className="item-image-wrapper">
                      <img className="item-image img-fluid" src="_images/phone1.jpg" alt="a phone"></img>
                  </div> */}
              </div>
              <div className="description-wrapper col-7 col-md-8 col-lg-9 my-3">
                  <div className="row full-height">
                      <div className="col-12 col-md-7 col-lg-8">
                          <label htmlFor='prodId' readOnly >Product ID :</label>
                          <input
                          type="text"
                          className= {this.state.errorListArray.includes('prodId') ? "form-control form-input-field form-error-message": "form-control form-input-field"} 
                          name="prodId"   
                          placeholder="ID nr"
                          value={this.state.prodId}
                          onChange={this.handleChange}
                          id="prodId" 
                          />
                          <label htmlFor='description' readOnly >Item description :</label>
                          <input
                          type="text"
                          className= {this.state.errorListArray.includes('description') ? "form-control form-input-field form-error-message": "form-control form-input-field"} 
                          name="description"   
                          placeholder="Description"
                          value={this.state.description}
                          onChange={this.handleChange}
                          id="description"  
                        />
                      </div>
                      <div className="item-detail col-12 col-md-5 col-lg-4 d-flex flex-column">
                          <div>
                              <label htmlFor='stock' readOnly >Stock :</label>
                              <input
                              type="number"
                              className="form-control form-input-field"
                              name="stock"   
                              value={this.state.stock}
                              onChange={this.handleChange} 
                              id="stock" 
                            />
                          </div>
                          <div>
                              <label htmlFor='stock' readOnly >Price :</label>
                              <input
                              type="number"
                              className={this.state.errorListArray.includes('fullPrice') ? "form-control form-input-field form-error-message": "form-control form-input-field"} 
                              name="fullPrice"   
                              value={this.state.fullPrice}
                              onChange={this.handleChange}  
                              id="fullPrice"
                            />
                          </div>
                          <div className="mb-3">
                              <label htmlFor='stock' readOnly >Discount % :</label>
                              <input
                              type="number"
                              className="form-control form-input-field"
                              name="discount"   
                              value={this.state.discount}
                              onChange={this.handleChange}  
                              id="discount"
                            />
                          </div>
                      <button onClick = {this.newItem} type="submit" className="btn-full-width btn btn-add-favorites mt-auto">Save</button>
                      </div> {/* col */}
                  </div> {/* row */}
              </div>{/* wrapper */}
              </form>
          </div>
      </div>
  </div>
    )
  }
}

export default AddItems;