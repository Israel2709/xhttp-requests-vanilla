/*https://ajaxclass9g.firebaseio.com/ravenclaw/characters/.json*/

let coleccionDePersonajes;

const reqListener = () => {
    console.log(this.responseText)
}
/*
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
    document.getElementById("demo").innerHTML = this.responseText;
    }
 };
 xhttp.open("GET", "ajax_info.txt", true);
 xhttp.send();
*/


//$.ajax({ /*método de jquery para peticiones AJAX*/
    //url: url, /*URL a la que haremos la petición*/
    //method:method, /*Tipo de petición que vamos a realizar ( GET, POST, PUT, PATCH, DELETE )*/
    //data: data, /*Los datos que enviaremos con la petición ( en caso de que aplique - POST, PUT, PATCH - )*/
    //success: ( response )=>{} /* callback cuando mi petición se cumpla*/
    //error: ( error ) => {} /*callback para cuando exista un error
//});

const guardarPersonaje = () => {
    let name = $("#name").val();
    let country = $("#country").val();
    let gender = $("input[type='radio']:checked").val()
    let birthDate = $("#birth-date").val();
    let picture = $("#picture").val();
    let bio = $("#bio").val()

    let personaje = { name, country, gender, birthDate, picture, bio }

    $.ajax({
        url:`https://ajaxclass9g.firebaseio.com/ravenclaw/historicCharacters/.json`,
        method:"POST",
        data: JSON.stringify(personaje),
        success: ( response ) => {
            console.log("personaje guardado")
            obtenerPersonajes();
        },
        error: ( error ) => {
            console.log("personaje no guardado")
        }
    })
}

const obtenerPersonajes = () => {
    $.ajax({ 
        url: `https://ajaxclass9g.firebaseio.com/ravenclaw/historicCharacters/.json`, 
        method:"GET",
        success: ( response ) => {
            console.log( response )
            coleccionDePersonajes = response
            let personajes = response;
            filterJsonByGender();

            console.log(personajes)

            $("#characters-row").empty();
            for( llave in personajes ){
                console.log( personajes[llave])
                let { bio, birthDate, country, gender, name, picture } = personajes[llave]
                $("#characters-row").append(`
                    <div class="col-12 col-md-4 mb-3 character-card ${gender}">
                        <div class="card">
                            <img src=${picture} class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${bio}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item">${birthDate}</li>
                            <li class="list-group-item">${country}</li>
                            <li class="list-group-item">${gender}</li>
                            </ul>
                        </div>
                    </div>
                `)
            }
            $(".btn-delete").click(( event )=>{
                /*let llave = event.target.dataset.llavePersonaje*/
                /*Recordatorio: event es un objeto que contiene todos los datdos del evento que estamos escuchando
                event.target indica el elemento específico al que le sucedio el evento*/

                /*event: cayo un árbol sobre un auto gris*/
                /*event.target: un auto gris*/
                /*event.target.color: gris*/


                let llave = $(event.target).data("llave-personaje")

                $.ajax({
                    url: `https://ajaxclass9g.firebaseio.com/ravenclaw/characters/${llave}.json`,
                    method:"DELETE", 
                    success: ( response )=>{
                        obtenerPersonajes();
                    },
                    error: ( error ) => {
                        console.log(error)
                    } 
                });
            })
        }  
    });
}

/*const filterByGender = event => {
    console.log($(event.target).val())
    let gender = $(event.target).val()
    $(".character-card").show();
    switch( gender ){
        case 'male':
            console.log("masculino")
            $(".character-card").filter(".character-card.female").hide()
            break;
        
        case 'female':
            console.log("femenino")
            $(".character-card").filter(".character-card.male").hide()
            break;
        
        case 'all':
            console.log("todos")
            break;
    }
} */



//$("#gender-select").change(filterByGender)

let personajesMasculinos = [];
let personajesFemeninos = []

