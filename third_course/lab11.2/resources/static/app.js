function Man(surname, name, patronymic, sex, birthDate) {
  this.surname = surname;
  this.name = name;
  this.patronymic = patronymic;
  this.sex = sex;
  this.birthDate = (birthDate instanceof Date) ? birthDate : new Date(birthDate);
}

Man.prototype.getAge = function () {
  const now = new Date();
  let age = now.getFullYear() - this.birthDate.getFullYear();

  const m = now.getMonth() - this.birthDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < this.birthDate.getDate())) {
    age--;
  }
  return age;
};

Man.prototype.getInitials = function () {
  const n = (this.name && this.name[0]) ? this.name[0].toUpperCase() + "." : "";
  const p = (this.patronymic && this.patronymic[0]) ? this.patronymic[0].toUpperCase() + "." : "";
  return n + p;
};

Man.prototype.toString = function () {
  return `${this.surname} ${this.getInitials()} ${this.sex} ${this.getAge()}`;
};

function Student(surname, name, patronymic, sex, birthDate, groupNumber, specialty) {
  Man.call(this, surname, name, patronymic, sex, birthDate);

  this.groupNumber = groupNumber;
  this.specialty = specialty;
}

Student.prototype = Object.create(Man.prototype);
Student.prototype.constructor = Student;

Student.prototype.toString = function () {
  return `${this.surname} ${this.getInitials()} ${this.sex} ${this.getAge()} ${this.groupNumber} ${this.specialty}`;
};

const out = document.getElementById("out");
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");

function print(line = "") {
  out.textContent += line + "\n";
}

function runExamples() {
  out.textContent = "";

  const s1 = new Student("Юзбеков", "Віктор", "Сергійович", "м", "2005-05-24", "КН-122", "Комп'ютерні науки");

  const students = [
    s1,
    new Student("Осіпенко", "Кирило", "Романович", "м", "2006-08-13", "КН-122", "Комп'ютерні науки"),
    new Student("Олійник", "Денис", "Андрійович", "м", "2005-07-13", "355", "Комп'ютерна інженерія"),
  ];

  print("=== Один Student (toString) ===");
  print(s1.toString());
  print("");

  print("=== Масив студентів (перебір) ===");
  students.forEach((st, i) => print(`${i + 1}) ${st.toString()}`));
  print("");

  print("=== Перевірка наслідування ===");
  print(`s1 instanceof Student: ${s1 instanceof Student}`);
  print(`s1 instanceof Man: ${s1 instanceof Man}`);
  print("");

  print("=== Доступ до методів Man з Student ===");
  print(`Вік s1 через getAge(): ${s1.getAge()}`);
  print(`Ініціали s1 через getInitials(): ${s1.getInitials()}`);
}

runBtn.addEventListener("click", runExamples);
clearBtn.addEventListener("click", () => (out.textContent = ""));
