import React, { useState } from "react";
import { useNavigate } from "react-router";
import DateTimePicker from 'react-datetime-picker';
import emailjs from 'emailjs-com';

export default function Create() {
 const [form, setForm] = useState({
  name: "",
  college: "",
  year: "",
  gender: "",
  branch: "",
  date: "",
  place: "",
  description:"",
 });
 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };

   await fetch("http://localhost:5050/complaint", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   let emailData = {
    from_name: "Admin",
    user_name: "Admin",
    user_email: "vnikitha25@gmail.com",
    message:  JSON.stringify(newPerson)
  }
  emailjs.send('service_antiragproj', 'template_antiragproj', emailData, '0HurbrbrVOHv5h_Ke')
      .then((result) => {
          window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
      }, (error) => {
          console.log(error.text);
      });

   setForm({ name: "", college: "", year: "", gender: "", branch : "", date : "", place: "", description: "" });
   navigate("/");
 }
//  const [DateValue, onDateChange] = useState(new Date(), () => {
//   updateForm({ date: DateValue })
//  });

 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Complaint</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="college">College</label>
         <input
           type="text"
           className="form-control"
           id="college"
           value={form.college}
           onChange={(e) => updateForm({ college: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="year">Year</label>
         <input
           type="text"
           className="form-control"
           id="year"
           value={form.year}
           onChange={(e) => updateForm({ year: e.target.value })}
         />
       </div>
       <div className="form-group">
       <label htmlFor="gender">Gender  </label>
       <br/>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="genderOptions"
             id="genderMale"
             value="Male"
             checked={form.gender === "Male"}
             onChange={(e) => updateForm({ gender: e.target.value })}
           />
           <label htmlFor="genderMale" className="form-check-label">Male</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="genderOptions"
             id="genderFemale"
             value="Female"
             checked={form.gender === "Female"}
             onChange={(e) => updateForm({ gender: e.target.value })}
           />
           <label htmlFor="genderFemale" className="form-check-label">Female</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="genderOptions"
             id="genderOthers"
             value="Others"
             checked={form.gender === "Others"}
             onChange={(e) => updateForm({ gender: e.target.value })}
           />
           <label htmlFor="genderOthers" className="form-check-label">Others</label>
         </div>
       </div>
       <div className="form-group">
         <label htmlFor="branch">Branch</label>
         <input
           type="text"
           className="form-control"
           id="branch"
           value={form.branch}
           onChange={(e) => updateForm({ branch: e.target.value })}
         />
       </div>
       {/* <div className="form-group">
          <DateTimePicker
           className="form-control"
           id="date"
           value={form.date}
           onChange={onDateChange} />
       </div> */}
       <div className="form-group">
         <label htmlFor="place">Place of Incident</label>
         <input
           type="text"
           className="form-control"
           id="place"
           value={form.place}
           onChange={(e) => updateForm({ place: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Description</label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="File Complaint"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
