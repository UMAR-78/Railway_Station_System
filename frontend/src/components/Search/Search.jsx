import React from "react";
import "./Search.css";

const SearchSection = () => {
  return (
    <div>
      <div className="TextSection">
        <h1>Find your next stay</h1>
        <p>Find the best and most affordable train routes in Pakistan</p>
      </div>

      <form className="SearchForm">
        <div className="formRow">
          <div className="formField">
            <label>From:</label>
            <input type="text" name="from" placeholder="Enter origin" />
          </div>
          <div className="formField">
            <label>To:</label>
            <input type="text" name="to" placeholder="Enter destination" />
          </div>
        </div>

        <div className="formRow">
          <div className="formField">
            <label>Departure Date:</label>
            <input
              type="date"
              name="departureDate"
              placeholder="Select departure date"
            />
          </div>
          <div className="formField">
            <label>Return Date:</label>
            <input
              type="date"
              name="returnDate"
              placeholder="Select return date"
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formField">
            <label>Adults:</label>
            <input type="number" name="adults" placeholder="0" />
          </div>
          <div className="formField">
            <label>Kids:</label>
            <input type="number" name="kids" placeholder="0" />
          </div>
        </div>

        <div className="formRow">
          <div className="formField">
            <label>Trip Type:</label>
            <select name="tripType">
              <option value="oneWay">One Way</option>
              <option value="twoWay">Two Way</option>
            </select>
          </div>
        </div>
        
        <div className="formRow">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchSection;
