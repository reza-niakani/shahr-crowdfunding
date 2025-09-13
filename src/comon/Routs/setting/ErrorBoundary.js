/* eslint-disable no-unused-vars */
// src/comon/Routs/setting/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-white via-accent-900 to-accent-600 px-4 text-accent-1100 text-center gap-y-5">
          <p className="text-lg mb-4">صفحه به درستی دریافت نشده است، دوباره تلاش کنید</p>
          <button
            onClick={this.handleReload}
            className="relative px-6 py-2 bg-accent-600 hover:bg-accent-1100 text-white font-semibold rounded-lg shadow-md transition inline-flex items-center overflow-visible">
            <span className="absolute right-0 -top-[5px] inline-flex h-[0.6rem] w-[0.6rem] rounded-full bg-accent-1100 animate-ping"></span>
            <span className="relative">تلاش مجدد</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
