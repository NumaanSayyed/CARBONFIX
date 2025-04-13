// import React from "react";

// const Header: React.FC = () => {
//   return (
//     <header className="mb-12">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-800 mb-3">
//             Welcome, James Anderson! <span className="wave">👋</span>
//           </h1>
//           <p className="text-lg text-gray-600">Manage & Verify Proofs for Carbon Credit Projects</p>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";

// Define the props type for the Header component
interface HeaderProps {
  adminDetails: {
    first_name: string;
    last_name: string;
  } | null;
}

const Header: React.FC<HeaderProps> = ({ adminDetails }) => {
  if (!adminDetails) {
    return <div>Loading...</div>; // You can add a fallback message if the data is not available yet.
  }

  return (
    <header className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          {/* Display the admin's first and last name dynamically */}
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome, {adminDetails.first_name} {adminDetails.last_name}!{" "}
            <span className="wave">👋</span>
          </h1>
          <p className="text-lg text-gray-600">Manage & Verify Proofs for Carbon Credit Projects</p>
        </div>
      </div>
    </header>
  );
};

export default Header;