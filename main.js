"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const gradeUtils_1 = __importStar(require("./gradeUtils"));
const enrollees = [
    { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
    { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
    { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
    { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
    { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 }
];
let batchId = "IT313-2026";
if (typeof batchId === "string") {
    console.log(`Batch ID: ${batchId}`);
}
else {
    console.log(`Batch ID: ${batchId}`);
}
function getEnrollees() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 1000);
    });
}
function groupBy(items, keyFn) {
    return items.reduce((groups, item) => {
        const key = keyFn(item);
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
}
async function generateReport() {
    try {
        const students = await getEnrollees();
        const reports = students.map((student) => {
            const average = (0, gradeUtils_1.computeAverage)(student.prelim, student.midterm, student.final);
            const status = (0, gradeUtils_1.default)(average);
            return {
                name: student.name,
                average: average,
                status: status,
                ...(status === types_1.EnrollmentStatus.Probation
                    ? { remarks: "Needs consultation" }
                    : {})
            };
        });
        const groupedReports = groupBy(reports, (report) => report.status);
        const classAverage = reports.reduce((total, report) => {
            return total + report.average;
        }, 0) / reports.length;
        const passingCount = groupedReports[types_1.EnrollmentStatus.Passing]?.length ?? 0;
        console.log("\n=== IT313 Enrollment Eligibility Report (TypeScript) ===");
        reports.forEach((report) => {
            const averageText = report.average.toFixed(2);
            const remarks = report.remarks
                ? ` - ${report.remarks}`
                : "";
            console.log(`${report.name} - Average: ${averageText} - ${report.status}${remarks}`);
        });
        console.log(`Class Average: ${classAverage.toFixed(2)}`);
        console.log(`Passing: ${passingCount} / ${reports.length}`);
    }
    catch (error) {
        console.error(`Failed to retrieve enrollee data: ${error}`);
    }
}
generateReport();
