import jsonfile from "jsonfile";
export const writeUserToJsonFile = (user) => {
    jsonfile.writeFile('./data/db.json', user, function (err) {
    });
};
