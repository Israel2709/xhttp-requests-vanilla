const postCharacter = characterObject => {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 400) {
            alert("debes stringyficar tu objeto")
        }
        if (this.readyState == 4 && this.status == 200) { /*petición completa y correcta*/
            console.log(this.responseText)  /*cachamos la respuesta del servidor*/
            getCharacters()
        }
    };
    http.open("POST", "https://ajaxclass9g.firebaseio.com/ravenclaw/characters/.json");
    http.send(JSON.stringify(characterObject));
}

const deleteCharacter = characterKey => {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { 
            console.log(this.responseText)  /
            getCharacters()
        }
    };

    http.open("DELETE", `https://ajaxclass9g.firebaseio.com/ravenclaw/characters/${characterKey}/.json`);
    http.send();
}


const getCharacters = () => {

    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        console.log(this.readyState)
        if (this.readyState == 4 && this.status == 200) { /*petición completa y correcta*/

            let characters = JSON.parse(this.responseText)
            document.getElementById("characters-table").innerHTML = ""

            for (character in characters) {
                console.log(character)
                printTable(characters[character], character)
            }

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener("click", ( event ) => {
                    console.log(event.target)
                    let characterKey = event.target.dataset.characterKey
                    console.log(characterKey)
                    deleteCharacter( characterKey )
        
                })
            })
        }
    };
    http.open("GET", "https://ajaxclass9g.firebaseio.com/ravenclaw/characters/.json")
    http.send()
}

document.getElementById("save-button").addEventListener("click", () => {
    console.log("Click");
    let name = document.getElementById("name").value
    let lastName = document.getElementById("last-name").value
    let book = document.getElementById("book").value
    let characterObject = { name, lastName, book }
    console.log(characterObject)
    postCharacter(characterObject)
})

const printTable = (character, key) => {

    let { name, lastName, book } = character

    let characterRow = document.createElement("tr")
    let nameCell = document.createElement("td")
    let bookCell = document.createElement("td")
    let buttonCell = document.createElement("td")

    let deleteButton = document.createElement("button")
    deleteButton.classList.add('btn-danger', 'btn', 'delete-btn')
    deleteButton.dataset.characterKey = key

    let nameText = document.createTextNode(`${name} ${lastName}`)
    let bookText = document.createTextNode(book)
    let buttonText = document.createTextNode("Eliminar")

    nameCell.appendChild(nameText)
    bookCell.appendChild(bookText)
    deleteButton.appendChild(buttonText)
    buttonCell.appendChild(deleteButton)

    characterRow.appendChild(nameCell)
    characterRow.appendChild(bookCell)
    characterRow.appendChild(buttonCell)

    document.getElementById("characters-table").append(characterRow)
}


getCharacters()