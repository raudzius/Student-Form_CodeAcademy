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
  const attributes = { type: 'radio', name: `gr`, id: `${i}gr`, value: `${i}` };
  for (const key in attributes) {
    input.setAttribute(key, attributes[key]);
  }

  if (i === 1) {
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

// Alert
function displaymodal(alertText, displayTime, alertTextColor = 'black') {
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

levelInput.addEventListener('input', event => {
  displayLevelNumber(event.target.value);
});

// Student List item
function addData(studentData, submit = true) {
  const div = document.createElement('div');
  div.className = 'student-item';

  let isHiddenData = true;

  function turnLettersToStars(string) {
    let stars = '';
    for (i = 0; i < string.length; i++) {
      stars += '*';
    }
    return stars;
  }
  const languageString = studentData.languages.length ? studentData.languages.join(', ') + '.' : '';
  const h3 = document.createElement('h3');
  h3.textContent = `${studentData.name} ${studentData.surname}`;
  h3.setAttribute('name', 'name');
  const p1 = document.createElement('p');
  p1.textContent = 'Age: ' + studentData.age;
  p1.setAttribute('name', 'age');
  const p2 = document.createElement('p');
  p2.textContent = 'Tel: ' + turnLettersToStars(studentData.phone);
  const p3 = document.createElement('p');
  p3.textContent = 'E-mail: ' + turnLettersToStars(studentData.email);
  const p4 = document.createElement('p');
  p4.textContent = 'Level: ' + studentData.level;
  p4.setAttribute('name', 'level');
  const p5 = document.createElement('p');
  p5.textContent = 'Group: ' + studentData.group;
  p5.setAttribute('name', 'group');
  const p6 = document.createElement('p');
  p6.textContent = 'Programming languages: ' + languageString;
  p6.setAttribute('name', 'languages');

  // Info/Delete/Edit buttons
  const infoBtn = document.createElement('button');
  infoBtn.textContent = 'Rodyti asmens duomenis';
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Ištrinti studentą';
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Redaguoti studentą';

  infoBtn.addEventListener('click', () => {
    if (isHiddenData) {
      p2.textContent = 'Tel: ' + studentData.phone;
      p3.textContent = 'E-mail: ' + studentData.email;
      infoBtn.textContent = 'Slepti asmens duomenis';
    } else {
      p2.textContent = 'Tel: ' + turnLettersToStars(studentData.phone);
      p3.textContent = 'E-mail: ' + turnLettersToStars(studentData.email);
      infoBtn.textContent = 'Rodyti asmens duomenis';
    }
    isHiddenData = !isHiddenData;
  });

  deleteBtn.addEventListener('click', event => {
    event.target.parentElement.remove();
    displaymodal(`Studentas ${studentData.name} ${studentData.surname} sėkmingai ištrintas.`, 3000);
  });

  editBtn.addEventListener('click', event => {
    window.scrollTo(0, 0);
    form.elements.name.value = studentData.name;
    form.elements.surname.value = studentData.surname;
    form.elements.age.value = studentData.age;
    form.elements.phone.value = studentData.phone;
    form.elements.email.value = studentData.email;
    form.elements.level.value = +studentData.level;
    displayLevelNumber(form.level.value);
    form.elements.gr.value = +studentData.group;
    form.elements.languages.elements = [...form.elements.languages.elements].filter(input => studentData.languages.includes(input.value)).forEach(input => (input.checked = true));
    form.elements.submit.textContent = 'Save Changes';

    editedStudent = event.target.parentElement;
  });
  if (editedStudent) {
    editedStudent.innerHTML = ``;
    editedStudent.append(h3, p1, p2, p3, p4, p5, p6, infoBtn, deleteBtn, editBtn);
    editedStudent = false;
    displaymodal(`Studento ${studentData.name} ${studentData.surname} duomenys sėkmingai pakeisti`, 3000, 'green');
    return;
  }
  //
  div.append(h3, p1, p2, p3, p4, p5, p6, infoBtn, deleteBtn, editBtn);
  studentList.prepend(div);
  if (submit) displaymodal(`Sukurtas Studentas: ${studentData.name} ${studentData.surname}`, 3000);
}

// Render Backend Data
function renderData(data) {
  for (let i = 0; i < data.length; i++) {
    addData(data[i], false);
  }
}
renderData(studentData);

// Input validation
function markInvalidInputs(requiredInputs) {
  const requiredInputsArray = Object.values(requiredInputs);
  const emptyInputArray = requiredInputsArray.filter(input => !input.value.trim().length);
  const warningSpans = document.querySelectorAll('.warning');

  let isValid = true;

  requiredInputsArray.forEach(input => (input.style.borderColor = 'rgb(152, 159, 184)'));
  warningSpans.forEach(span => span.remove());

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
    emptyInputArray.forEach(input => {
      inputWarning(input, 'Sis laukelis yra privalomas');
    });
  }

  if (requiredInputs.nameInput.value.length < 3) {
    inputWarning(requiredInputs.nameInput, 'Vardas privalo būti bent 3 simbolių ilgumo');
  }
  if (requiredInputs.surnameInput.value.length < 3) {
    inputWarning(requiredInputs.surnameInput, 'Pavardė privalo būti bent 3 simbolių ilgumo');
  }
  if (requiredInputs.ageInput.value < 0) {
    inputWarning(requiredInputs.ageInput, 'Amžius privalo būti teigiamas skaičius');
  } else if (requiredInputs.ageInput.value > 120) {
    inputWarning(requiredInputs.ageInput, 'Įvestas amžius yra per didelis');
  }
  if (requiredInputs.phoneInput.value.length < 8 || requiredInputs.phoneInput.value.length > 12) {
    inputWarning(requiredInputs.phoneInput, 'Įvestas telefono numeris yra neteisingas');
  }
  if (requiredInputs.emailInput.value.length < 5 || !requiredInputs.emailInput.value.includes('@')) {
    inputWarning(requiredInputs.emailInput, 'Įvestas elektroninis paštas yra neteisingas');
  }

  if (!isValid) {
    displaymodal('Ne visi laukeliai yra uzpildyti!', 3000, 'red');
  }
  return isValid;
}

// Form submit
form.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const formEl = form.elements;
  const nameInput = formEl.name;
  const surnameInput = formEl.surname;
  const ageInput = formEl.age;
  const phoneInput = formEl.phone;
  const emailInput = formEl.email;
  const programmingLanguagesArray = [...formEl.languages.elements].filter(language => language.checked).map(language => language.value);

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
});

