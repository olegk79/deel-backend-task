/*require routes*/

const routesList = [
    "registerRoute", "getUser","postUser"
];

const routesArr = [];

routesList.forEach(route => {
    routesArr.push(require(`./${route}`));
});


module.exports = routesArr;