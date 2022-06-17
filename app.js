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

function addStudent(name, surname, age, phone, email, level, group, ...languages) {
  displayModal(`Sukurtas Studentas: ${name} ${surname}`, 5000);
  // Student List item
  const div = document.createElement('div');
  div.className = 'student-item';

  function turnLettersToStars(word) {
    let stars = '';
    for (i = 0; i < word.length; i++) {
      stars += '*';
    }
    return stars;
  }

  const pickedLanguages = languages.filter(language => language !== '');
  const displayLanguages = pickedLanguages.length ? pickedLanguages.join(', ') + '.' : '';
  const h3 = document.createElement('h3');
  h3.textContent = `${name} ${surname}`;
  const p1 = document.createElement('p');
  p1.textContent = 'Age: ' + age;
  const p2 = document.createElement('p');
  p2.textContent = 'Tel: ' + turnLettersToStars(phone);
  const p3 = document.createElement('p');
  p3.textContent = 'E-mail: ' + turnLettersToStars(email);
  const p4 = document.createElement('p');
  p4.textContent = 'Level: ' + level;
  const p5 = document.createElement('p');
  p5.textContent = 'Group: ' + group;
  const p6 = document.createElement('p');
  p6.textContent = 'Programming languages: ' + displayLanguages;
  const btn = document.createElement('button');
  btn.textContent = 'Rodyti asmens duomenis';

  let isHidden = true;

  btn.addEventListener('click', event => {
    if (isHidden) {
      p2.textContent = 'Tel: ' + phone;
      p3.textContent = 'E-mail: ' + email;
      btn.textContent = 'Slepti asmens duomenis';
    } else {
      p2.textContent = 'Tel: ' + turnLettersToStars(phone);
      p3.textContent = 'E-mail: ' + turnLettersToStars(email);
      btn.textContent = 'Rodyti asmens duomenis';
    }
    isHidden = !isHidden;
  });

  div.append(h3, p1, p2, p3, p4, p5, p6, btn);
  divStudentList.prepend(div);
}

function displayInvalidInput() {}

// Range input
inputLevel.addEventListener('input', event => {
  levelLabelInput.textContent = event.target.value;
});

// Form submit
form.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;

  const requiredInputs = Array.from(document.querySelectorAll('.required'));
  requiredInputs.forEach(input => {
    input.style.borderColor = 'rgb(152, 159, 184)';
    const oldSpan = input.parentElement.querySelector('span');
    oldSpan && oldSpan.remove();
  });
  const emptyInputs = requiredInputs.filter(input => input.value.trim().length === 0);
  if (emptyInputs.length !== 0) {
    displayModal('Ne visi laukeliai yra uzpildyti!', 3000, 'red');
    emptyInputs.forEach(input => {
      const span = document.createElement('span');
      input.style.borderColor = 'red';
      span.textContent = 'Sis laukelis yra privalomas';
      span.style.color = 'red';
      span.className = 'error';
      input.before(span);
    });
    return;
  }

  const inputs = form.elements;

  const name = inputs.name.value;
  const surname = inputs.surname.value;
  const age = inputs.age.value;
  const phone = inputs.phone.value;
  const email = inputs.email.value;
  const level = inputs.level.value;
  const group = inputs.gr.value;
  const javascript = inputs.javascript.checked ? inputs.javascript.value : '';
  const python = inputs.python.checked ? inputs.python.value : '';
  const java = inputs.java.checked ? inputs.java.value : '';
  const csharp = inputs.csharp.checked ? inputs.csharp.value : '';

  addStudent(name, surname, age, phone, email, level, group, javascript, python, java, csharp);
  form.reset();
  levelLabelInput.textContent = 1;
  inputs.gr[0].checked = true;
});

// (formos validacija naudojant JavaScript):
// Papildyti formos validaciją. Jeigu:
// 1. Vardas yra trumpesnis nei 3 simboliai, parašyti: „Vardas privalo būti bent 3 simbolių ilgumo".
// 2. Pavardė yra trumpesnė nei 3 simboliai, parašyti: „Pavardė privalo būti bent 3 simbolių ilgumo".
// 3. Amžius yra neigamas, parašyti: „Amžius privalo būti teigiamas skaičius".
// 4. Amžius yra daugiau nei 120 metų, parašyti: „Įvestas amžius yra per didelis".
// 5. Telefono numeris yra mažiau nei 9 arba daugiau nei 12, parašyti: „Įvestas telefono numeris yra neteisingas".
// 6. Elektroninis paštas yra trumpesnis nei 5 simboliai arba jame nėra panaudotas @ simbolis, parašyti: „Įvestas elektroninis paštas yra neteisingas".
