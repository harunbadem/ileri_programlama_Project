// API'den veri çekme ve tabloyu doldurma
function veriTablo(apiType, targetTableId) {
    var data = null;
    var apiUrl = getApiUrl(apiType);  
  
    if (!apiUrl) {
      alert("Geçersiz API tipi.");
      return;
    }
  
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        try {
          const response = JSON.parse(this.responseText); // JSON yanıtını 
          showPiyasaTable(targetTableId);
        
          TabloDoldur(response.result, targetTableId); // Tabloyu doldur
          


        } catch (error) {
          
          alert("Hata oluştu 1: " + error.message);  
        }
      }
    });
  
    xhr.open("GET", apiUrl);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("authorization", "apikey 5yYdXxTPXLAQBRPgzq9Kst:0yLiw6P4J85QPWRqox2EyP");
    xhr.send(data);
  }
  
  // API URL'ini switch-case yapısı ile almak
  function getApiUrl(apiType) {
    let apiUrl = "";
    switch (apiType) {
      case 'gold':
        apiUrl = 'https://api.collectapi.com/economy/goldPrice';
        break;
  
      case 'doviz':
        apiUrl = 'https://api.collectapi.com/economy/allCurrency';
        break;
  
      case 'kripto':
        apiUrl = 'https://api.collectapi.com/economy/cripto';  
        break;
    
    case 'emtia':
        apiUrl = 'https://api.collectapi.com/economy/emtia';  
        break;
        
    case 'hisse':
        apiUrl = 'https://api.collectapi.com/economy/hisseSenedi';  
        break;    
  
      default:
        apiUrl = null;  
        break;
    }
    return apiUrl;
  }
  
  // Tablo doldurma fonksiyonu
  function TabloDoldur(data, targetTableId) {
    

    const tableBody = document.querySelector(`#${targetTableId} tbody`);
    tableBody.innerHTML = ""; // Önce tabloyu temizle
  
    switch (targetTableId) {
      case 'goldTable':
        data.forEach((item) => {
          const row = document.createElement("tr");
          const rateClass = getRateClass(item.rate); 
  
          row.innerHTML = `
            <td>${item.name || "-"}</td>
            <td>${item.buying || "-"}</td>
            <td>${item.selling || "-"}</td>
            <td class="${rateClass}">%${item.rate || "0"}</td> <!-- Rate'i renkli yap -->
          `;
          
          tableBody.appendChild(row);
        });
        break;
  
      case 'dovizTable':
        data.forEach((item) => {
          const row = document.createElement("tr");
          const rateClass = getRateClass(item.rate);
  
          row.innerHTML = `
            <td>${item.code || "-"}</td>
            <td>${item.name || "-"}</td>
            <td>${item.buying || "-"}</td>
            <td>${item.selling || "-"}</td>
            
            <td class="${rateClass}">%${item.rate || "0"}</td> <!-- Rate'i renkli yap -->
          `;
          
          tableBody.appendChild(row);
        });
        break;

      case 'kriptoTable':
        data.forEach((item) => {
          const row = document.createElement("tr");
          const rateClass1 = getRateClass(item.changeHour);
          const rateClass2 = getRateClass(item.changeDay); 
          const rateClass3 = getRateClass(item.changeWeek);  
  
          row.innerHTML = `
            <td>${item.code || "-"}</td>
            <td>${item.name || "-"}</td>
            
            <td>${item.volume || "-"}</td>
            <td>${item.price || "-"}$</td>
            <td>${item.marketCap || "-"}$</td>
            <td>${item.circulatingSupply || "-"}</td>
            <td class="${rateClass1}">%${item.changeHour || "0"}</td> <!-- Rate'i renkli yap -->
            <td class="${rateClass2}">%${item.changeDay || "0"}</td>
            <td class="${rateClass3}">%${item.changeWeek || "0"}</td>
          `;
          
          tableBody.appendChild(row);
        });
        break;
        
      case 'emtiaTable':
        data.forEach((item) => {
          const row = document.createElement("tr");
          const rateClass = getRateClass(item.rate); 
  
          row.innerHTML = `
            <td>${item.name || "-"}</td>
            <td>${item.text || "-"}</td>
            <td>${item.buying || "-"}</td>
            <td>${item.selling || "-"}</td>
            
            <td class="${rateClass}">%${item.rate || "0"}</td> <!-- Rate'i renkli yap -->
          `;
          
          tableBody.appendChild(row);
        });
        break;

      case 'hisseTable':
        data.forEach((item) => {
          const row = document.createElement("tr");
          const rateClass = getRateClass(item.rate); 
  
          row.innerHTML = `
            <td>${item.code || "-"}</td>
            <td>${item.text || "-"}</td>
            <td>${item.lastprice || "-"}</td>
            <td>${item.min || "-"}</td>
            <td>${item.max || "-"}</td>
            <td>${item.hacim || "-"}</td>
            <td>${item.time || "-"}</td>         
            <td class="${rateClass}">%${item.rate || "0"}</td> <!-- Rate'i renkli yap -->
          `;
          
          tableBody.appendChild(row);
        });
        break;

      default:
        console.log("Bilinmeyen tablo idsi");
        break;
    }
  }
//yüzdeliklerin rengini belirleme
  function getRateClass(rate) {
    if (rate > 0) return 'text-success'; 
    if (rate < 0) return 'text-danger';  
    return ''; 
  }
// tabloları gizleme ve gösterme fonksiyonları
  function showPiyasaTable(tableId) {
    hidePiyasaTables();
    
    const table = document.getElementById(tableId);

    
    table.classList.remove('hidden');
}

