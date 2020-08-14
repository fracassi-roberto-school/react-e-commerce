import React, {Component} from 'react';
import '../css/App.css';
import { AiFillHeart , AiOutlineHeart } from 'react-icons/ai'


class ListItems extends Component {

  render(){
    let list = this.props.list;
    list.map(item => {
      item.path = './images/products/' + item.fileName; //create path to images
      item.favorites ? item.favorite="item-favorite" : item.favorite="item-no-favorite"; //switch favorite CSS class for different display
      item.reviews100 = item.reviews * 20; // reviews are stored on a 0-5 base, bootstrap need a %
      if (0 === item.stock ) {
        item.stockMessage = "Not availlable"
        } else if (1 === item.stock ) {
            item.stockMessage = "only 1 piece"
          } else if ( 5 > item.stock) {
              item.stockMessage = "only " + item.stock + " pcs"
              } else {
                item.stockMessage = "availlable"
                };
      return item;
    });

    return (
      <>
      {list.map(item => ( 
        <div key={item.prodId} className="container mt-5 ">
          <div className="container item-wrapper">
              <div className="row item-inner-wrapper">
                  {/* item thumbnail with favorite icon*/}
                  <div className="col-5 col-md-4 col-lg-3 d-flex align-items-center">
                      <div className="item-image-wrapper">
                          <img className="item-image img-fluid" src={item.path} alt="a phone"></img>
                          <span className={item.favorite}> {item.favorites ? <AiFillHeart /> : <AiOutlineHeart/>}</span>
                      </div>
                  </div>
                   {/* description and user reviews */}
                  <div className="description-wrapper col-7 col-md-8 col-lg-9 my-3">
                      <div className="row full-height">
                          <div className="item-description col-12 col-md-7 col-lg-8 d-flex flex-column">
                              <p className="mt-3 text-center item-description">{item.description}</p>
                              <div className="d-sm-flex mt-auto">
                                  <p className="item-review mb-0">User rating: </p>
                                  <div className="progress item-user-rating">
                                      <div className="progress-bar" role="progressbar" style={{width: item.reviews100 + '%'}} aria-valuenow={item.reviews} aria-valuemin="0" aria-valuemax="5">{item.reviews}/5</div>
                                  </div>
                              </div>
                          </div>
                          {/* Availlability / price / buttons */}
                          <div className="item-detail col-12 col-md-5 col-lg-4 d-flex flex-column">
                              <p className={item.stockMessage === "Not availlable" ? "item-stock mt-3 no-stock" : "item-stock mt-3"}>Stock: {item.stockMessage}</p>
                              {item.fullPrice === item.price ? '' : <p className="item-full-price"><del>Original price: {item.fullPrice}</del></p>}
                              <p className="item-price">Price: {item.price}</p>
                              { "admin" === this.props.template ? <> 
                                <button type="button" className="btn-full-width btn btn-erase mb-3 mt-auto"
                                  onClick = {() => this.props.deleteItem(item)}>
                                  Erase product</button>
                                <button type="button" className="btn-full-width btn btn-add-favorites mb-3 mt-auto">
                                  Change</button>
                                  </> : ''}
                              { "list" === this.props.template ? <>
                                <button type="button" className="btn-full-width btn btn-add-chart mb-3 mt-auto">Add to chart</button>
                                <button type="button" className="btn-full-width btn btn-add-favorites">Add to favorites</button> 
                                </> : ''
                                }
                          </div>
                      </div>
                  </div>
              </div> {/* row*/}
          </div> {/* item wrapper*/}
        </div> // first container
     ))} {/* list.map */}
  </>
    ) // return 
  } // render
} // class ListItems


export default ListItems;