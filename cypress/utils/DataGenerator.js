const { faker } = require('@faker-js/faker');

class DataGenerator {
  static generateUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
      mobile: faker.phone.number('##########'), // 10 digits
      address: faker.location.streetAddress(),
      subjects: ['Physics', 'Maths'], // Mantenemos estos fijos para el ejemplo
      hobbies: ['1', '3'], // 1: Sports, 3: Music
      birthDate: { day: '09', month: 'June', year: '1990' },
      state: 'NCR',
      city: 'Delhi'
    };
  }

  static generateJobData() {
    return {
      name: faker.person.fullName(),
      job: faker.person.jobTitle()
    };
  }
}

module.exports = DataGenerator;
