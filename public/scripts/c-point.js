
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then(states => {

            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }

        })
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;
    // Mostra o estado como nome na url

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then((res) => { return res.json() })
        .then(cities => {

            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }
            citySelect.disabled = false;
        })
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);

// Itens de coleta
// pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    // toda vez que clicar, vai chamar a função handleSelectedItem
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems = [];

// Pega o campo input hidden
const collectedItems = document.querySelector("input[name=items]");

function handleSelectedItem(event) {
    const itemLi = event.target;
    // adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle('selected');

    // pega o data-id de cada li
    const itemId = itemLi.dataset.id;



    // Fazendo a lógica para enviar a informação clicada para o formulário
    // Verificar se existem itens selecionado, se sim
    // pegar os itens selecionados 

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId;
        return itemFound;
    })


    // Se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })

        selectedItems = filteredItems;
    } else {
        // Se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId);
    }

    console.log(selectedItems);

    // Atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems;
}