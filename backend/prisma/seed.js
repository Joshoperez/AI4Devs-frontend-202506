"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var company1, interviewFlow1, interviewFlow2, position1, position2, candidate1, candidate2, candidate3, interviewType1, interviewType2, interviewType3, interviewStep1, interviewStep2, interviewStep3, employee1, employee2, application1, application2, application3, application4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.company.create({
                        data: {
                            name: 'LTI'
                        }
                    })];
                case 1:
                    company1 = _a.sent();
                    return [4 /*yield*/, prisma.interviewFlow.create({
                            data: {
                                description: 'Standard development interview process'
                            }
                        })];
                case 2:
                    interviewFlow1 = _a.sent();
                    return [4 /*yield*/, prisma.interviewFlow.create({
                            data: {
                                description: 'Data science interview process'
                            }
                        })];
                case 3:
                    interviewFlow2 = _a.sent();
                    return [4 /*yield*/, prisma.position.create({
                            data: {
                                title: 'Senior Full-Stack Engineer',
                                description: 'Develop and maintain software applications.',
                                status: 'Open',
                                isVisible: true,
                                location: 'Remote',
                                jobDescription: 'Full-stack development',
                                companyId: company1.id,
                                interviewFlowId: interviewFlow1.id,
                                salaryMin: 50000,
                                salaryMax: 80000,
                                employmentType: 'Full-time',
                                benefits: 'Health insurance, 401k, Paid time off',
                                contactInfo: 'hr@lti.com',
                                requirements: '3+ years of experience in software development, knowledge in React and Node.js',
                                responsibilities: 'Develop, test, and maintain software solutions.',
                                companyDescription: 'LTI is a leading HR solutions provider.',
                                applicationDeadline: new Date('2024-12-31')
                            }
                        })];
                case 4:
                    position1 = _a.sent();
                    return [4 /*yield*/, prisma.position.create({
                            data: {
                                title: 'Data Scientist',
                                description: 'Analyze and interpret complex data.',
                                status: 'Open',
                                isVisible: true,
                                location: 'Remote',
                                jobDescription: 'Data analysis and machine learning',
                                companyId: company1.id,
                                interviewFlowId: interviewFlow2.id,
                                salaryMin: 60000,
                                salaryMax: 90000,
                                employmentType: 'Full-time',
                                benefits: 'Health insurance, 401k, Paid time off, Stock options',
                                contactInfo: 'hr@lti.com',
                                requirements: 'Master degree in Data Science or related field, proficiency in Python and R',
                                responsibilities: 'Analyze data sets to derive business insights and develop predictive models.',
                                companyDescription: 'LTI is a leading HR solutions provider.',
                                applicationDeadline: new Date('2024-12-31')
                            }
                        })];
                case 5:
                    position2 = _a.sent();
                    return [4 /*yield*/, prisma.candidate.create({
                            data: {
                                firstName: 'John',
                                lastName: 'Doe',
                                email: 'john.doe@gmail.com',
                                phone: '1234567890',
                                address: '123 Main St',
                                educations: {
                                    create: [
                                        {
                                            institution: 'University A',
                                            title: 'BSc Computer Science',
                                            startDate: new Date('2015-09-01'),
                                            endDate: new Date('2019-06-01')
                                        },
                                    ]
                                },
                                workExperiences: {
                                    create: [
                                        {
                                            company: 'Eventbrite',
                                            position: 'Software Developer',
                                            description: 'Developed web applications',
                                            startDate: new Date('2019-07-01'),
                                            endDate: new Date('2021-08-01')
                                        },
                                    ]
                                },
                                resumes: {
                                    create: [
                                        {
                                            filePath: '/resumes/john_doe.pdf',
                                            fileType: 'application/pdf',
                                            uploadDate: new Date()
                                        },
                                    ]
                                }
                            }
                        })];
                case 6:
                    candidate1 = _a.sent();
                    return [4 /*yield*/, prisma.candidate.create({
                            data: {
                                firstName: 'Jane',
                                lastName: 'Smith',
                                email: 'jane.smith@gmail.com',
                                phone: '0987654321',
                                address: '456 Elm St',
                                educations: {
                                    create: [
                                        {
                                            institution: 'Maryland',
                                            title: 'MSc Data Science',
                                            startDate: new Date('2016-09-01'),
                                            endDate: new Date('2020-06-01')
                                        },
                                    ]
                                },
                                workExperiences: {
                                    create: [
                                        {
                                            company: 'Gitlab',
                                            position: 'Data Scientist',
                                            description: 'Analyzed data sets',
                                            startDate: new Date('2020-07-01'),
                                            endDate: new Date('2022-08-01')
                                        },
                                    ]
                                },
                                resumes: {
                                    create: [
                                        {
                                            filePath: '/resumes/jane_smith.pdf',
                                            fileType: 'application/pdf',
                                            uploadDate: new Date()
                                        },
                                    ]
                                }
                            }
                        })];
                case 7:
                    candidate2 = _a.sent();
                    return [4 /*yield*/, prisma.candidate.create({
                            data: {
                                firstName: 'Carlos',
                                lastName: 'García',
                                email: 'carlos.garcia@example.com',
                                phone: '1122334455',
                                address: '789 Pine St',
                                educations: {
                                    create: [
                                        {
                                            institution: 'Instituto Tecnológico',
                                            title: 'Ingeniería en Sistemas Computacionales',
                                            startDate: new Date('2017-01-01'),
                                            endDate: new Date('2021-12-01')
                                        },
                                    ]
                                },
                                workExperiences: {
                                    create: [
                                        {
                                            company: 'Innovaciones Tech',
                                            position: 'Ingeniero de Software',
                                            description: 'Desarrollo y mantenimiento de aplicaciones de software',
                                            startDate: new Date('2022-01-01'),
                                            endDate: new Date('2023-01-01')
                                        },
                                    ]
                                },
                                resumes: {
                                    create: [
                                        {
                                            filePath: '/resumes/carlos_garcia.pdf',
                                            fileType: 'application/pdf',
                                            uploadDate: new Date()
                                        },
                                    ]
                                }
                            }
                        })];
                case 8:
                    candidate3 = _a.sent();
                    return [4 /*yield*/, prisma.interviewType.create({
                            data: {
                                name: 'HR Interview',
                                description: 'Assess overall fit, tech stack, salary range and availability'
                            }
                        })];
                case 9:
                    interviewType1 = _a.sent();
                    return [4 /*yield*/, prisma.interviewType.create({
                            data: {
                                name: 'Technical Interview',
                                description: 'Assess technical skills'
                            }
                        })];
                case 10:
                    interviewType2 = _a.sent();
                    return [4 /*yield*/, prisma.interviewType.create({
                            data: {
                                name: 'Hiring manager interview',
                                description: 'Assess cultural fit and professional goals'
                            }
                        })];
                case 11:
                    interviewType3 = _a.sent();
                    return [4 /*yield*/, prisma.interviewStep.create({
                            data: {
                                interviewFlowId: interviewFlow1.id,
                                interviewTypeId: interviewType1.id,
                                name: 'Initial Screening',
                                orderIndex: 1
                            }
                        })];
                case 12:
                    interviewStep1 = _a.sent();
                    return [4 /*yield*/, prisma.interviewStep.create({
                            data: {
                                interviewFlowId: interviewFlow1.id,
                                interviewTypeId: interviewType2.id,
                                name: 'Technical Interview',
                                orderIndex: 2
                            }
                        })];
                case 13:
                    interviewStep2 = _a.sent();
                    return [4 /*yield*/, prisma.interviewStep.create({
                            data: {
                                interviewFlowId: interviewFlow1.id,
                                interviewTypeId: interviewType3.id,
                                name: 'Manager Interview',
                                orderIndex: 2
                            }
                        })];
                case 14:
                    interviewStep3 = _a.sent();
                    return [4 /*yield*/, prisma.employee.create({
                            data: {
                                companyId: company1.id,
                                name: 'Alice Johnson',
                                email: 'alice.johnson@lti.com',
                                role: 'Interviewer'
                            }
                        })];
                case 15:
                    employee1 = _a.sent();
                    return [4 /*yield*/, prisma.employee.create({
                            data: {
                                companyId: company1.id,
                                name: 'Bob Miller',
                                email: 'bob.miller@lti.com',
                                role: 'Hiring Manager'
                            }
                        })];
                case 16:
                    employee2 = _a.sent();
                    return [4 /*yield*/, prisma.application.create({
                            data: {
                                positionId: position1.id,
                                candidateId: candidate1.id,
                                applicationDate: new Date(),
                                currentInterviewStep: interviewStep2.id
                            }
                        })];
                case 17:
                    application1 = _a.sent();
                    return [4 /*yield*/, prisma.application.create({
                            data: {
                                positionId: position2.id,
                                candidateId: candidate1.id,
                                applicationDate: new Date(),
                                currentInterviewStep: interviewStep2.id
                            }
                        })];
                case 18:
                    application2 = _a.sent();
                    return [4 /*yield*/, prisma.application.create({
                            data: {
                                positionId: position1.id,
                                candidateId: candidate2.id,
                                applicationDate: new Date(),
                                currentInterviewStep: interviewStep2.id
                            }
                        })];
                case 19:
                    application3 = _a.sent();
                    return [4 /*yield*/, prisma.application.create({
                            data: {
                                positionId: position1.id,
                                candidateId: candidate3.id,
                                applicationDate: new Date(),
                                currentInterviewStep: interviewStep1.id
                            }
                        })];
                case 20:
                    application4 = _a.sent();
                    // Create Interviews
                    return [4 /*yield*/, prisma.interview.createMany({
                            data: [
                                {
                                    applicationId: application1.id,
                                    interviewStepId: interviewStep1.id,
                                    employeeId: employee1.id,
                                    interviewDate: new Date(),
                                    result: 'Passed',
                                    score: 5,
                                    notes: 'Good technical skills'
                                },
                                {
                                    applicationId: application2.id,
                                    interviewStepId: interviewStep1.id,
                                    employeeId: employee1.id,
                                    interviewDate: new Date(),
                                    result: 'Passed',
                                    score: 5,
                                    notes: 'Excellent data analysis skills'
                                },
                                {
                                    applicationId: application3.id,
                                    interviewStepId: interviewStep1.id,
                                    employeeId: employee1.id,
                                    interviewDate: new Date(),
                                    result: 'Passed',
                                    score: 4,
                                    notes: 'Good technical skills'
                                }
                            ]
                        })];
                case 21:
                    // Create Interviews
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    console.error(e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
