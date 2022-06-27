// "Backend data"
const studentData = [
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860010000',
    email: 'mykolas@gmail.com',
    level: 6,
    group: 2,
    languages: ['Python', 'JavaScript', 'C#'],
  },
  {
    name: 'Romanas',
    surname: 'Venckus',
    age: '28',
    phone: '860009000',
    email: 'romanas@gmail.com',
    level: 10,
    group: 4,
    languages: ['C#', 'Java'],
  },
  {
    name: 'Audrius',
    surname: 'Sveikauskas',
    age: '35',
    phone: '860800000',
    email: 'audrius@gmail.com',
    level: 9,
    group: 9,
    languages: ['Python', 'JavaScript', 'C#', 'Java'],
  },
  {
    name: 'Ruta',
    surname: 'Danilina',
    age: '27',
    phone: '860070000',
    email: 'ruta@gmail.com',
    level: 5,
    group: 15,
    languages: ['Python', 'JavaScript'],
  },
  {
    name: 'Giedre',
    surname: 'Klimaite',
    age: '25',
    phone: '864000000',
    email: 'mykolas@gmail.com',
    level: 4,
    group: 7,
    languages: ['JavaScript'],
  },
];

//Radio buttons HTML
const divRadio = document.getElementById('div-radio');

for (let i = 1; i <= 15; i++) {
  const span = document.createElement('span');
  const label = document.createElement('label');
  label.textContent = `${i}gr`;
  label.setAttribute('for', `${i}gr`);

  const input = document.createElement('input');
  input.addEventListener('input', (event) => {
    const input = event.target;
    localStorage.setItem('group', input.value);
  });
  const attributes = { type: 'radio', name: `gr`, id: `${i}gr`, value: `${i}` };
  for (const key in attributes) {
    input.setAttribute(key, attributes[key]);
  }

  if (i === +localStorage.getItem('group') || i === 1) {
    input.checked = true;
  }

  span.append(label, input);
  divRadio.append(span);
}
//

// Global Variables
const modal = document.querySelector('span.modal');
const modalBackdrop = document.getElementById('backdrop');
const form = document.querySelector('form');
const studentList = document.getElementById('student-list');
const levelInput = document.getElementById('level');
const levelLabelSpan = document.getElementById('level-value');

let editedStudent = false;
let editedStudentId = false;

// Alert
function displayModal(alertText, displayTime, alertTextColor = 'black') {
  const h3 = document.createElement('h3');
  h3.textContent = alertText;
  h3.style.color = alertTextColor;

  modal.append(h3);
  modal.style.display = 'block';
  modalBackdrop.style.display = 'block';

  setTimeout(() => {
    modal.style.display = 'none';
    modalBackdrop.style.display = 'none';
    modal.children[0].remove();
  }, displayTime);
}

// Dynamic Range Output
function displayLevelNumber(labelInputValue) {
  levelLabelSpan.textContent = labelInputValue;
}

levelInput.addEventListener('input', (event) => {
  displayLevelNumber(event.target.value);
});

