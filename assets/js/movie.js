let page = 1;

// const openModal = document.querySelector('.movie');
// const modal = document.querySelector('.modal');

// openModal.addEventListener('click', (e) =>{
//     e.preventDefault();
//     modal.classList.add('modal--show');
// })
let element = document.createElement('div');
const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');

btnNext.addEventListener('click',() =>{
    if (page<1000){
        page += 1;
        loadMovies();
    }
});

btnBack.addEventListener('click',() =>{
    if (page>1){
        page -= 1;
        loadMovies();
    }
})

const loadMovies = async() => {
    
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=6ffd55a1e7204e9a95a2e64d876b3fce&language=es-MX&page=${page}`);

        console.log(response);

        if(response.status === 200) {
            const data = await response.json()
            console.log(data.results);
            
            let html = "";
            for(let i = 0; i < data.results.length;i++){
                
                const movie = data.results[i]

                html += `
                    <section class="movie" id="b${i}">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                        <h1>${movie.title}</h1>
    
                        <div id="m${movie.id}" class="modal">
    
                            <div class="modal-container">
                                <span id="close${movie.id}" class="close">&times;</span>
                                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                                <div class="description-div">
                                    <div class="title">
                                        <h1>${movie.title}</h1>
                                        <p>${movie.overview}</p>
                                    </div>
                                    <h3>Valoración</h3>
                                    </br>
                                    <p><b>${movie.vote_average}</b></p>
                                    <h4>Fecha de lanzamiento: ${movie.release_date}</h4>
                                </div>
                            </div>
    
                        </div>
                    </section>
                `
            }
            document.getElementById('container').innerHTML = html;

            element.innerHTML = html

            for(let i = 0; i < data.results.length;i++){
                const movie = data.results[i]
                
                let btn = element.querySelector(`#b${i}`)
    
                let modal = element.querySelector(`#m${movie.id}`);
            
                let span = element.querySelector(`#close${movie.id}`);
            
                btn.onclick = function() {
                    modal.style.display = "block";
                    window.document.title = `Peliculas | ${movie.title}`
                }
            
                span.onclick = function() {
                    modal.style.display = "none";
                }
            
                window.addEventListener('click', (e) => {
                    if (e.target == modal) {
                        modal.style.display = "none";
                        window.document.title = 'Peliculas'
                    }
                })
            }
           

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

loadMovies();