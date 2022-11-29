"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var App_1 = require("./App");
test("renders learn app name", function () {
    (0, react_2.render)(<App_1["default"] />);
    var nameElement = react_2.screen.getByText(/One Day at a Time/i);
    expect(nameElement).toBeInTheDocument();
});
