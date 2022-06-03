const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateCompaniesData = (quantity) => {
  const employees = [];
  for (let i = 0; i < quantity; i++) {
    employees.push({
      id: faker.datatype.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      cnpj: `${faker.random.numeric(14)}`,
    });
  }

  return employees;
};

const companiesData = generateCompaniesData(3);

const generateStatesData = (quantity) => {
  const employees = [];
  for (let i = 0; i < quantity; i++) {
    employees.push({
      id: faker.datatype.uuid(),
      name: faker.address.state(),
    });
  }

  return employees;
};

const statesData = generateStatesData(15);

const generateCitiesData = (quantity) => {
  const employees = [];
  for (let i = 0; i < quantity; i++) {
    const state = statesData[Math.floor(Math.random() * statesData.length)];

    employees.push({
      id: faker.datatype.uuid(),
      name: faker.address.state(),
      id_state: state.id,
      state,
    });
  }

  return employees;
};

const generateSectorsData = (quantity) => {
  const employees = [];
  for (let i = 0; i < quantity; i++) {
    employees.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
    });
  }

  return employees;
};

const sectorsData = generateSectorsData(10);

const generateRolesData = (quantity) => {
  const employees = [];
  for (let i = 0; i < quantity; i++) {
    const sector = sectorsData[Math.floor(Math.random() * sectorsData.length)];
    employees.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      id_sector: sector.id,
      sector,
    });
  }

  return employees;
};

const citiesData = generateCitiesData(120);
const rolesData = generateRolesData(40);

const generateEmployeesData = (quantity) => {
  const employees = [];
  for (let i = 0; i < quantity; i++) {
    const city = citiesData[Math.floor(Math.random() * citiesData.length)];
    const role = rolesData[Math.floor(Math.random() * rolesData.length)];
    const id_company =
      companiesData[Math.floor(Math.random() * companiesData.length)].id;
    const is_active = Math.floor(Math.random() * 3) > 0;

    employees.push({
      id: faker.datatype.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      cpf: `${faker.random.numeric(11)}`,
      rg: `${faker.random.numeric(9)}`,
      birthday: faker.date.birthdate({
        min: 18,
        max: 65,
        mode: "age",
        refDate: Date,
      }),
      street: faker.address.street(),
      number: faker.random.numeric(3),
      city,
      email: faker.internet.exampleEmail(),
      phone: faker.random.numeric(10),
      role,
      id_company,
      is_active,
    });
  }

  return employees;
};

const employees = generateEmployeesData(9);

fs.writeFileSync(
  "./src/services/db/db.json",
  JSON.stringify({
    companies: companiesData,
    states: statesData,
    cities: citiesData,
    sectors: sectorsData,
    roles: rolesData,
    employees: employees,
  })
);
