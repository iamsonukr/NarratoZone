// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { createCart } from './pathToYourActions'; // Assuming teams are stored in the same structure

// const TeamManagement = () => {
//   const [newTeamName, setNewTeamName] = useState('');
//   const teams = useSelector(state => state.carts); // Replace 'carts' with the appropriate key if different
//   const dispatch = useDispatch();

//   const handleCreateTeam = () => {
//     if (newTeamName.trim() === '') return;
//     // Dispatch action to create a new team (cart)
//     dispatch(createCart(newTeamName));
//     setNewTeamName(''); // Clear the input field after creating the team
//   };

//   return (
//     <div>
//       <h2>Team Management</h2>
//       <div>
//         <input
//           type="text"
//           value={newTeamName}
//           onChange={(e) => setNewTeamName(e.target.value)}
//           placeholder="Enter team name"
//         />
//         <button onClick={handleCreateTeam}>Create Team</button>
//       </div>

//       <div>
//         <h3>Existing Teams</h3>
//         {Object.keys(teams).length === 0 ? (
//           <p>No teams created yet.</p>
//         ) : (
//           Object.entries(teams).map(([teamName, members]) => (
//             <div key={teamName}>
//               <h4>{teamName}</h4>
//               {members.length === 0 ? (
//                 <p>No members in this team.</p>
//               ) : (
//                 <ul>
//                   {members.map(member => (
//                     <li key={member.id}>
//                       {member.first_name} {member.last_name} ({member.domain})
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeamManagement;