function filterStudents(option, keyWord) {
  [...studentList.children].forEach(el => (el.style.display = 'none'));
  if (option === 'name') {
    return [...studentList.children].filter(studentListItem => studentListItem.children[option].textContent.split(' ')[0].toLowerCase().includes(keyWord.toLowerCase()));
  } else if (option === 'surname') {
    return [...studentList.children].filter(studentListItem => studentListItem.children.name.textContent.split(' ')[1].toLowerCase().includes(keyWord.toLowerCase()));
  } else if (option === 'age' || option === 'level' || option === 'group') {
    return [...studentList.children].filter(studentListItem => studentListItem.children[option].textContent.split(' ')[1] === keyWord);
  } else if (option === 'languages') {
    return [...studentList.children].filter(
      studentListItem =>
        studentListItem.children[option].textContent
          .toLowerCase()
          .split(': ')[1]
          .replace('.', '')
          .split(', ')
          .filter(el => el.includes(keyWord.toLowerCase())).length !== 0
    );
  }
}
const searchForm = form.nextElementSibling;
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const option = form.elements.select.value;
  const keyWord = form.firstElementChild.value;

  filterStudents(option, keyWord).forEach(el => (el.style.display = 'block'));
});

// 1. HTML faile sukurti naują form'ą. Joje pridėti šiuos input elementus: text ir submit.
// 2. Formos submit event'o metu, gauti įvestą tekstą ir:
// 2.1. Patikrinti ar studentų sąraše yra studentas, kurio varde arba pavardėje yra įvestas tekstas.
// 2.2. Ekrane atvaizduoti tik tuos studentus, kurie tenkina sąlygą.
// 3. Prie formos pridėti select elementą ir jame sukurti sąrašą (option elementus), kuriuose būtų nurodytą pagal kurią informaciją studento yra ieškoma (vardas, pavardė, grupė ir t.t., bet išskyrus telefono numerį ir elektroninį paštą).
// 4. Patobulinti formą, kad studento būtų ieškoma ne tik pagal vardą ir pavardę, tačiau ir pagal pasirinktą atributą.
