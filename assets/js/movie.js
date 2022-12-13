let page = 1;

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
                    <section class="movie" id="a${movie.title}">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                        <h1>${movie.title}</h1>
                        <button class="btn" onclick="showCard(${movie.id},'${movie.poster_path}','${movie.title}','${movie.overview}','${movie.vote_average}','${movie.release_date}','${movie.original_language}')">Show More</button>
                        
                        
                    </section>
                `
            }
            document.getElementById('container').innerHTML = html;
           
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

function showCard(id,poster,title,overview,vote,date,language) {

    let el = document.createElement('div');
    let year = date.split('-')[0];
    
    let html = "";
    
    html += `
    <div class="modal-content">
    
        <div class="modal-header">
            <span id="cerrar" class="close">&times;</span>
      
        </div>

        <div class="modal-body">
            <div class="row">
                <section class="movie">
                    <img src="https://image.tmdb.org/t/p/w500/${poster}" alt="${title}">
                
                </section>
                
            </div>

            <div class="row2">
                <div class="column">

                    <h2 class="title">${title} (${year})</h2>
                    <b>${date} (${language})</b>
                    <br>
                    <span class="${vote_average(vote)}">${vote}</span>
                    <b>Vista General</b>
                    <p>${overview}</p>
                    <button class="trailer"><a href="https://www.youtube.com/results?search_query=${title}+trailer">Trailer</a></button>

                    
                </div>
            </div>
        </div>
        <div class="modal-footer">
            
        </div>
    </div>

    `
    let div = document.getElementById('container_show');
    
    div.innerHTML = html;
    let span = document.getElementById('cerrar')
    div.style.display = 'block';
    
    span.onclick = function() {
        div.style.display = "none";
    }
}

function vote_average(rating){
    if(rating>=6.5){
        return 'green'
    }else if(rating>=4.2){
        return 'orange'
    }else{
        return 'red'
    }
    
}
loadMovies();