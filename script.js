    const fechaHoy = new Date();
    const mostrarFecha = document.getElementById('mostrarFecha');
    mostrarFecha.innerHTML = fechaHoy.toLocaleDateString();

async function llamarAPI(){ //lo hago con async porque RapidAPI me lo da con un await al generarlo 
                              // de una vez con el fetch y no me quiero complicar la vida cambiando de forma...
    const url = 'https://rottentomato.p.rapidapi.com/search?search-term=kin';
        const options = {
	    method: 'GET',
	    headers: {
			// se agrega la llave proporcionada por RapidAPI
			// se agrega el host
	    }
    };
    try {
        const respuesta = await fetch(url, options);
        const data = await respuesta.json();
        console.log(data);

        const contenedor = document.getElementById("contenedor-peliculas");
        contenedor.innerHTML="";
        const peliculas = data.movies_shows.slice(0,5);

        peliculas.forEach(peli => {
            const poster = peli.thumbnail || "https://via.placeholder.com/300x450?text=Sin+imagen";
            const titulo = peli.title || "Sin titulo";
            const publicada = peli.year || "Año desconocido";
            
            const carta = `<div class="col-md-4-col-lg-3mb-4">
                                <div class="card h-100">
                                    <img src="$(poster)" class="card-img-top" alt="$(titulo)">
                                        <div class="card-body">
                                            <h5 class="card-tittle">${titulo}</h5>
                                            <p class="card-text"><strong>Año:</strong> ${publicada}</p>
                                        </div>    
                                </div>
                          </div>
                          `;
            contenedor.innerHTML += carta;
        });

    }catch (error){
        console.error("Error al cargar...",error);
    }
}


llamarAPI();

