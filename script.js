    // para sacar la fecha del dia que estan consultando...
    const fechaHoy = new Date();
    const mostrarFecha = document.getElementById('mostrarFecha');
    mostrarFecha.innerHTML = fechaHoy.toLocaleDateString();

async function llamarAPI(){ //lo hago con async porque RapidAPI me lo da con un await al generarlo 
                            // de una vez con el fetch y no me quiero complicar la vida cambiando de forma...
        const buscarPelicula = document.getElementById('busqueda').value;
        const url = `https://rottentomato.p.rapidapi.com/search?search-term=${encodeURIComponent(buscarPelicula)}`; 
                                                        //encodeURIComponent para evitar que de error al buscar algo con una tilde o espacios
        const options = {
	    method: 'GET',
	    headers: {
			'x-rapidapi-key': '',
            'x-rapidapi-host': ''
	    }
    };

    try {
        const respuesta = await fetch(url, options);
        const data = await respuesta.json();
        console.log(data);

        const contenedor = document.getElementById("contenedor-peliculas");
        contenedor.innerHTML='';

        const items = (data?.movies_shows).slice(0,5);

        items.forEach(pelicula => {
            
            const poster = pelicula.posterImageUrl || 'https://via.placeholder.com/300x450?text=Sin+Imagen';
            const titulo = pelicula.title || "Sin titulo";
            const publicada = pelicula.releaseYear || "Año desconocido";
            const puntuacion = pelicula.rottenTomatoes?.audienceScore || "Puntuacion desconocida";

            const carta = `
                            <div class="col-md-4 col-lg-3 mb-4">
                                <div class="card h-100">
                                    <img src="${poster}" class="card-img-top" alt="${titulo}">
                                    <div class="card-body">
                                        <h5 class="card-title">${titulo}</h5>
                                        <p class="card-text"><strong>Año:</strong> ${publicada}</p>
                                        <p class="card-text">Puntuacion: ${puntuacion} %</p>
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