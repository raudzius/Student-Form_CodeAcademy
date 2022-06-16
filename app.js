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

  span.append(label, input);
  divRadio.append(span);
}
//

const form = document.querySelector('form');
const divStudentList = document.getElementById('student-list');
const inputLevel = document.getElementById('level');
const levelLabelInput = document.getElementById('level-value');

function addStudent(name, surname, age, phone, email, level, group, ...languages) {
  // Student List item
  const div = document.createElement('div');
  div.className = 'student-item';

  const pickedLanguages = languages.filter(language => language !== '');
  const displayLanguages = pickedLanguages.length ? pickedLanguages.join(', ') + '.' : '';

  div.innerHTML = `<h3>${name} ${surname}</h3>
                   <p>Age: ${age}</p>
                   <p>Tel: ${phone}</p>
                   <p>E-mail: ${email}</p>
                   <p>Level: ${level}</p>
                   <p>Group: ${group}</p>
                   <p>Programming languages: ${displayLanguages}</p>`;
  divStudentList.prepend(div);
  // Modal
  const spanModal = document.querySelector('span.modal');
  const backdrop = document.getElementById('backdrop');

  spanModal.innerHTML = `<h3>Sukurtas Studentas: ${name} ${surname}</h3>`;
  spanModal.style.display = 'block';
  backdrop.style.display = 'block';

  setTimeout(() => {
    spanModal.style.display = 'none';
    backdrop.style.display = 'none';
  }, 5000);
}

// Range input
inputLevel.addEventListener('input', event => {
  levelLabelInput.textContent = event.target.value;
});

// Form submit
form.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
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
  levelLabelInput.textContent = 1;
  form.reset();
});