// Student List item
function addData(studentData, submit = true, id = Math.random()) {
  const div = document.createElement('div');
  const locallyStoredStudents = JSON.parse(localStorage.getItem('studentData'));
  const languageString = studentData.languages.length;
  const h3 = document.createElement('h3');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const p3 = document.createElement('p');
  const p4 = document.createElement('p');
  const p5 = document.createElement('p');
  const p6 = document.createElement('p');
  const infoBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const editBtn = document.createElement('button');

  let hidePersonalInfo = true;

  div.className = 'student-item';
  h3.setAttribute('name', 'name');
  p1.setAttribute('name', 'age');
  p4.setAttribute('name', 'level');
  p5.setAttribute('name', 'group');
  p6.setAttribute('name', 'languages');

  function turnLettersToStars(string) {
    let stars = '';
    for (i = 0; i < string.length; i++) {
      stars += '*';
    }
    return stars;
  }
  languageString ? studentData.languages.join(', ') + '.' : '';

  h3.textContent = `${studentData.name} ${studentData.surname}`;
  p1.textContent = 'Age: ' + studentData.age;
  p2.textContent = 'Tel: ' + turnLettersToStars(studentData.phone);
  p3.textContent = 'E-mail: ' + turnLettersToStars(studentData.email);
  p4.textContent = 'Level: ' + studentData.level;
  p5.textContent = 'Group: ' + studentData.group;
  p6.textContent = 'Programming languages: ' + languageString;
  infoBtn.textContent = 'Rodyti asmens duomenis';
  deleteBtn.textContent = 'Ištrinti studentą';
  editBtn.textContent = 'Redaguoti studentą';

  infoBtn.addEventListener('click', () => {
    hidePersonalInfo = !hidePersonalInfo;
    if (hidePersonalInfo) {
      p2.textContent = 'Tel: ' + turnLettersToStars(studentData.phone);
      p3.textContent = 'E-mail: ' + turnLettersToStars(studentData.email);
      infoBtn.textContent = 'Rodyti asmens duomenis';
    } else if (!hidePersonalInfo) {
      p2.textContent = 'Tel: ' + studentData.phone;
      p3.textContent = 'E-mail: ' + studentData.email;
      infoBtn.textContent = 'Slepti asmens duomenis';
    }
  });

  deleteBtn.addEventListener('click', (event) => {
    event.target.parentElement.remove();
    const filteredStudents = locallyStoredStudents.filter(
      (element) => element.id !== id
    );
    localStorage.setItem('studentData', JSON.stringify(filteredStudents));

    displayModal(
      `Studentas ${studentData.name} ${studentData.surname} sėkmingai ištrintas.`,
      3000
    );
  });

  editBtn.addEventListener('click', (event) => {
    form.reset();
    window.scrollTo(0, 0);
    form.elements.name.value = studentData.name;
    form.elements.surname.value = studentData.surname;
    form.elements.age.value = studentData.age;
    form.elements.phone.value = studentData.phone;
    form.elements.email.value = studentData.email;
    form.elements.level.value = +studentData.level;
    displayLevelNumber(form.level.value);
    form.elements.gr.value = +studentData.group;
    form.elements.languages.elements = [...form.elements.languages.elements]
      .filter((input) => studentData.languages.includes(input.value))
      .forEach((input) => (input.checked = true));
    form.elements.submit.textContent = 'Save Changes';

    editedStudent = event.target.parentElement;
    editedStudentId = editedStudent.id;
  });
  if (editedStudent) {
    editedStudent.innerHTML = ``;
    editedStudent.append(
      h3,
      p1,
      p2,
      p3,
      p4,
      p5,
      p6,
      infoBtn,
      deleteBtn,
      editBtn
    );

    const editedStudents = locallyStoredStudents.map((student) => {
      if (student.id === +editedStudentId) {
        student.name = studentData.name;
        student.surname = studentData.surname;
        student.age = studentData.age;
        student.phone = studentData.phone;
        student.email = studentData.email;
        student.level = studentData.level;
        student.group = +studentData.group;
        student.languages = studentData.languages;
      }
      return student;
    });
    localStorage.setItem('studentData', JSON.stringify(editedStudents));

    editedStudent = false;
    displayModal(
      `Studento ${studentData.name} ${studentData.surname} duomenys sėkmingai pakeisti`,
      3000,
      'green'
    );
    return;
  }
  //
  div.append(h3, p1, p2, p3, p4, p5, p6, infoBtn, deleteBtn, editBtn);
  div.setAttribute('id', id);
  studentList.prepend(div);
  if (submit) {
    displayModal(
      `Sukurtas Studentas: ${studentData.name} ${studentData.surname}`,
      3000
    );

    const newStudent = {
      name: studentData.name,
      surname: studentData.surname,
      age: studentData.age,
      phone: studentData.phone,
      email: studentData.email,
      level: studentData.level,
      group: studentData.group,
      languages: studentData.languages,
      id: id,
    };
    locallyStoredStudents.push(newStudent);
    localStorage.setItem('studentData', JSON.stringify(locallyStoredStudents));
  }
}

// Render Backend Data
if (!localStorage.getItem('studentData')) {
  studentData.forEach((student) => (student.id = Math.random()));
  localStorage.setItem('studentData', JSON.stringify(studentData));
}
function renderData(data) {
  for (let i = 0; i < data.length; i++) {
    addData(data[i], false, data[i].id);
  }
}
renderData(JSON.parse(localStorage.getItem('studentData')));

// Input validation
function markInvalidInputs(requiredInputs) {
  const requiredInputsArray = Object.values(requiredInputs);
  const emptyInputArray = requiredInputsArray.filter(
    (input) => !input.value.trim().length
  );
  const warningSpans = document.querySelectorAll('.warning');

  let isValid = true;

  requiredInputsArray.forEach(
    (input) => (input.style.borderColor = 'rgb(152, 159, 184)')
  );
  warningSpans.forEach((span) => span.remove());

  function inputWarning(input, warningText) {
    const span = document.createElement('span');
    input.style.borderColor = 'red';
    span.textContent = warningText;
    span.style.color = 'red';
    span.className = 'warning';
    input.parentElement.querySelector('.warning') || input.before(span);
    isValid = false;
  }

  if (emptyInputArray.length) {
    emptyInputArray.forEach((input) => {
      inputWarning(input, 'Sis laukelis yra privalomas');
    });
  }

  if (requiredInputs.nameInput.value.length < 3) {
    inputWarning(
      requiredInputs.nameInput,
      'Vardas privalo būti bent 3 simbolių ilgumo'
    );
  }
  if (requiredInputs.surnameInput.value.length < 3) {
    inputWarning(
      requiredInputs.surnameInput,
      'Pavardė privalo būti bent 3 simbolių ilgumo'
    );
  }
  if (requiredInputs.ageInput.value < 0) {
    inputWarning(
      requiredInputs.ageInput,
      'Amžius privalo būti teigiamas skaičius'
    );
  } else if (requiredInputs.ageInput.value > 120) {
    inputWarning(requiredInputs.ageInput, 'Įvestas amžius yra per didelis');
  }
  if (
    requiredInputs.phoneInput.value.length < 8 ||
    requiredInputs.phoneInput.value.length > 12
  ) {
    inputWarning(
      requiredInputs.phoneInput,
      'Įvestas telefono numeris yra neteisingas'
    );
  }
  if (
    requiredInputs.emailInput.value.length < 5 ||
    !requiredInputs.emailInput.value.includes('@')
  ) {
    inputWarning(
      requiredInputs.emailInput,
      'Įvestas elektroninis paštas yra neteisingas'
    );
  }

  if (!isValid) {
    displayModal('Ne visi laukeliai yra uzpildyti!', 3000, 'red');
  }
  return isValid;
}

