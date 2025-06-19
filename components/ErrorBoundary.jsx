// 'use client';

// import { Component } from 'react';

// export default class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   render() {
//     const { hasError, error } = this.state;

//     if (hasError) {
//       return (
//         <div className="p-10 text-center">
//           <h2 className="text-2xl font-bold text-red-500">Oops! Something went wrong.</h2>
//           <p className="mt-2 text-gray-600">{error?.message}</p>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }


