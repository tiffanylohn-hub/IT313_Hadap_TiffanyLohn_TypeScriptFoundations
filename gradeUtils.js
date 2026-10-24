"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeAverage = computeAverage;
exports.default = getStatus;
const types_1 = require("./types");
function computeAverage(prelim, midterm, final) {
    return (prelim + midterm + final) / 3;
}
function getStatus(average) {
    if (average >= 75) {
        return types_1.EnrollmentStatus.Passing;
    }
    return types_1.EnrollmentStatus.Probation;
}
