import React, { Component } from 'react';
import './reviewCarousel.scss';

const reviewObject = {
  reviews:
  [
    {
      review:'David is a professional who is very knowledgeable and able to find solutions to the tasks presented to him. Highly recommended.',
      from:'Upwork client',
      link:'https://www.upwork.com/fl/davidcook5'
    },
    {
      review:'Another completed project. Very responsive as always. Nice work. Till our next project.',
      from:'Upwork client',
      link:'https://www.upwork.com/fl/davidcook5'
    },
    {
      review:'Very skilled freelancer and easy to work with.You must try him you wont regret it. Highly recommended!!!',
      from:'Upwork client',
      link:'https://www.upwork.com/fl/davidcook5'
    },
    {
      review:'AWESOME work!!! timely efficient.. quick to tweak..',
      from:'Upwork client',
      link:'https://www.upwork.com/fl/davidcook5'
    },
    {
      review:`He was able to deliver the final project after another contractor wasn't able to. This meant he needed to understand what was already written and then from there sort out the pieces to finalize which he did successfully.`,
      from:'Upwork client',
      link:'https://www.upwork.com/fl/davidcook5'
    },
  ]
};

export default class ReviewCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews:reviewObject.reviews,
      reviewIndex: 0,
    }
    this.changeReview = this.changeReview.bind(this);
    this.intervalId = null;
  }
  componentDidMount() {
    this.intervalId = setInterval(this.changeReview,3500);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  changeReview() {
    
    let {reviewIndex, reviews } = this.state;
    console.log(reviews);
    // debugger;
    reviewIndex = reviewIndex < reviews.length - 1 ? ++reviewIndex : 0;
    this.setState({reviewIndex:reviewIndex});
  }
  createReviewElements(){
    const {reviews} = this.state;
    const elements = reviews.map((review, index) => {
      return (
        <div 
          className={`review card ${index === this.state.reviewIndex ? 'show':''}`}
          key={`review-card-${index}`}>
          <p className="review-text">{review.review}</p>
          <p className="right-align "><a href={review.link} className="review-link teal">{review.from}</a></p>
        </div>
      )
    });
    return elements;
  }
  render() {
    return (
      <div>
        {this.createReviewElements()}
      </div>
    )
  }
}