function hidePiyasaTables() {
    const tables = document.querySelectorAll("table"); 
    tables.forEach((table) => {
        table.classList.add("hidden"); 
    });
}

let allData = {
    gold: [],
    doviz: [],
    kripto: [],
    emtia: [],
    hisse: []
};

function veriAl(apiType) {
    var data = null;
    var apiUrl = getApiUrl(apiType);  
  
    if (!apiUrl) {
      alert("Geçersiz API tipi.");
      return;
    }
  
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        try {
          const response = JSON.parse(this.responseText); 
          
        
        allData[apiType] = response.result; 
          


        } catch (error) {
          
          alert("Hata oluştu 2: " + error.message);  
        }
      }
    });
  
    xhr.open("GET", apiUrl);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("authorization", "apikey 5yYdXxTPXLAQBRPgzq9Kst:0yLiw6P4J85QPWRqox2EyP");
    xhr.send(data);
  }

 



// Arama motorunda filtreleme
function searchData() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();  // Kullanıcıdan alınan arama terimi
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = "";  // Arama sonuçlarını temizle
    searchResultsDiv.style.display = 'block';  // Başlangıçta arama sonuçlarını gizle

    if (searchQuery.length === 0) {
        return;  
    }

    const filteredData = [];

    // Tüm veri kategorilerinde arama yapacak
    Object.keys(allData).forEach((key) => {
        // Veriyi filtrele
        allData[key].forEach(item => {
            
            if (JSON.stringify(item).toLowerCase().includes(searchQuery)) {
                filteredData.push({ category: key, item: item });
            }
        });
    });

    
    const limitedData = filteredData.slice(0, 10);

    
    if (limitedData.length > 0) {
        searchResultsDiv.style.display = 'block';
        limitedData.forEach(data => {
            // Her arama sonucunu listele
            let resultDiv = document.createElement('div');
            resultDiv.className = 'result-item'; 
            resultDiv.textContent = `${data.category.toUpperCase()}: ${data.item.name || data.item.text || data.item.code}`;
            resultDiv.style.cursor = 'pointer';  
            resultDiv.onclick = function () {
               
                 alert("Seçilen öğe: " + JSON.stringify(data.item)); //seçilen öge gösterilir
                
            };

            
            
            searchResultsDiv.appendChild(resultDiv);
        });
    }
    else {
        searchResultsDiv.innerHTML = "Sonuç bulunamadı";
        searchResultsDiv.style.display = 'block';
    }
    console.log(searchResultsDiv);
}
//HABER API
let currentPage = 1;

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchNews(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    fetchNews(currentPage);
});



function fetchNews(page) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText); 
            console.log(response);

            const newsContainer = document.getElementById('news-container'); 
            newsContainer.innerHTML = ''; 

            
            if (response.result && response.result.length > 0) {
                // Her bir haber için kart oluşturulır
                response.result.forEach(news => {
                    
                    const newsCard = document.createElement('div');
                    newsCard.classList.add('col-md-6'); 

                    const card = document.createElement('div');
                    card.classList.add('card');

                    const img = document.createElement('img');
                    img.src = news.image;
                    img.classList.add('card-img-top');
                    img.alt = news.title;
                    

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const cardTitle = document.createElement('h5');
                    cardTitle.classList.add('card-title');
                    cardTitle.textContent = news.title;

                    const cardText = document.createElement('p');
                    cardText.classList.add('card-text');
                    cardText.textContent = news.description;

                    const link = document.createElement('a');
                    link.href = news.url;
                    link.target = "_blank";
                    link.classList.add('btn', 'btn-primary');
                    link.textContent = 'Detayları Gör';

                    const cardFooter = document.createElement('div');
                    cardFooter.classList.add('card-footer', 'text-muted');
                    cardFooter.textContent = `${news.source} | ${new Date(news.date).toLocaleDateString()}`;

                    // Elemanları birbirine bağla
                    cardBody.appendChild(cardTitle);
                    cardBody.appendChild(cardText);
                    cardBody.appendChild(link);
                    card.appendChild(img);
                    card.appendChild(cardBody);
                    card.appendChild(cardFooter);
                    newsCard.appendChild(card);

                    // Kartı container'a ekle
                    newsContainer.appendChild(newsCard);
                    
                });

                updatePagination();
            } else {
                newsContainer.innerHTML = "<p>No news available</p>";
            }
        }
    });

    xhr.open("GET", `https://api.collectapi.com/news/getNews?country=tr&tag=economy&paging=${page}`);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("authorization", "apikey 5yYdXxTPXLAQBRPgzq9Kst:0yLiw6P4J85QPWRqox2EyP");

    xhr.send(data);
}

// haber sayfaları fonksiyonları
function updatePagination() {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Önceki butonları temizle

    // Önceki butonunu ekle
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Önceki';
    prevButton.disabled = currentPage === 1; // İlk sayfadaysa devre dışı bırak
    prevButton.onclick = function () {
        if (currentPage > 1) {
            currentPage--;
            fetchNews(currentPage); // Yeni haberleri çek
        }
    };
    paginationContainer.appendChild(prevButton);

    // Mevcut sayfa butonunu göster
    const currentPageButton = document.createElement('span');
    currentPageButton.textContent = `Sayfa ${currentPage}`;
    currentPageButton.style.margin = '0 10px';
    paginationContainer.appendChild(currentPageButton);

    // Sonraki butonunu ekle
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Sonraki';
    nextButton.onclick = function () {
        currentPage++;
        fetchNews(currentPage); // Yeni haberleri çek
    };
    paginationContainer.appendChild(nextButton);
}





