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
                    <section class="movie" id="a${movie.name}">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" alt="${movie.name}">
                        <h1>${movie.name}</h1>
                        <button class="btn" onclick="showCard(${movie.id},'${movie.backdrop_path}','${movie.name}','${movie.overview}','${movie.vote_average}','${movie.first_air_date}','${movie.original_language}')">Show More</button>
                        
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

function showCard(id,poster,name,overview,vote,date,language) {

    let el = document.createElement('div');
    let year = date.split('-').pop();
    
    let html = "";
    
    html += `
    <div class="modal-content2">
    
        <div class="modal-header">
            <span id="cerrar" class="close">&times;</span>
      
        </div>

        <div class="modal-body">
            <div class="row">
                <section class="movie">
                    <img src="https://image.tmdb.org/t/p/w500/${poster}" alt="${name}">
                
                </section>
                
            </div>

            <div class="row2">
                <div class="column">

                    <h2 class="title">${name} (${year})</h2>
                    <b>${date} (${language})</b>
                    <br>
                    <span class="${vote_average(vote)}">${vote}</span>
                    <b>Vista General</b>
                    <p>${overview}</p>
                    <button class="trailer"><a href="https://www.youtube.com/results?search_query=${name}+trailer">Trailer</a></button>

                    
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

    function vote_average(rating){
        if(rating>=6.5){
            return 'green'
        }else if(rating>=4.2){
            return 'orange'
        }else{
            return 'red'
        }
        
    }

}
loadSeries()