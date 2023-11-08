class Contato {
    constructor(nome, telefone, email) {
        this._nome = nome;
        this._telefone = telefone;
        this._email = email;
    }
    get nome() {
        return this._nome;
    }
    set nome(nome) {
        this._nome = nome;
    }
    get telefone() {
        return this._telefone;
    }
    set telefone(telefone) {
        this._telefone = telefone;
    }
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }

    contemNome(pesquisa) {
        return this._nome.toLowerCase().includes(pesquisa.toLowerCase());
    }

    editarContato(index) {
    const nomeEditado = prompt('Digite o novo nome:');
    const telefoneEditado = prompt('Digite o novo telefone:');
    const emailEditado = prompt('Digite o novo email:');
    contatos[index].nome = nomeEditado;
    contatos[index].telefone = telefoneEditado;
    contatos[index].email = emailEditado;

    listaAtualizada();
}

}


class Cliente extends Contato {
    constructor(nome, telefone, email, empresa) {
        super(nome, telefone, email);
        this._empresa = empresa;
    }
    get empresa() {
        return this._empresa;
    }
    set empresa(empresa) {
        this._empresa = empresa;
    }
}

class Amigo extends Contato {
    constructor(nome, telefone, email, dataAniversario) {
        super(nome, telefone, email);
        this._dataAniversario = dataAniversario;
    }
    get dataAniversario() {
        return this._dataAniversario;
    }
    set dataAniversario(dataAniversario) {
        this._dataAniversario = dataAniversario;
    }
}

class ColegaDeTrabalho extends Contato {
    constructor(nome, telefone, email, departamento) {
        super(nome, telefone, email);
        this._departamento = departamento;
    }
    get departamento() {
        return this._departamento;
    }
    set departamento(departamento) {
        this._departamento = departamento;
    }
}

const fieldset = document.getElementById('contatoForm');
const nomeInput = document.getElementById('nome');
const telefoneInput = document.getElementById('telefone');
const emailInput = document.getElementById('email');
const agendaList = document.getElementById('agendaList');
const pesquisarInput = document.getElementById('searchNome');
const btnPesquisar = document.getElementById('Pesquisar');
const contatos = [];
const tipoContatoSelect = document.getElementById('tipoContato');
const empresaInput = document.getElementById('empresa');
const aniversarioInput = document.getElementById('aniversario');
const departamentoInput = document.getElementById('departamento');

btnPesquisar.addEventListener("click", pesquisarContato);

function listaAtualizada() {
    agendaList.innerHTML = '';

    contatos.forEach((contato, index) => {
        const li = document.createElement('li');
        li.classList.add('contato-item');
        
        li.innerHTML = `
      <strong>Nome:</strong> ${contato.nome}<br>
      <strong>Telefone:</strong> ${contato.telefone}<br>
      <strong>Email:</strong> ${contato.email}<br>
    `;
        // Verifica o tipo de contato e inclui as informações específicas
        console.log(contato)
        if (contato instanceof Cliente) {
            li.innerHTML += `<strong>Empresa:</strong> ${contato.empresa}<br>`;
        } else if (contato instanceof Amigo) {
            li.innerHTML += `<strong>Data de Aniversário:</strong> ${contato.dataAniversario}<br>`;
        } else if (contato instanceof ColegaDeTrabalho) {
            li.innerHTML += `<strong>Departamento:</strong> ${contato.departamento}<br>`;
        }

        li.innerHTML += `
      <button class="botao-edicao" onclick="editarContato(${index})">Editar</button>
      <button class="botao-excluir" onclick="excluirContato(${index})">Excluir</button>
    `;
        agendaList.appendChild(li);
    });
}


fieldset.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nome = nomeInput.value;
    const telefone = telefoneInput.value;
    const email = emailInput.value;

    if (tipoContatoSelect.value == "cliente") {
        const empresa = document.getElementById('empresa').value;
        const TipoContato = new Cliente(nome, telefone, email, empresa);
        contatos.push(TipoContato);
    } else if (tipoContatoSelect.value == "amigo") {
        const dataAniversario = document.getElementById('aniversario').value;
        const TipoContato = new Amigo(nome, telefone, email, dataAniversario);
        contatos.push(TipoContato);
    } else if (tipoContatoSelect.value == "colega") {
        const departamento = document.getElementById('departamento').value;
        const TipoContato = new ColegaDeTrabalho(nome, telefone, email, departamento);
        contatos.push(TipoContato);
    } else if (tipoContatoSelect.value == "outros"){
        const TipoContato = new Contato(nome, telefone, email);
        contatos.push(TipoContato);
    }

    listaAtualizada();
    fieldset.reset();
});

tipoContatoSelect.addEventListener('change', function () {
    const selectedValue = tipoContatoSelect.value;
    // Ocultar todos os campos antes de mostrar o campo relevante
    empresaInput.style.display = 'none';
    aniversarioInput.style.display = 'none';
    departamentoInput.style.display = 'none';


    if (selectedValue === 'cliente') {
        empresaInput.style.display = 'block';
    } else if (selectedValue === 'amigo') {
        aniversarioInput.style.display = 'block';
    } else if (selectedValue === 'colega') {
        departamentoInput.style.display = 'block';
    } else if (selectedValue === 'outros'){
        empresaInput.style.display = 'none';
        aniversarioInput.style.display = 'none';
        departamentoInput.style.display = 'none';
    }
});

function excluirContato(index) {
    contatos.splice(index, 1);
    listaAtualizada();
}

function pesquisarContato() {
    const searchNome = pesquisarInput.value;
    let contatoEncontrado = false;
    for (let i = 0; i < contatos.length; i++) {
        if (contatos[i].nome === searchNome) {
            contatoEncontrado = true;
            alert(`O contato com o nome "${searchNome}" foi encontrado!`);
            break;
        }
    }
    if (!contatoEncontrado) {
        alert(`O contato com o nome "${searchNome}" não existe!`);
    }
}

