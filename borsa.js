async function loadMarketData() {
    const marketDataElement = document.getElementById("market-data");

    // Veriler yüklenirken bilgi mesajı
    marketDataElement.innerHTML = "<tr><td colspan='4'>Veriler yükleniyor...</td></tr>";

    try {
        // API isteği gönder
        fetch('https://api.yapikredi.com.tr/api/stockmarket/v1/', {
            method: 'GET',
            mode: 'no-cors'
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        // Response'u incelemek için console.log
        console.log("API Response:", response);

        // Eğer JSON formatındaysa parse et ve sonucu logla
        const data = await response.json();
        console.log("Parsed Data:", data);

        // Veriyi tabloya ekle
        marketDataElement.innerHTML = data.map(stock => `
            <tr>
                <td>${stock.name}</td>
                <td>${stock.price} TL</td>
                <td class="${stock.change > 0 ? 'text-success' : 'text-danger'}">${stock.change}%</td>
                <td>${stock.volume}</td>
            </tr>
        `).join("");
    } catch (error) {
        // Hata durumunu logla
        console.error("Veri yüklenirken hata:", error);

        // Kullanıcıya hata mesajı göster
        marketDataElement.innerHTML = "<tr><td colspan='4'>Veri yüklenirken bir hata oluştu.</td></tr>";
    }
}

// Sayfa yüklendiğinde veriyi çek
document.addEventListener("DOMContentLoaded", loadMarketData);
