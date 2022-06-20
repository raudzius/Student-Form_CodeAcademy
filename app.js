//Radio buttons HTML
const divRadio = document.getElementById('div-radio');

for (let i = 1; i <= 15; i++) {
  const span = document.createElement('span');
  const label = document.createElement('label');
  label.textContent = `${i}gr`;
  label.setAttribute('for', `${i}gr`);

  const input = document.createElement('input');
  const attrs = { type: 'radio', name: `gr`, id: `${i}gr`, value: `${i}` };
  for (const key in attrs) {
    input.setAttribute(key, attrs[key]);
  }

  if (i === 1) {
    input.checked = true;
  }

  span.append(label, input);
  divRadio.append(span);
}
//

const spanModal = document.querySelector('span.modal');
const backdrop = document.getElementById('backdrop');
const form = document.querySelector('form');
const divStudentList = document.getElementById('student-list');
const inputLevel = document.getElementById('level');
const levelLabelInput = document.getElementById('level-value');

// Modal
function displayModal(modalText, time, color = 'black') {
  const h3 = document.createElement('h3');
  h3.textContent = modalText;
  h3.style.color = color;

  spanModal.append(h3);
  spanModal.style.display = 'block';
  backdrop.style.display = 'block';

  setTimeout(() => {
    spanModal.style.display = 'none';
    backdrop.style.display = 'none';
    spanModal.children[0].remove();
  }, time);
}

// Student List item
function addStudent(studentInfo) {
  const div = document.createElement('div');
  div.className = 'student-item';

  function turnLettersToStars(word) {
    let stars = '';
    for (i = 0; i < word.length; i++) {
      stars += '*';
    }
    return stars;
  }

  const languageString = studentInfo.languages.length ? studentInfo.languages.join(', ') + '.' : '';
  const h3 = document.createElement('h3');
  h3.textContent = `${studentInfo.name} ${studentInfo.surname}`;
  const p1 = document.createElement('p');
  p1.textContent = 'Age: ' + studentInfo.age;
  const p2 = document.createElement('p');
  p2.textContent = 'Tel: ' + turnLettersToStars(studentInfo.phone);
  const p3 = document.createElement('p');
  p3.textContent = 'E-mail: ' + turnLettersToStars(studentInfo.email);
  const p4 = document.createElement('p');
  p4.textContent = 'Level: ' + studentInfo.level;
  const p5 = document.createElement('p');
  p5.textContent = 'Group: ' + studentInfo.group;
  const p6 = document.createElement('p');
  p6.textContent = 'Programming languages: ' + languageString;
  const infoBtn = document.createElement('button');
  infoBtn.textContent = 'Rodyti asmens duomenis';
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Ištrinti studentą';
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Redaguoti studentą';

  let isHidden = true;

  infoBtn.addEventListener('click', () => {
    if (isHidden) {
      p2.textContent = 'Tel: ' + studentInfo.phone;
      p3.textContent = 'E-mail: ' + studentInfo.email;
      infoBtn.textContent = 'Slepti asmens duomenis';
    } else {
      p2.textContent = 'Tel: ' + turnLettersToStars(studentInfo.phone);
      p3.textContent = 'E-mail: ' + turnLettersToStars(studentInfo.email);
      infoBtn.textContent = 'Rodyti asmens duomenis';
    }
    isHidden = !isHidden;
  });

  deleteBtn.addEventListener('click', e => {
    e.target.parentElement.remove();
    displayModal(`Studentas ${studentInfo.name} ${studentInfo.surname} sėkmingai ištrintas.`, 3000, 'green');
  });

  editBtn.addEventListener('click', () => {});

  div.append(h3, p1, p2, p3, p4, p5, p6, infoBtn, deleteBtn, editBtn);
  divStudentList.prepend(div);
}

// Range input
inputLevel.addEventListener('input', event => {
  levelLabelInput.textContent = event.target.value;
});

// Input validation
function filterInvalidInputs(requiredInputs) {
  const requiredInputsArray = Object.values(requiredInputs);
  const emptyInputArray = requiredInputsArray.filter(input => !input.value.trim().length);
  const warningSpans = document.querySelectorAll('.warning');
  let isValid = true;

  warningSpans.forEach(span => span.remove());
  requiredInputsArray.forEach(input => (input.style.borderColor = 'rgb(152, 159, 184)'));

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
    displayModal('Ne visi laukeliai yra uzpildyti!', 3000, 'red');
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
  const level = formEl.level.value;
  const group = formEl.gr.value;
  const fieldsetEl = formEl[21].elements;
  const languagesArray = [...fieldsetEl].filter(language => language.checked).map(language => language.value);

  const requiredInputs = {
    nameInput: nameInput,
    surnameInput: surnameInput,
    ageInput: ageInput,
    phoneInput: phoneInput,
    emailInput: emailInput,
  };

  if (filterInvalidInputs(requiredInputs) === false) {
    return;
  }

  const studentInfo = {
    name: nameInput.value,
    surname: surnameInput.value,
    age: ageInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    level: level,
    group: group,
    languages: [...languagesArray],
  };

  addStudent(studentInfo);
  displayModal(`Sukurtas Studentas: ${studentInfo.name} ${studentInfo.surname}`, 5000);
  form.reset();
  levelLabelInput.textContent = 1;
  formEl.gr[0].checked = true;
});

const studentData = [
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860000000',
    email: 'mykolas@gmail.com',
    level: 1,
    group: 1,
    languages: ['Python', 'Javascript', 'C#', 'Java'],
  },
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860000000',
    email: 'mykolas@gmail.com',
    level: 1,
    group: 1,
    languages: ['Python', 'Javascript', 'C#', 'Java'],
  },
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860000000',
    email: 'mykolas@gmail.com',
    level: 1,
    group: 1,
    languages: ['Python', 'Javascript', 'C#', 'Java'],
  },
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860000000',
    email: 'mykolas@gmail.com',
    level: 1,
    group: 1,
    languages: ['Python', 'Javascript', 'C#', 'Java'],
  },
  {
    name: 'Mykolas',
    surname: 'Raudzius',
    age: '21',
    phone: '860000000',
    email: 'mykolas@gmail.com',
    level: 1,
    group: 1,
    languages: ['Python', 'Javascript', 'C#', 'Java'],
  },
];

function addStudentData(data) {
  for (let i = 0; i < data.length; i++) {
    addStudent(data[i]);
  }
}

addStudentData(studentData);

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
