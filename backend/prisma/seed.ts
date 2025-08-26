import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpiar tablas en orden correcto de dependencias para evitar errores de clave foránea
  await prisma.interview.deleteMany();
  await prisma.application.deleteMany();
  await prisma.education.deleteMany();
  await prisma.workExperience.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.position.deleteMany();
  await prisma.interviewStep.deleteMany();
  await prisma.interviewType.deleteMany();
  await prisma.interviewFlow.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.company.deleteMany();
  // Crear empresa
  const company1 = await prisma.company.create({ data: { name: 'LTI' } });

  // Crear flujos de entrevista
  const interviewFlow1 = await prisma.interviewFlow.create({ data: { description: 'Standard dev process' } });
  const interviewFlow2 = await prisma.interviewFlow.create({ data: { description: 'Data science process' } });

  // Crear tipos de entrevista
  const interviewType1 = await prisma.interviewType.create({ data: { name: 'HR Interview', description: 'Assess overall fit, tech stack, salary range and availability' } });
  const interviewType2 = await prisma.interviewType.create({ data: { name: 'Technical Interview', description: 'Assess technical skills' } });

  // Crear pasos de entrevista para cada flujo
  // Para position1 (interviewFlow1)
  const interviewStep1_1 = await prisma.interviewStep.create({ data: { interviewFlowId: interviewFlow1.id, interviewTypeId: interviewType1.id, name: 'Initial Screening', orderIndex: 1 } });
  const interviewStep1_2 = await prisma.interviewStep.create({ data: { interviewFlowId: interviewFlow1.id, interviewTypeId: interviewType2.id, name: 'Technical Interview', orderIndex: 2 } });
  // Para position2 (interviewFlow2)
  const interviewStep2_1 = await prisma.interviewStep.create({ data: { interviewFlowId: interviewFlow2.id, interviewTypeId: interviewType1.id, name: 'HR Screening', orderIndex: 1 } });
  const interviewStep2_2 = await prisma.interviewStep.create({ data: { interviewFlowId: interviewFlow2.id, interviewTypeId: interviewType2.id, name: 'Data Science Technical', orderIndex: 2 } });

  // Crear posiciones
  const position1 = await prisma.position.create({
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
  });
  const position2 = await prisma.position.create({
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
  });

  // Crear candidatos
  const candidate1 = await prisma.candidate.create({
    data: {
      firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com', phone: '1234567890', address: '123 Main St',
      educations: { create: [{ institution: 'University A', title: 'BSc Computer Science', startDate: new Date('2015-09-01'), endDate: new Date('2019-06-01') }] },
      workExperiences: { create: [{ company: 'Eventbrite', position: 'Software Developer', description: 'Developed web applications', startDate: new Date('2019-07-01'), endDate: new Date('2021-08-01') }] },
      resumes: { create: [{ filePath: '/resumes/john_doe.pdf', fileType: 'application/pdf', uploadDate: new Date() }] }
    }
  });
  const candidate2 = await prisma.candidate.create({
    data: {
      firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@gmail.com', phone: '0987654321', address: '456 Elm St',
      educations: { create: [{ institution: 'Maryland', title: 'MSc Data Science', startDate: new Date('2016-09-01'), endDate: new Date('2020-06-01') }] },
      workExperiences: { create: [{ company: 'Gitlab', position: 'Data Scientist', description: 'Analyzed data sets', startDate: new Date('2020-07-01'), endDate: new Date('2022-08-01') }] },
      resumes: { create: [{ filePath: '/resumes/jane_smith.pdf', fileType: 'application/pdf', uploadDate: new Date() }] }
    }
  });

  // Crear empleados
  const employee1 = await prisma.employee.create({ data: { companyId: company1.id, name: 'Alice Johnson', email: 'alice.johnson@lti.com', role: 'Interviewer' } });

  // Crear aplicaciones (una por posición, usando pasos correctos)
  const application1 = await prisma.application.create({ data: { positionId: position1.id, candidateId: candidate1.id, applicationDate: new Date(), currentInterviewStep: interviewStep1_1.id } });
  const application2 = await prisma.application.create({ data: { positionId: position2.id, candidateId: candidate2.id, applicationDate: new Date(), currentInterviewStep: interviewStep2_1.id } });

  // Crear entrevistas para las aplicaciones
  await prisma.interview.createMany({
    data: [
      { applicationId: application1.id, interviewStepId: interviewStep1_1.id, employeeId: employee1.id, interviewDate: new Date(), result: 'Passed', score: 5, notes: 'Good technical skills' },
      { applicationId: application2.id, interviewStepId: interviewStep2_1.id, employeeId: employee1.id, interviewDate: new Date(), result: 'Passed', score: 5, notes: 'Excellent data analysis skills' }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
