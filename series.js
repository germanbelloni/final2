let page = 1;

const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');

btnNext.addEventListener('click',() =>{
    if(pagina < 5){
        
        loadSeries();
    }

});

btnBack.addEventListener('click',() =>{
    if(page > 5){
        page -= 1;
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

        let movies = '';
        for (let i = 0; i < array.length;i++){
            array[2].forEach(movie =>{
                movies += `
            
                <div class="movie">
                    
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" />
                    <h3 class="title">${movie.name}</h3>
                    
                </div>
                
                `;
                console.log(array[i])
                document.getElementById('container').innerHTML = movies;
                pagina +=1;
        
            });    
        }
        
            
        
            
            

        
    }catch{
        console.log('hola')
    }
    
}
loadSeries()