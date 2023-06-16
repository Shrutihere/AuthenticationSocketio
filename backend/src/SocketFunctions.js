// Sample database structure
// const database = [
//   {
//     username: "",
//     password: "",
//     email: "",
//     images: [
//       {
//         image_url: "",
//         _ref: "",
//       },
//     ],
//   },
// ];

let database = [];

const registerUser = ({ username, email, password }) => {
  let error, user;
  /* Finish this function to add a new user to the database array. If the user is already in the database array, an error will be thrown. If the function works, it gives back an object with the user key and the value as the data. If user already exists, throw an object with "User already exists!" as the value and "error" as the key. */
  return { error, user };
};

const loginUser = ({ username, password }) => {
  let error, user;
  /* Complete this function to check if the user is in the database array. If the user is already in the database array, return an object with the key "_email" and the value as the email. If user doesn't exist, throw an object with the key "Incorrect credentials" and the value "error." */
  return { error, user };
};

const uploadPhoto = ({ email, photoURL }) => {
  let result = database.filter((user) => user.email === email);
  if (result.length === 0) {
    return { error: "User not found!" };
  } else {
    const newImage = {
      image_url: photoURL,
      _ref: email,
    };
    result[0]?.images.unshift(newImage);
    return { image: newImage };
  }
};

const allPhotos = () => {
  let images = [];
  for (let i = 0; i < database.length; i++) {
    images = images.concat(database[i]?.images);
  }
  return { images };
};

const clearDatabase = () => {
  database = [];
};

module.exports = {
  registerUser,
  loginUser,
  uploadPhoto,
  allPhotos,
  clearDatabase,
};
