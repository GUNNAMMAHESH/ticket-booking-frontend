// import { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";

// function AllMovies() {
//   const [movies, setMovies] = useState([]);

//   async function getMovies() {
//     try {
//       const response = await axiosInstance.get("events/allevents");
//       setMovies(response.data);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   }

//   useEffect(() => {
//     getMovies();
//   }, []);

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//     const formattedTime = date.toLocaleTimeString("en-GB", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     return `${formattedDate} ${formattedTime}`;
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="text-orange-400 text-3xl font-semibold mb-6">Movies</div>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-4">
//         {movies.length > 0 ? (
//           movies.map((movie, index) => (
//             <div
//               key={index}
//               className="bg-orange-400 min-h-[300px] p-4 text-white text-lg font-semibold rounded-lg flex flex-col justify-end  hover:bg-orange-500 transition cursor-pointer"
//             >
//               <div>
//                  {movie.EventName}
//               </div>
//               <div>
//                 {formatDateTime(movie.date)}
//               </div>
//               <div>
//                 {movie.location}
//               </div>
//               <div>
//                 {movie.price}
//               </div>
//               <div>
//                 {movie.totalSeats}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500 text-lg">No movies available</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AllMovies;
