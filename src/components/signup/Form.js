import React from 'react';
import Button from './Button';


const Form = () => (
  <div>
    <form className="form-signup">
      <h4>Signup with your email</h4>
      <div className="form-group input-container">
        <i className="fa fa-user prefix icon" />
        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="FULLNAME" />
      </div>
      <div className="form-group input-container">
        <i className="fas fa-envelope icon" />
        <input type="email" className="form-control" id="formGroupExampleInput" placeholder="EMAIL" />
      </div>
      <Button text="Signup" btnClass="btn-rounded-blue" />
    </form>
  </div>
);

export default Form;
