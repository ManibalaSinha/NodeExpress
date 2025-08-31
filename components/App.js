// App.js
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  return (
    <div>
      <h1>Hello from React</h1>
    </div>
  );
}

export default App;
