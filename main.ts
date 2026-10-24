import {
    EnrollmentStatus,
    Enrollee,
    EligibilityReport
} from "./types";

import getStatus, {
    computeAverage
} from "./gradeUtils";

const enrollees: Enrollee[] = [
    { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
    { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
    { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
    { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
    { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 }
];

let batchId: string | number = "IT313-2026";
if (typeof batchId === "string") {
    console.log(`Batch ID: ${batchId}`);
} else {
    console.log(`Batch ID: ${batchId}`);
}

function getEnrollees(): Promise<Enrollee[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 1000);
    });
}

function groupBy<T>(
    items: T[],
    keyFn: (item: T) => string
): Record<string, T[]> {
    return items.reduce(
        (groups: Record<string, T[]>, item: T) => {
            const key = keyFn(item);

            if (!groups[key]) {
                groups[key] = [];
            }

            groups[key].push(item);

            return groups;
        },
        {}
    );
}

async function generateReport(): Promise<void> {
    try {
        const students: Enrollee[] = await getEnrollees();

        const reports: EligibilityReport[] = students.map(
            (student: Enrollee): EligibilityReport => {
                const average: number = computeAverage(
                    student.prelim,
                    student.midterm,
                    student.final
                );

                const status: EnrollmentStatus = getStatus(average);

                return {
                    name: student.name,
                    average: average,
                    status: status,
                    ...(status === EnrollmentStatus.Probation
                        ? { remarks: "Needs consultation" }
                        : {})
                };
                    });

        const groupedReports: Record<string, EligibilityReport[]> =
            groupBy(
                reports,
                (report: EligibilityReport): string => report.status
            );

        const classAverage: number =
            reports.reduce(
                (total: number, report: EligibilityReport): number => {
                    return total + report.average;
                },
                0
            ) / reports.length;

        const passingCount: number =
            groupedReports[EnrollmentStatus.Passing]?.length ?? 0;

                    console.log(
            "\n=== IT313 Enrollment Eligibility Report (TypeScript) ==="
        );

        reports.forEach(
            (report: EligibilityReport): void => {
                const averageText: string =
                    report.average.toFixed(2);

                const remarks: string =
                    report.remarks
                        ? ` - ${report.remarks}`
                        : "";

                console.log(
                    `${report.name} - Average: ${averageText} - ${report.status}${remarks}`
                );
            }
        );

        console.log(
            `Class Average: ${classAverage.toFixed(2)}`
        );

        console.log(
            `Passing: ${passingCount} / ${reports.length}`
        );

            } catch (error: unknown) {
        console.error(
            `Failed to retrieve enrollee data: ${error}`
        );
    }
}

generateReport();