// Form submit
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const formEl = form.elements;
  const nameInput = formEl.name;
  const surnameInput = formEl.surname;
  const ageInput = formEl.age;
  const phoneInput = formEl.phone;
  const emailInput = formEl.email;
  const programmingLanguagesArray = [...formEl.languages.elements]
    .filter((language) => language.checked)
    .map((language) => language.value);

  const requiredInputs = {
    nameInput: nameInput,
    surnameInput: surnameInput,
    ageInput: ageInput,
    phoneInput: phoneInput,
    emailInput: emailInput,
  };
  const inputAreValid = markInvalidInputs(requiredInputs);
  if (!inputAreValid) {
    return;
  }

  const studentData = {
    name: nameInput.value,
    surname: surnameInput.value,
    age: ageInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    level: formEl.level.value,
    group: formEl.gr.value,
    languages: [...programmingLanguagesArray],
  };

  addData(studentData);

  form.reset();
  formEl.gr[0].checked = true;
  levelLabelSpan.textContent = 1;
  formEl.submit.textContent = 'Submit';
  for (key in studentData) {
    localStorage.removeItem(key);
  }
});

// Filter
function filterStudents(option, keyWord) {
  [...studentList.children].forEach((el) => (el.style.display = 'none'));
  if (option === 'name') {
    return [...studentList.children].filter((studentListItem) =>
      studentListItem.children[option].textContent
        .split(' ')[0]
        .toLowerCase()
        .includes(keyWord.toLowerCase())
    );
  } else if (option === 'surname') {
    return [...studentList.children].filter((studentListItem) =>
      studentListItem.children.name.textContent
        .split(' ')[1]
        .toLowerCase()
        .includes(keyWord.toLowerCase())
    );
  } else if (option === 'age' || option === 'level' || option === 'group') {
    return [...studentList.children].filter(
      (studentListItem) =>
        studentListItem.children[option].textContent.split(' ')[1] === keyWord
    );
  } else if (option === 'languages') {
    return [...studentList.children].filter(
      (studentListItem) =>
        studentListItem.children[option].textContent
          .toLowerCase()
          .split(': ')[1]
          .replace('.', '')
          .split(', ')
          .filter((el) => el.includes(keyWord.toLowerCase())).length !== 0
    );
  }
}

const searchForm = form.nextElementSibling;
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const option = form.elements.select.value;
  const keyWord = form.firstElementChild.value;

  filterStudents(option, keyWord).forEach((el) => (el.style.display = 'block'));
});

// local store inputs

const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const ageInput = document.getElementById('age');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const localStoredLevel = localStorage.getItem('level');
const languagesCheckboxes = document.querySelectorAll('input[type=checkbox]');

let languageArray = [];

nameInput.value = localStorage.getItem('name');
surnameInput.value = localStorage.getItem('surname');
ageInput.value = localStorage.getItem('age');
phoneInput.value = localStorage.getItem('phone');
emailInput.value = localStorage.getItem('email');
if (localStoredLevel) {
  levelInput.value = localStoredLevel;
  levelLabelSpan.textContent = localStoredLevel;
}

nameInput.addEventListener('input', (event) => {
  localStorage.setItem('name', event.target.value);
});
surnameInput.addEventListener('input', (event) => {
  localStorage.setItem('surname', event.target.value);
});
ageInput.addEventListener('input', (event) => {
  localStorage.setItem('age', event.target.value);
});
phoneInput.addEventListener('input', (event) => {
  localStorage.setItem('phone', event.target.value);
});
emailInput.addEventListener('input', (event) => {
  localStorage.setItem('email', event.target.value);
});
levelInput.addEventListener('input', (event) => {
  localStorage.setItem('level', event.target.value);
});

if (localStorage.getItem('languageArray')) {
  languagesCheckboxes.forEach((checkbox) => {
    if (
      JSON.parse(localStorage.getItem('languageArray')).includes(checkbox.value)
    ) {
      checkbox.checked = true;
    }
  });
  languageArray = JSON.parse(localStorage.getItem('languageArray'));
}
languagesCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('input', (event) => {
    const input = event.target;
    if (input.checked) {
      languageArray.push(input.value);
    } else {
      const uncheckedValue = languageArray.indexOf(input.value);
      languageArray.splice(uncheckedValue, 1);
    }
    localStorage.setItem('languageArray', JSON.stringify(languageArray));
  });
});
