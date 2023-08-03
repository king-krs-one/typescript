import React, { useEffect, useState } from 'react';

// Define the type for the props passed to the wrapped component
interface WithLoadingProps {
  loading: boolean;
}

// Define the functional HOC
const withLoading = <P extends {}>(
  Component: React.ComponentType<P & WithLoadingProps>
): React.FC<P> => {
  const WithLoading: React.FC<P> = (props) => {
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

    return <Component {...props as P} loading={loading} />;
  };

  return WithLoading;
};

// Assume there is a LoadingSpinner component
const LoadingSpinner: React.FC = () => <div>Loading...</div>;

// Example usage with a component (e.g., MyComponent) that needs the loading behavior
interface MyComponentProps {
  data: string;
}

const MyComponent: React.FC<MyComponentProps & WithLoadingProps> = ({ data, loading }) => {
  return (
    <div>
      {loading ? <LoadingSpinner /> : <div>{data}</div>}
    </div>
  );
};

const MyComponentWithLoading = withLoading(MyComponent);

export default MyComponentWithLoading;
// Usage of the HOC-wrapped component:
// <MyComponentWithLoading data="Some data" />



