let page = 1;

// const openModal = document.querySelector('.movie');
// const modal = document.querySelector('.modal');

// openModal.addEventListener('click', (e) =>{
//     e.preventDefault();
//     modal.classList.add('modal--show');
// })

const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');

const array_movie = []

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
                    <section class="movie" id="a${movie.title}">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                        <h1>${movie.title}</h1>
                        <button class="btn" onclick="showCard(${movie.id},${movie.title},${movie.overview},${movie.vote_average},${movie.release_date})">Show More</button>
                        
                        
                    </section>
                `
            }
            document.getElementById('container').innerHTML = html;


            // for (let i = 0; i < data.results.length;i++){
            //     const movie = data.results[i]

            //     // let id = element.querySelector(`#a${movie.title}`);

            //     id.onclick =function(){
            //         console.log('hola')
            //     }
            //}
           
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

function showCard(id,title,vote,date) {
    
    let html = "";
    
    html += `
    <div id="#a${id}" class="modal">
        
        <div class="modal-container">
            <span id="#cerrar${id}" class="close">&times;</span>
            
            <div class="description-div">
                <div class="title">
                    <h1>${title}</h1>
                    
                </div>
                <h3>Valoración</h3>
                </br>
                <p><b>${vote}</b></p>
                <h4>Fecha de lanzamiento: ${date}</h4>
            </div>
        </div>

    </div>`
    document.getElementById('container_show').innerHTML = html;
    let modal = html.querySelector(`#a${id}`);
    let span = html.querySelector(`#cerrar${id}`);

    modal.style.display = 'block';
    span.onclick = function() {
        modal.style.display = "none";
    }
}
    
loadMovies();