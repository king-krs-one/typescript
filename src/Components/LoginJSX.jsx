import { useState, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';


// HOC to add loading functionality to a component
const withLoading = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
      setLoading(true);
    };

    const stopLoading = () => {
      setLoading(false);
    };

    return (
      <WrappedComponent
        {...props}
        loading={loading}
        startLoading={startLoading}
        stopLoading={stopLoading}
      />
    );
  };
};


const simulateLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    // Simulate a delayed response using setTimeout
    setTimeout(() => {
      const randomSuccess = Math.random() < 0.8; // 80% success rate
      if (randomSuccess) {
        const token = "your_simulated_token";
        const message = {
          type: "success",
          text: "Login successful!"
        };
        const user = { id: 0, name: username };
        resolve({ user, token, message });
      } else {
        const errorMessage = "Invalid username or password";
        reject(new Error(errorMessage));
      }

      
      
    }, 1500); // Simulate a 1.5-second delay
  });
};

const LoginComponent = (props) => {

  const { setUser, setToken, setMessage } = useContext(GlobalContext)
  const { loading, startLoading, stopLoading } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      startLoading(); // Start loading before making the request
      const response = await simulateLogin(username, password);

      // Store the token in local storage or a more secure method like cookies
      localStorage.setItem("token", response.token);

      setUser(response.user)
      setToken(response.token)
      debugger
      setMessage(response.message)

      // We dont need anymore a callback function 
      // to pass back the session details to the App component

      // props.handleLogin({
      //   user: response.user,
      //   token: response.token,
      //   message: {
      //     type: "success",
      //     text: response.message,
      //   },
      // });
    } catch (error) {
      setUser(null)
      setToken(null)
      debugger
      setMessage({
        type: "error",
        text: error.message
      })

    } finally {
      stopLoading(); // Stop loading after the request completes (success or error)
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default withLoading(LoginComponent);