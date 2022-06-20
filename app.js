// "Backend data"
const studentData = [
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860000000',
    email: 'mykolas@gmail.com',
    level: 1,
    group: 1,
    languages: ['Python', 'JavaScript', 'C#', 'Java'],
  },
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860000000',
    email: 'mykolas@gmail.com',
    level: 1,
    group: 1,
    languages: ['Python', 'JavaScript', 'C#', 'Java'],
  },
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860000000',
    email: 'mykolas@gmail.com',
    level: 1,
    group: 1,
    languages: ['Python', 'JavaScript', 'C#', 'Java'],
  },
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860000000',
    email: 'mykolas@gmail.com',
    level: 1,
    group: 1,
    languages: ['Python', 'JavaScript', 'C#', 'Java'],
  },
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860000000',
    email: 'mykolas@gmail.com',
    level: 1,
    group: 5,
    languages: ['Python', 'JavaScript', 'C#', 'Java'],
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
const alertBox = document.querySelector('span.modal');
const alertBackground = document.getElementById('backdrop');
const form = document.querySelector('form');
const studentList = document.getElementById('student-list');
const levelInput = document.getElementById('level');
const levelLabelSpan = document.getElementById('level-value');

let isEditingStudent = false;
let editedStudent;

// Alert
function displayAlertBox(alertText, displayTime, alertTextColor = 'black') {
  const h3 = document.createElement('h3');
  h3.textContent = alertText;
  h3.style.color = alertTextColor;

  alertBox.append(h3);
  alertBox.style.display = 'block';
  alertBackground.style.display = 'block';

  setTimeout(() => {
    alertBox.style.display = 'none';
    alertBackground.style.display = 'none';
    alertBox.children[0].remove();
  }, displayTime);
}

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
  const p1 = document.createElement('p');
  p1.textContent = 'Age: ' + studentData.age;
  const p2 = document.createElement('p');
  p2.textContent = 'Tel: ' + turnLettersToStars(studentData.phone);
  const p3 = document.createElement('p');
  p3.textContent = 'E-mail: ' + turnLettersToStars(studentData.email);
  const p4 = document.createElement('p');
  p4.textContent = 'Level: ' + studentData.level;
  const p5 = document.createElement('p');
  p5.textContent = 'Group: ' + studentData.group;
  const p6 = document.createElement('p');
  p6.textContent = 'Programming languages: ' + languageString;

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

  deleteBtn.addEventListener('click', e => {
    e.target.parentElement.remove();
    displayAlertBox(`Studentas ${studentData.name} ${studentData.surname} sėkmingai ištrintas.`, 3000);
  });

  editBtn.addEventListener('click', event => {
    window.scrollTo(0, 0);
    form.elements.name.value = studentData.name;
    form.elements.surname.value = studentData.surname;
    form.elements.age.value = studentData.age;
    form.elements.phone.value = studentData.phone;
    form.elements.email.value = studentData.email;
    form.elements.level.value = studentData.level;
    form.elements.gr.value = +studentData.group;
    form.elements.languages.elements = [...form.elements.languages.elements].filter(input => studentData.languages.includes(input.value)).forEach(input => (input.checked = true));
    form.elements.submit.textContent = 'Save Changes';

    isEditingStudent = true;
    editedStudent = event.target.parentElement;
  });
  if (isEditingStudent) {
    editedStudent.innerHTML = ``;
    editedStudent.append(h3, p1, p2, p3, p4, p5, p6, infoBtn, deleteBtn, editBtn);
    displayAlertBox(`Studento ${studentData.name} ${studentData.surname} duomenys sėkmingai pakeisti`, 3000, 'green');
    return;
  }
  //
  div.append(h3, p1, p2, p3, p4, p5, p6, infoBtn, deleteBtn, editBtn);
  studentList.prepend(div);
  if (submit) displayAlertBox(`Sukurtas Studentas: ${studentData.name} ${studentData.surname}`, 3000);
}

// Dynamic Range Output
levelInput.addEventListener('input', event => {
  levelLabelSpan.textContent = event.target.value;
});

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
    displayAlertBox('Ne visi laukeliai yra uzpildyti!', 3000, 'red');
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

// 1. Prie kiekvieno studento pridėti mygtuką, kurį paspaudus leistų redaguoti studento duomenis.
// 2. Redaguojant studentą, submit mygtuko tekstas turėtų pasikeisti į „Save Changes".
// 3. Pakeitus studento duomenis, turi iššokti <span> elementas, kuris informuoja apie studento duomenų redagavimą: „Studento (Vardas Pavardė) duomenys sėkmingai pakeisti". Šis span elementas dingsta po 5 sekundžių.

// 1. Sukurti Edit mygtuką.
// 2. Prie mygtuko pridėti event listener'į.
// 3. Surinkti studento duomenis ir jais užpildyti formos laukelius.
// 4. Pakeisti formos submit mygtuko tekstą.
// 5. Išsaugoti studento HTML elementą kintamąjame.
// 6. Submit event'o metu patikrinti ar kuriame naują studentą, ar redaguojame jau sukurtą.
// 7. Jeigu studentas redaguojamas, šį naują (redaguotą) HTML elementą panaudoti perrašant seną studento HTML elementą (kuris išsaugotas 5 žingsnyje).

// 8. Pakeisti formos submit mygtuko tekstą į pradinį ir pakeisti iššokančio pranešimo tekstą.
