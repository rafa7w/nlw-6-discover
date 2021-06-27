import Modal  from './modal.js';

const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');


// Pegar todos os botões que existem com a classe check
const checkButtons = document.querySelectorAll('.actions a.check');

// Pegar quando o marcar como lido for clicado
checkButtons.forEach(button => {
    // adicionar a escuta
    button.addEventListener('click', handleCLick);
});

// Quando o botão delete for clicado, ele abre a modal
const deleteButton = document.querySelectorAll('.actions a.delete');

deleteButton.forEach(button => {
    button.addEventListener('click', (event) => handleCLick(event, false));
});

function handleCLick(event, check = true) {
    event.preventDefault();
    const  text = check ? 'Marcar como lida' : 'Excluir';

    modalTitle.innerHTML = `${text} esta pergunta`;
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`;
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`;

    check ? modalButton.classList.remove('red') : modalButton.classList.add('red');

    modal.open();
};