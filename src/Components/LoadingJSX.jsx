import React, { useEffect, useState } from 'react';

const withLoading = (Component) => {
  const WithLoading = (props) => {
    const [loading, setLoading] = useState(true);

    // Simulate an asynchronous operation using useEffect
    useEffect(() => {
      // You can perform an actual asynchronous operation here, e.g., API request.
      // For demonstration purposes, let's use a setTimeout to mimic an async task.
      const fakeAsyncTask = setTimeout(() => {
        setLoading(false); // Set loading to false after the async task is completed.
      }, 2000); // Simulate a 2-second delay for the loading state.

      // Cleanup the timeout to avoid memory leaks when the component unmounts.
      return () => clearTimeout(fakeAsyncTask);
    }, []);

    return loading ? <LoadingSpinner /> : <Component {...props} />;
  };

  return WithLoading;
};

// Assume there is a LoadingSpinner component
const LoadingSpinner = () => <div>Loading...</div>;

// Example usage with a component (e.g., MyComponent) that needs the loading behavior
const MyComponent = ({ data }) => {
  return <div>{data}</div>;
};

const MyComponentWithLoading = withLoading(MyComponent);


export default MyComponentWithLoading
// Usage of the HOC-wrapped component:
// <MyComponentWithLoading data="Some data" />
