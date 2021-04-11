import React, {useState, useEffect} from 'react';
import Job from "./Job";
import * as Joi from "joi";
import axios from 'axios';

const JobsList = () => {

    const [state, setState] = useState([]);

    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState("");


    const schema = Joi.object({
    name: Joi.string().required(),
    company: Joi.string().required(),
    salary: Joi.string().required(),
    city: Joi.string().required(),
    });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const { error } = validate();
      if (!error) {
        console.log("Form submitted");
        console.log(inputs);
        /* console.log(state.offers); */
        axios.post('/offers/postOffer', inputs)
        .then(function (res) {
          console.log("bien");
          getData();
        }
        );
        
      } else {
        console.log(error);
        setErrors(error);
      }
    };
  
    const handleInputChange = (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    };
  
    const validate = () => {
      return schema.validate(inputs);
    };

  useEffect(() => {
    /* const url = "/offers";
    fetch(url)
      .then(res => {
        return res.json();
      }).then(offers => {
        setState({ offers })
      }); */
      getData();
  },[])

  const getData = () => {
    const url = "/offers";
    fetch(url)
      .then(res => {
        return res.json();
      }).then(offers => {
        setState({ offers })
      });
  }

  return (
    state.offers?(
    <div>
	  { state.offers.map((e, i) => <Job key={i} offer={e} />) }
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
    </div>):<></>
  )
}
export default JobsList;