const filterJsonByGender = () => {
    /*el json esta en coleccionDePersonajes */

    //console.log(Object.keys(coleccionDePersonajes))
    //console.log(Object.keys(coleccionDePersonajes)[0])

    for( personaje in coleccionDePersonajes ){
        console.log( coleccionDePersonajes[personaje].gender)
        let objetoPersonaje = coleccionDePersonajes[personaje]
        let gender = coleccionDePersonajes[personaje].gender

        gender === 'male' ?  personajesMasculinos.push(objetoPersonaje) : personajesFemeninos.push(objetoPersonaje)
    }

    console.log(personajesMasculinos)
    console.log(personajesFemeninos)
}

const imprimirPersonajesPorGenero = event => {
    let gender = $(event.target).val();
    $("#characters-row").empty()
    switch( gender ) {
        case 'male':
            personajesMasculinos.forEach( personaje => {
                let { gender, picture, name, bio, birthDate, country } = personaje
                $("#characters-row").append(`
                    <div class="col-12 col-md-4 mb-3 character-card ${gender}">
                        <div class="card">
                            <img src=${picture} class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${bio}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item">${birthDate}</li>
                            <li class="list-group-item">${country}</li>
                            <li class="list-group-item">${gender}</li>
                            </ul>
                        </div>
                    </div>
                `)
            })
            break;
        
        case 'female':
            personajesFemeninos.forEach( personaje => {
                let { gender, picture, name, bio, birthDate, country } = personaje
                $("#characters-row").append(`
                    <div class="col-12 col-md-4 mb-3 character-card ${gender}">
                        <div class="card">
                            <img src=${picture} class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${bio}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item">${birthDate}</li>
                            <li class="list-group-item">${country}</li>
                            <li class="list-group-item">${gender}</li>
                            </ul>
                        </div>
                    </div>
                `)
            })
            break;
        
        case 'all':
            for( llave in coleccionDePersonajes ){
                console.log( coleccionDePersonajes[llave])
                let { bio, birthDate, country, gender, name, picture } = coleccionDePersonajes[llave]
                $("#characters-row").append(`
                    <div class="col-12 col-md-4 mb-3 character-card ${gender}">
                        <div class="card">
                            <img src=${picture} class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${bio}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item">${birthDate}</li>
                            <li class="list-group-item">${country}</li>
                            <li class="list-group-item">${gender}</li>
                            </ul>
                        </div>
                    </div>
                `)
            }

    }
} 


const printCharactersByGender = event => {
    let gender = $(event.target).val();
    /*coleccionDePersonajes*/

    if( gender === 'all'){
        for( llave in coleccionDePersonajes ){
            console.log( coleccionDePersonajes[llave])
            let { bio, birthDate, country, gender, name, picture } = coleccionDePersonajes[llave]
            $("#characters-row").append(`
                <div class="col-12 col-md-4 mb-3 character-card ${gender}">
                    <div class="card">
                        <img src=${picture} class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${bio}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">${birthDate}</li>
                        <li class="list-group-item">${country}</li>
                        <li class="list-group-item">${gender}</li>
                        </ul>
                    </div>
                </div>
            `)
        }
    } else {
        let keysArray = Object.keys( coleccionDePersonajes )
        let filteredArray = keysArray.filter( key => {
            return coleccionDePersonajes[key].gender === gender
        })

        console.log(filteredArray)
    
        $("#characters-row").empty();
        filteredArray.forEach( personaje => {
            let { gender, picture, name, bio, birthDate, country } = coleccionDePersonajes[personaje]
            $("#characters-row").append(`
                <div class="col-12 col-md-4 mb-3 character-card ${gender}">
                    <div class="card">
                        <img src=${picture} class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${bio}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">${birthDate}</li>
                        <li class="list-group-item">${country}</li>
                        <li class="list-group-item">${gender}</li>
                        </ul>
                    </div>
                </div>
            `)
        })
    }
}

//$("#gender-select").change(imprimirPersonajesPorGenero)
$("#gender-select").change(printCharactersByGender)

$("#save-button").click(guardarPersonaje)
console.log(coleccionDePersonajes)
obtenerPersonajes()


