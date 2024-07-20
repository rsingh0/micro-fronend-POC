import React from "react";

//Error Boundary (Help in case Host App is down)
export default class SafeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log('Error Boundry', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    console.log("Has ErrorBoundary Found Error", this.state.hasError);
    if (this.state.hasError) {
      return <h1>Something Went Wrong!</h1>;
    }

    return this.props.children;
  }
}
