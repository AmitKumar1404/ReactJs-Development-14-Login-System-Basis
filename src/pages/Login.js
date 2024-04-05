import React, { useState } from 'react'

export default function Login() {
  // state (property which hold the data)
  // const [variableName, setFunction] = useState(initialValue);
  // 1. State Variables
  // 2. Function definations
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  let submit = ()=>{
    console.log('Submitted');

    let handleChangeE = (elem)=>{
      console.log('element',elem)
    }
    let handleChangeP = (elem)=>{
      console.log('element',elem)
    }
    let data = {
      "email":email,
      "password":password
    }
    // fetch().then().catch();
    fetch('http://65.109.113.62:3000/api/auth/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res)=>{
      console.log('res',res);
      if(res.status === 404)
      {
        alert('Invalid Credentails');
      }else{
        return res.json();
      }
    }).then((data)=>{
      try{
        console.log('data',data)
        if(data.code===200)
        {
          console.log('token',data.data.token);
          // Now store this userData to localStorage
          window.localStorage.setItem('userData',JSON.stringify(data.data));
          window.localStorage.setItem('role', data.role);
          window.localStorage.setItem('token',JSON.stringify(data.token));
          if(data.data.role === 'admin')
          {
            window.location.href = '/admindashboard';
          }
          if(data.data.role === 'enduser')
          {
            window.location.href = '/enduserdashboard';
          }
          if(data.data.role === 'reseller')
          {
            window.location.href = '/resellerdashboard';
          }
          if(data.data.role === 'account_manager')
          {
            window.location.href = '/accountmanagerdashboard';
          }
        }else{
          alert("Invalid Credentials");
        }
      }catch(error){
      //  alert("Invalid Credentials");
      }
      
    }).catch((err)=>{
      console.log('error',err)
    });
  }
// 3. Return statements
// Every function return something
  return (
    <main className=''>
      <form className='col-6 offset-3 mt-5'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input autoFocus type="email" name='email' value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)} />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name='password' value={password} className="form-control" id="exampleInputPassword1" onChange={e => setPassword(e.target.value)}/>
        </div>
        <button type="button" onClick={submit} className="btn btn-primary">Submit</button>
      </form>
    </main>
  )
}
