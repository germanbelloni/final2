let page = 1;
pagina = 0;
const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');

btnNext.addEventListener('click',() =>{
    if(pagina < 4 && pagina != 3){
        pagina +=1;
        loadSeries();
    }

});

btnBack.addEventListener('click',() =>{
    if(pagina < 4 && pagina != 0){
        pagina -= 1;
        loadSeries();
    }

});

const loadSeries = async() => {
    
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=6ffd55a1e7204e9a95a2e64d876b3fce&language=es-MX&page=${page}`);

    
        if(response.status === 200) {
            const data = await response.json()
            
            showSeries(data.results);
        }else if(response.status === 401) {
            console.log('Paso algo malo')
        }else if(response.status === 404) {
            console.log('No existe la pelicula')
        }else{
            console.log('No se q paso')
        }

        

    } catch (error) {
        console.log(error)
    }
    
    
}
const showSeries = async(data) => {
    try {
        
        array = [];
        const length_array = 5;
        for (let i = 0; i < data.length; i += length_array) {
            let a = data.slice(i, i + length_array);
            array.push(a);
        }
        console.log(array)

        let html = "";
        for (let i = pagina;i < (pagina+1); i++) {
            
            array[i].forEach(movie =>{

                console.log(movie)
                html += `
                    <section class="movie" id="b${i}">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" alt="${movie.name}">
                        <h1>${movie.name}</h1>
    
                        <div id="m${movie.id}" class="modal">
    
                            <div class="modal-container">
                                <span id="close${movie.id}" class="close">&times;</span>
                                <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" alt="${movie.name}">
                                <div class="description-div">
                                    <div class="title">
                                        <h1>${movie.name}</h1>
                                        <p>${movie.overview}</p>
                                    </div>
                                    <h3>Valoración</h3>
                                    </br>
                                    <p><b>${movie.vote_count}</b></p>
                                    <h4>Fecha de lanzamiento: ${movie.first_air_date}</h4>
                                </div>
                            </div>
    
                        </div>
                    </section>
                `
            });
                
        }
        document.getElementById('container').innerHTML = html;
        console.log(pagina)

        
    }catch{
        console.log('Ocurrio un error')
    }
    
}
loadSeries()