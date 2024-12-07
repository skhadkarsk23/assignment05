const setData = require("../data/setData");
const themeData = require("../data/themeData");

console.log(setData);

let sets=[];

//	Initialize()
function initialize() {
    return new Promise((resolve, reject) => {
      try {
        setData.forEach(function (element1) {
          let set = themeData.find(function (element2) {
            return element1.theme_id === element2.id;
          });
  
          if (set) {
            sets.push({
              set_num: element1.set_num,
              name: element1.name,
              year: element1.year,
              theme_id: element1.theme_id,
              num_parts: element1.num_parts,
              img_url: element1.img_url,
              theme: set.name
            });
          }
        });
        resolve("sets array is now filled with objects."); 
      } catch (error) {
        reject(`Failed to initialize: ${error.message}`); 
      }
    });
  }
  
  function getAllSets() {
    return new Promise((resolve, reject) => {
      if (sets.length > 0) {
        resolve(sets); // Resolve with only the sets array
      } else {
        reject("No sets found.");
      }
    });
  }
  
  
  
// Return the "set" where "set_num" matches "setNum".
function getSetByNum(setNum) {

  return new Promise((resolve, reject) => {
    let foundSet = sets.find(s => s.set_num == setNum);

    if (foundSet) {
      resolve(foundSet)
    } else {
      reject("Unable to find requested set");
    }

  });

}
  
// Return sets where "theme" matches the "theme" parameter.
  function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
      let matchingSets = sets.filter(function (set) {
        return set.theme.toLowerCase().includes(theme.toLowerCase());
      });
  
      if (matchingSets.length > 0) {
        resolve(matchingSets);  // Resolve with matching sets
      } else {
        reject(`No sets found for theme: ${theme}`);
      }
    });
  }
  

  //Testing

  initialize()
  .then(() => {
    console.log("Sets array filled!");
    return getAllSets();
  })
  .then((allSets) => {
    console.log("All sets:", allSets);
    return getSetByNum("001-1");
  })
  .then((set) => {
    console.log("Set by number:", set);
    return getSetsByTheme("technic");
  })
  .then((setsByTheme) => {
    console.log("Sets by theme:", setsByTheme);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  
  //Export
  module.exports = {
    initialize,
    getAllSets,
    getSetByNum,
    getSetsByTheme
  };
  