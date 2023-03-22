fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then ((respuesta)=> respuesta.json())
.then ((datos)=>{
        let eventos = datos.events
        tarjetas(eventos)
        pintarChecks(data.events)
        function superfiltro(){
                let filtro = filtroTexto(data.events, search.value)
                let filtro1 = filtroCheckbox(filtro)
                tarjetas(filtro1)
        }
        search.addEventListener('input',superfiltro)
        checkbox.addEventListener('change',superfiltro)
})


const contenedor= document.querySelector(".contenedor")

const checkbox = document.querySelector(".checkbox")

const search= document.querySelector("#search")


function tarjetas(array) {
        let cards = ``;
        let plantilla = document.getElementById("tarjeta");
                array.forEach(i=> {
                cards += `
                <div class="tarjeta1">
                <div class="tarjeta_header">
                                <img src="${i.image}" alt="foto">
                        </div>
                        <div class="tarjeta_body">
                                <h3>${i.name}</h3>
                                <p>${i.description}</p>
                        </div>
                        <div class="tarjeta_footer">
                                <p>price:${i.price}</p>
                                <a href="./details.html?id=${i._id}">ver mas</a>
                        </div>
                </div>
                `;
        })
        plantilla.innerHTML = cards;
}

function filtroTexto (array,texto) {
        let filtro = array.filter(elemento=>elemento.name.toLowerCase().includes(texto.toLowerCase())) 
        return filtro
}

function pintarChecks(array){
        let check=''
        let categoriasRepetidas=array.map(categoria=>categoria.category)
        let categorias= new Set(categoriasRepetidas)
        categorias.forEach(e=>{
                check+=`
                <input type="checkbox" id="${e}" name="${e}" value="${e}">
                <label for="${e}">${e}</label>
                `
        })
        checkbox.innerHTML= check
}

function filtroCheckbox(array){
        let checkboxes= document.querySelectorAll("input[type='checkbox']")
        let arrCheckboxes= Array.from(checkboxes)
        let checkeds= arrCheckboxes.filter(check => check.checked)
        if(checkeds.length == 0){
                return array
        }
        let values=checkeds.map(check => check.value)
        let filtro = array.filter(i => values.includes(i.category))
        return filtro
}
