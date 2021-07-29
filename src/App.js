import logo from './logo.svg';
import './App.css';
import { Component, useEffect } from 'react';
import { useState } from 'react';


const App = () => {
  let httpGet = window.location.protocol;
  const [news, setNews] = useState([]);
  const [searcQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState(`${httpGet}//hn.algolia.com/api/v1/search?query=react`);
  const [laoding, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
    .then(result => result.json())
    // .then(data => console.log(data))
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log('Error aaya hai'))
  }

  useEffect(()=>{
    fetchNews();
  }, [url])

  const handleChange = (evnt) => {
    setSearchQuery(evnt.target.value);
    // setNews(data.hits)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searcQuery}`)
  }

  return(
    <div>
      <h2>Hi</h2>
      {laoding ? <h1>Loading.....</h1> : 
      ""
      }
      <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searcQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
      {
      news.map((nItem, idx)=>{
        return(
          <p key={idx}>{nItem.title}</p>
        )
      })
      }
      </div>
    </div>
  )


}

// class App extends Component{
//   state = {
//     count : 0
//   } 

//   counterIn = () => {
//     this.setState({
//       count : this.state.count + 1
//     })
//   }

//   render(){
//       return (
//       <div className="App">
//         <h1>{this.state.count}</h1>
//         <button onClick={this.counterIn}>Increase counter</button>
//       </div>
//     );
//   }
// }

// function App(){
//   const[counter, setCounter] = useState(0);

//   // useEffect(()=>{
//   // })
//   document.title = `counter ${counter}`

//   const counterIn = () => {
//     setCounter( counter + 1)
//   }

//   return (
//       <div className="App">
//         <h1>{counter}</h1>
//       <button onClick={counterIn}>Increase counter</button>
//     </div>
//   );
// }


export default App;
