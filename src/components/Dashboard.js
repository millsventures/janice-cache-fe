import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

export default function Dashboard(){
    let {action} = useParams();
    return (
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
              <img src="" height={50}/>
              <Link to="/view" className="navbar-brand">View Entries</Link>
              <Link to="/add" className="navbar-brand">Add Entries</Link>
              <Link to="/logs" className='navbar-brand'>View Logs</Link>
            </div>
          </nav>
          <div className="container mt-4">
            <div className="d-flex justify-content-center align-items-center">
                {
                    action === 'view' ? <EntriesPage/> 
                        : action === 'add' ? <NewItemPage/>
                        : action === 'logs' ? <LogPage/>
                        : action === 'edit' ? <EditEntryPage/>
                        : action === 'search' ? <EntryAction/>
                        : <h1>Dashboard</h1>
                /*
              <Routes>
                <Route path="/add" element={<NewItemPage />} />
                <Route path="/view" element={<EntriesPage />} />
                <Route path="/logs" element={<LogPage/>}/>
                <Route path="/edit/:uid" element={<EditEntryPage />} />
                <Route path="/search/:id" element={<EntryAction/>}/>
              </Routes>*/
                }
            </div>
          </div>
        </div>
    )
}


function NewItemPage(){
    const [id, setId] = useState('');
    const [objectId, setObjectId] = useState('');
    const [person, setPerson] = useState('');
    const [action, setAction] = useState('');
    const [actionVal, setActionVal] = useState('');
  
    const [message, setMessage] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const requestData = {
        id: id,
        obj_id: objectId,
        person: person,
        action: action,
        action_val: actionVal
      };
      console.log(requestData);
  
      axios.post(process.env.REACT_APP_API_URL, requestData)
        .then(response => {
          // Handle the response data here
          console.log(response.data);
          setMessage('Item added successfully'); // Set message in state
        })
        .catch(error => {
          // Handle the error here
          console.error(error);
      })
    }
  
    return(
      <>
        <div className="container">
          <h1 className="full-width-title">Add Item</h1>
          <div id="#message-banner" style={{display: message ? 'block' : 'none', backgroundColor: 'green', opacity: 0.5, padding: '10px', borderRadius: '5px' }}>{message ? message : ''}</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="idInput">Scan Tag ID</label>
              <input type="text" className="form-control" id="idInput" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="objectIdInput">Object ID</label>
              <input type="text" className="form-control" id="objectIdInput" value={objectId} onChange={(e) => setObjectId(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="personInput">Person</label>
              <input type="text" className="form-control" id="personInput" value={person} onChange={(e) => setPerson(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="actionInput">Action</label>
              <select className='form-control' id='actionInput' value={action} onChange={(e) => setAction(e.target.value)}>
                <option value="">Select an action</option>
                <option value="coupon">Coupon</option>
                <option value="video">Video</option>
                <option value="webpage">Webpage</option>
              </select>
            </div>
            <div className="form-group" style={{ display: action ? '' : 'none' }}>
              <label htmlFor="extraInput">
                {(() => {
                  switch (action) {
                    case "coupon":
                      return "Coupon Code";
                    case "video":
                      return "Video URL";
                    case "webpage":
                      return "Webpage URL";
                    default:
                      return "";
                  }
                })()}
              </label>
              <input type="text" className="form-control" id="extraInput" value={actionVal} onChange={(e) => setActionVal(e.target.value)} />
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </>
    )
  }
  
  function EditEntryPage() {
    const { uid } = useParams(); // Assuming you have a parameter named 'id' in the URL
    const [id, setId] = useState('');
    const [objectId, setObjectId] = useState('');
    const [person, setPerson] = useState('');
    const [action, setAction] = useState('');
    const [actionVal, setActionVal] = useState('');
  
    const [message, setMessage] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const requestData = {
        uid: id,
        obj_id: objectId,
        person: person,
        action: action,
        action_val: actionVal
      };
  
      axios.put(`${process.env.REACT_APP_API_URL}/${id}`, requestData)
        .then(response => {
          // Handle the response data here
          console.log(response.data);
          setMessage('Item updated successfully'); // Set message in state
        })
        .catch(error => {
          // Handle the error here
          console.error(error);
      })
    }
    // Fetch the entry data based on the 'id' parameter using axios or any other method
    useEffect(() => {
      // Fetch the entry data here
      // Example:
      axios.get(`${process.env.REACT_APP_API_URL}/${uid}`)
        .then(response => {
          // Handle the response and update the state or do any other necessary actions
          console.log(response.data);
          setId(response.data.uid);
          setObjectId(response.data.obj_id);
          setPerson(response.data.person);
          setAction(response.data.action);
          setActionVal(response.data.action_val);
        })
        .catch(error => {
            // Handle the error here
            console.error(error);
        });
    }, []);
  
    // Render the edit form or any other content for editing the entry
    return (
        <div className="container">
          <h1 className="full-width-title">Edit Item {`${uid}`}</h1>
          <div id="#message-banner" style={{display: message ? 'block' : 'none', backgroundColor: 'green', opacity: 0.5, padding: '10px', borderRadius: '5px' }}>{message ? message : ''}</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="idInput">Scan Tag ID</label>
              <input type="text" disabled className="form-control" id="idInput" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="objectIdInput">Object ID</label>
              <input type="text" className="form-control" id="objectIdInput" value={objectId} onChange={(e) => setObjectId(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="personInput">Person</label>
              <input type="text" className="form-control" id="personInput" value={person} onChange={(e) => setPerson(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="actionInput">Action</label>
              <select className='form-control' id='actionInput' value={action} onChange={(e) => setAction(e.target.value)}>
                <option value="">Select an action</option>
                <option value="coupon">Coupon</option>
                <option value="video">Video</option>
                <option value="webpage">Webpage</option>
              </select>
            </div>
            <div className="form-group" style={{ display: action ? '' : 'none' }}>
              <label htmlFor="extraInput">
                {(() => {
                  switch (action) {
                    case "coupon":
                      return "Coupon Code";
                    case "video":
                      return "Video URL";
                    case "webpage":
                      return "Webpage URL";
                    default:
                      return "";
                  }
                })()}
              </label>
              <input type="text" className="form-control" id="extraInput" value={actionVal} onChange={(e) => setActionVal(e.target.value)} />
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    );
  }
  
  function EntriesPage() {
    const [entries, setEntries] = useState([]);
  
    const handleDelete = (id) => {
      axios.delete(`${process.env.REACT_APP_API_URL}/${id}`)
        .then(response => {
          // Handle the response data here
          console.log(response.data);
          // Update the entries state by filtering out the deleted entry
          setEntries(entries.filter(entry => entry.uid !== id));
        })
        .catch(error => {
          // Handle the error here
          console.error(error);
      })
    }
  
    useEffect(() => {
      if (entries.length === 0) {
        axios.get(process.env.REACT_APP_API_URL)
          .then(res => {
            console.log(res);
            setEntries(res.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }, []);
  
    return (
      <>
        <div className='container'>
          <h2>Object Entries</h2>
          <div className="container-fluid"> {/* Add container-fluid class */}
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Object ID</th>
                  <th>Person</th>
                  <th>Action</th>
                  <th>Test</th>
                  <td>Edit</td>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.uid}>
                    <td>{entry.uid}</td>
                    <td>{entry.obj_id}</td>
                    <td>{entry.person}</td>
                    <td>{entry.action}</td>
                    <td>
                      <Link className='btn btn-sm btn-success' to={'/search/' + entry.uid}>Test</Link>
                    </td>
                    <td><Link className='btn btn-sm btn-warning' to={'/edit/'+entry.uid}>Edit</Link></td>
                    <td><a className='btn btn-sm btn-danger' onClick={() => handleDelete(entry.uid)}>Delete</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  
  function LogPage() {
    const [entries, setEntries] = useState([]);
  
    useEffect(() => {
      if (entries.length === 0) {
        axios.get(`${process.env.REACT_APP_API_URL}/logs`)
          .then(res => {
            console.log(res);
            setEntries(res.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }, []);
  
    function deleteLogs() {
      axios.delete(`${process.env.REACT_APP_API_URL}/logs`)
        .then(res => {
          console.log(res);
          setEntries([]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    return (
      <>
        <div className='container'>
          <h2>Object Scan Log</h2>
          <a className='btn btn-danger' onClick={() => deleteLogs()}>Delete All</a>
          <div className="container-fluid"> {/* Add container-fluid class */}
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Timestamp</th>
                  <th>GPS</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.uid}>
                    <td>{entry.uid}</td>
                    <td>{entry.timestamp}</td>
                    <td>{entry.gps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  
  function EntryAction(){
    const params = useParams();
    const [objectDetails, setObjectDetails] = useState({})
    const [latitude, setLat] = useState('');
    const [longitude, setLong] = useState('');
    
    useEffect( () => {
      // Get location if allowed
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position)
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
          },
          (error) => {
            console.error("Error getting GPS coordinates:", error);
            setLat(1);
            setLong(1);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLat(1);
        setLong(1);
      }
      // Submit request to get object & record GPS
      if(params.uid && latitude != '' && longitude != ''){
        axios.get(`${process.env.REACT_APP_API_URL}/${params.uid}?gps=${latitude},${longitude}`)
        .then((res) => {
          setObjectDetails(res.data);
        })
        .catch(error => {
          console.error(error);
        })
      }
    }, [latitude, longitude]);
    
    if(objectDetails.action === 'video'){
      let videoURL = objectDetails.action_val;
      const videoID = videoURL.match(/\/([^/]+)\/([^?]+)/)[2];
      console.log(videoID);
      return(
        <>
  
        <div className='container'>
        <br/>
          <iframe className="container-fluid vh-100 embed-responsive-item" src={`https://www.youtube.com/embed/${videoID}`} allowFullScreen></iframe>
        </div>
        </>
      )
    }
    else if(objectDetails.action === 'coupon'){
      return(
        <>
        <div className='container'>
        <h1>Congratulations! You found <i>{objectDetails.obj_id}</i>!</h1>
        <br/>
        <code>Here is your prize! {objectDetails.action_val}</code>
        </div>
        </>
      )
    }
    else if(objectDetails.action === 'webpage'){
      window.location.href = (objectDetails.action_val);
    }
    
    
  }