
let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener(`click`,()=>{
        if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
        }
});

btnAnterior.addEventListener(`click`,()=>{
    if(pagina > 1){
        pagina -=1;
        cargarPeliculas();
    }
})

const cargarPeliculas = async () => {
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cb50a963e9c4387857a449319500d022&language=es-AR&page=${pagina}`);

        if (respuesta.status === 200){
            const datos = await respuesta.json();

            let peliculas = ``;
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                    <img class="poster" src="http://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `;
            });
                document.getElementById("contenedor").innerHTML = peliculas;

        }else if (respuesta.status === 401){
            alert("pusiste la llave mal")
        }else if (respuesta.status === 404){
            alert("la pelicula que buscas no existe")
        }else{
            alert("hubo un error y no sabemos que paso")
        }
        
    }catch(error){
        alert(error)
    }
    
}

cargarPeliculas();
