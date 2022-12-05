let page = 1;

// const openModal = document.querySelector('.movie');
// const modal = document.querySelector('.modal');

// openModal.addEventListener('click', (e) =>{
//     e.preventDefault();
//     modal.classList.add('modal--show');
// })

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
            // showMovies(data.results)
            let movies = '';
            data.results.forEach(movie =>{
                movies += `
            
                <div class="movie">
                    
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
                    <h3 class="title">${movie.title}</h3>
                    
                </div>
                
                `;
            })

            document.getElementById('container').innerHTML = movies;
            
            const movie = document.querySelector('.movie');
            movie.onclick = function() {
                window.location.href = 'https://image.tmdb.org/'
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