const apiKey = '9c8b2850'; // OMDb API anahtarınızı buraya yapıştırın.

async function searchMovie() {
    const query = document.getElementById('searchInput').value;
    if (!query) {
        alert("Lütfen bir film veya dizi adı girin!");
        return;
    }

    // OMDb API'ye istek gönderme
    const url = `https://www.omdbapi.com/?t=${query}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "False") {
            document.getElementById('movieDetails').innerHTML = "<p>Film veya dizi bulunamadı.</p>";
            return;
        }

        // Film veya dizi bilgilerini gösterme :)
        displayMovie(data);
    } catch (error) {
        console.error("API isteği başarısız:", error);
        document.getElementById('movieDetails').innerHTML = "<p>Bir hata oluştu. Lütfen tekrar deneyin.</p>";
    }
}

function displayMovie(movie) {
    const movieDetails = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div class="movie-info">
            <h2>${movie.Title} (${movie.Year})</h2>
            <p><strong>Yönetmen:</strong> ${movie.Director}</p>
            <p><strong>Oyuncular:</strong> ${movie.Actors}</p>
            <p><strong>IMDB Puanı:</strong> ${movie.imdbRating}</p>
            <p><strong>Açıklama:</strong> ${movie.Plot}</p>
        </div>
    `;
    document.getElementById('movieDetails').innerHTML = movieDetails;
}
