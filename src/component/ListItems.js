import React, {Component} from 'react';
import '../css/App.css';
import { AiFillHeart , AiOutlineHeart } from 'react-icons/ai'


class ListItems extends Component {

  render(){
    let list = this.props.list;
    list.map(item => {
      item.path = './images/products/' + item.fileName;
      item.favorites ? item.favorite="item-favorite" : item.favorite="item-no-favorite";
      item.reviews100 = item.reviews * 20;
      if (0 === item.stock ) {
        item.stock = "Not availlable"
        } else if (1 === item.stock ) {
            item.stock = "only 1 piece"
          } else if ( 5 > item.stock) {
              item.stock = "only " + item.stock + " pcs"
              } else {
                item.stock = "availlable"
                };
      return item;
    });

    return (
      <div>
      {list.map(item => ( 
        <div key={item.prodId} className="container mt-5 ">
          <div className="container item-wrapper">
              <div className="row item-inner-wrapper">
                  <div className="col-5 col-md-4 col-lg-3 d-flex align-items-center">
                      <div className="item-image-wrapper">
                          <img className="item-image img-fluid" src={item.path} alt="a phone"></img>
                          <span className={item.favorite}> {item.favorites ? <AiFillHeart /> : <AiOutlineHeart/>}</span>
                      </div>
                  </div>
                  <div className="description-wrapper col-7 col-md-8 col-lg-9 my-3">
                      <div className="row full-height">
                          <div className="item-description col-12 col-md-7 col-lg-8 d-flex flex-column">
                              <p className="mt-3 text-center item-description">{item.description}</p>
                              <div className="d-sm-flex mt-auto">
                                  <p className="item-review mb-0">User rating: </p>
                                  <div className="progress item-user-rating">
                                      <div className="progress-bar bg-success" role="progressbar" style={{width: item.reviews100 + '%'}} aria-valuenow={item.reviews} aria-valuemin="0" aria-valuemax="5">{item.reviews}/5</div>
                                  </div>
                              </div>
                          </div>
                          <div className="item-detail col-12 col-md-5 col-lg-4 d-flex flex-column">
                              <p className={item.stock === "Not availlable" ? "item-stock mt-3 no-stock" : "item-stock mt-3"}>Stock: {item.stock}</p>
                              {item.fullPrice === item.price ? '' : <p className="item-full-price"><del>Original price: {item.fullPrice}</del></p>}
                              <p className="item-price">Price: {item.price}</p>
                              <button type="button" className="btn-full-width btn btn-primary mb-3 mt-auto">Add to chart</button>
                              <button type="button" className="btn-full-width btn btn-outline-primary">Add to favorites</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
     ))}
  </div>
    )
  }
}

export default ListItems;