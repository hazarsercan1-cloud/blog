/* =============================================
   Kitoox.com — Uygulama Mantığı ve Veritabanı
   ============================================= */

// İçerik Veritabanı (CMS çıktısı buraya yapıştırılır)
const blogDatabase = [
    {
        id: "yeni-yazi",
        title: "2026 Dünya Kupası’nın Gerçek Yıldızları: Sahayı Ördekler Bastı!",
        category: "Sosyal Medya",
        isTrend: true,
        isHeadline: true,
        date: "20 Haziran 2026",
        views: "0",
        thumbnail: "https://riouribe.com/product/mexico-national-team-fifa-world-cup-2026-pato-mundialista-plush-9777925/",
        excerpt: "2026 FIFA Dünya Kupası yeşil sahalardan çok uzak, son derece sempatik bir olayla çalkalanıyor: Özel formalarıyla tribünleri ele geçiren fenomen taraftar ördekler Merlin ve Dawn ile tanışın!",
        blocks: [
            { type: "text", content: "<p>2026 Dünya Kupası’nın Gerçek Yıldızları: Sahayı<br>Ördekler Bastı!<br>Dünyanın dört bir yanındaki futbol devlerinin amansız mücadelesine sahne olan 2026 FIFA Dünya<br>Kupası, şu son saatlerde yeşil sahalardan çok uzak, son derece sempatik ve sıra dışı bir olayla<br>çalkalanıyor: Taraftar Ördekler!<br>Dev stadyumların, taktik savaşlarının ve milyon dolarlık yıldızların gölgesinde kalan bu sevimli dostlar,<br>turnuvanın resmi olmayan yeni maskotları haline gelerek sosyal medyanın ve taraftarların sevgilisi<br>oldu.<br>Meksika Formasıyla Tur Atan "Merlin" ve İskoçların Yoldaşı "Dawn"<br>Turnuva heyecanı Kuzey Amerika'yı sarmışken, son saatlerde maç önü geçit törenlerine ve galibiyet<br>kutlamalarına damga vuran iki evcil ördek, dünya basınının ve taraftarların ilgi odağı haline geldi:<br>Merlin: Mexico City'de yaşayan ve sahibinin kendisi için özel olarak hazırladığı minyatür Meksika<br>milli takım formasını giyen bu sevimli ördek, Meksika'nın galibiyet kutlamalarında caddelerin<br>yıldızı oldu. Kendisine özel tasarlanan minik ördek ayakkabılarıyla taraftarların arasında dolaşan<br>Merlin, turnuvanın en çok paylaşılan yüzlerinden biri haline geldi.<br>Dawn: Providence, Rhode Island'dan gelen ve Instagram'da şimdiden on binlerce takipçiye ulaşan<br>fenomen ördek Dawn ise son saatlerde oynanan Fas - İskoçya maçı öncesinde sahnedeydi. İskoç<br>taraftarların geleneksel gayda eşliğindeki coşkulu geçit törenine, gagasında taşıdığı İskoçya<br>bayrağı ve boynundaki altın madalyasıyla katılan Dawn, taraftarlarla birlikte kusursuz bir uyum<br>içinde yürüyerek turnuvanın neşesi oldu.<br>Futbolun Gergin Havasına Sempatik Bir Mola<br>Büyük futbol turnuvalarının getirdiği gergin ve stresli atmosferi bir anda dağıtan bu "tüylü taraftarlar",<br>tribünlerdeki ve sokaklardaki binlerce insana eğlenceli anlar yaşatmaya devam ediyor. Sosyal<br>•<br><br>•<br><br>medyada şimdiden milyonlarca izlenmeye ulaşan Merlin ve Dawn, 2026 Dünya Kupası'nın sadece<br>futboldan ibaret olmadığını, aynı zamanda dünyayı birleştiren neşeli bir karnaval olduğunu tüm<br>dünyaya bir kez daha hatırlatıyor.</p>" },
            { type: "image", url: "https://riouribe.com/wp-content/uploads/2026/06/Mexico-National-Team-FIFA-World-Cup-2026-Pato-Mundialista-Plush-Z6QIbIxtXi.jpg" }
        ]
    },
        id: "apple-2026-etkinlik-beklentileri",
        title: "Apple 2026 Etkinliğinde Neler Tanıtılacak? 5 Büyük Yenilik",
        category: "Teknoloji",
        isTrend: true,
        isHeadline: true,
        date: "20 Haziran 2026",
        views: "12.4K",
        thumbnail: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=800",
        excerpt: "Eylül ayında düzenlenecek Apple etkinliğinde tanıtılması beklenen yeni teknolojiler, gözlük donanımları ve yazılım devrimleri...",
        blocks: [
            { type: "text", content: "<p>Teknoloji dünyasının gözü kulağı Eylül ayında gerçekleşecek olan etkinliğe çevrildi. Her yıl olduğu gibi bu yıl da sızıntılar aylar öncesinden gelmeye başladı.</p>" },
            { type: "text", content: "<h2>1. Yeni İşlemci Mimarisi</h2><p>Yeni seriyle birlikte gelecek işlemcilerin enerji verimliliğinde %30'a varan bir artış sunacağı konuşuluyor. Bu da batarya ömründe devasa bir sıçrama demek.</p>" },
            { type: "image", url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000", caption: "Sızdırılan prototip görselleri" },
            { type: "youtube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { type: "text", content: "<h3>Fiyatlar Ne Olacak?</h3><p>Sektör analistlerine göre maliyetlerdeki artış, giriş seviyesi modellerde en az 100 dolarlık bir zam olabileceğine işaret ediyor.</p>" }
        ]
    },
    {
        id: "oyun-dunyasinin-gelecegi-bulut-sistemleri",
        title: "Konsollar Tarihe mi Karışıyor? Bulut Oyunculuğun Yükselişi",
        category: "Oyun",
        isTrend: false,
        isHeadline: true,
        date: "19 Haziran 2026",
        views: "8.2K",
        thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800",
        excerpt: "Fiziksel donanıma ihtiyaç duymadan en ağır oyunları bile tarayıcıdan oynamak artık hayal değil. İşte yeni nesil bulut servisleri.",
        blocks: [
            { type: "text", content: "<p>İnternet hızlarının gigabit seviyelerine ulaşmasıyla birlikte, fiziksel ekran kartı ve işlemci satın alma devri yavaş yavaş kapanıyor.</p>" },
            { type: "image", url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800", caption: "Bulut üzerinden oynanan AAA kalite bir oyun" },
            { type: "text", content: "<p>Özellikle düşük gecikme süreleri (latency) ve 4K 120fps destekli yeni platformlar, oyuncuları donanım masrafından kurtarıyor.</p>" }
        ]
    },
    {
        id: "yapay-zeka-kodlama",
        title: "Yapay Zeka Destekli Yazılım Geliştirme: Yeni Çağ",
        category: "Yazılım",
        isTrend: true,
        isHeadline: false,
        date: "18 Haziran 2026",
        views: "15.1K",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800",
        excerpt: "Sıfırdan kod yazmak yerine sadece ne istediğinizi söyleyerek uygulama geliştirmek mümkün mü? İnceledik.",
        blocks: [
            { type: "text", content: "<p>Yapay zeka asistanları artık sadece hata bulmuyor, baştan sona uygulama mimarisi tasarlayabiliyor.</p>" }
        ]
    }
];

// ==================== RENDERING LOGIC ====================

// Ana Sayfa (index.html) için render fonksiyonu
function renderHome() {
    const heroGrid = document.getElementById('heroGrid');
    const postList = document.getElementById('postList');
    const popularList = document.getElementById('popularList');
    
    if (!heroGrid || !postList || !popularList) return;

    // Manşetleri Ayır (isHeadline: true olanlar)
    const headlines = blogDatabase.filter(post => post.isHeadline).slice(0, 3);
    // Akış Haberleri (Manşet olmayanlar veya tümü)
    const feed = blogDatabase.filter(post => !post.isHeadline);
    // En Çok Okunanlar (Trend olanlar)
    const popular = blogDatabase.filter(post => post.isTrend);

    // 1. Manşetleri Render Et
    if (headlines.length > 0) {
        heroGrid.innerHTML = '';
        headlines.forEach((post, index) => {
            const isMain = index === 0 ? 'main' : '';
            const tagClass = post.isTrend ? 'category-tag trend' : 'category-tag';
            
            heroGrid.innerHTML += `
                <a href="article.html?id=${post.id}" class="hero-card ${isMain}">
                    <img src="${post.thumbnail}" alt="${post.title}">
                    <div class="hero-overlay">
                        <div><span class="${tagClass}">${post.category}</span></div>
                        <h2 class="hero-title">${post.title}</h2>
                        <div class="hero-meta">
                            <span>📅 ${post.date}</span>
                            <span>👁️ ${post.views} okuma</span>
                        </div>
                    </div>
                </a>
            `;
        });
    }

    // 2. Haber Akışını Render Et
    if (feed.length > 0) {
        postList.innerHTML = '';
        feed.forEach(post => {
            const tagClass = post.isTrend ? 'category-tag trend' : 'category-tag';
            postList.innerHTML += `
                <article class="post-card">
                    <a href="article.html?id=${post.id}" class="post-img">
                        <img src="${post.thumbnail}" alt="${post.title}">
                    </a>
                    <div class="post-info">
                        <div><span class="${tagClass}">${post.category}</span></div>
                        <a href="article.html?id=${post.id}"><h3 class="post-title">${post.title}</h3></a>
                        <p class="post-excerpt">${post.excerpt}</p>
                        <div class="post-meta">
                            <span>${post.date}</span>
                            <span>•</span>
                            <span>${post.views} okuma</span>
                        </div>
                    </div>
                </article>
            `;
        });
    }

    // 3. En Çok Okunanları Render Et
    if (popular.length > 0) {
        popularList.innerHTML = '';
        popular.forEach((post, index) => {
            popularList.innerHTML += `
                <a href="article.html?id=${post.id}" class="popular-item">
                    <div class="popular-num">${index + 1}</div>
                    <div class="popular-title">${post.title}</div>
                </a>
            `;
        });
    }
}

// Okuma Sayfası (article.html) için render fonksiyonu
function renderArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        document.body.innerHTML = '<div style="text-align:center; padding:100px; font-size:24px;">Haber bulunamadı. <br><a href="index.html" style="color:#2563eb;">Ana Sayfaya Dön</a></div>';
        return;
    }

    const post = blogDatabase.find(p => p.id === postId);
    if (!post) {
        document.body.innerHTML = '<div style="text-align:center; padding:100px; font-size:24px;">Haber bulunamadı. <br><a href="index.html" style="color:#2563eb;">Ana Sayfaya Dön</a></div>';
        return;
    }

    // Sayfa başlığını (Sekme ismi) güncelle
    document.title = `${post.title} — Kitoox`;

    // Üst kısımları yerleştir
    const tagClass = post.isTrend ? 'category-tag trend' : 'category-tag';
    document.getElementById('artCategory').className = tagClass;
    document.getElementById('artCategory').textContent = post.category;
    document.getElementById('artTitle').textContent = post.title;
    document.getElementById('artDate').textContent = `📅 ${post.date}`;
    document.getElementById('artViews').textContent = `👁️ ${post.views} okuma`;
    document.getElementById('artHeroImg').src = post.thumbnail;

    // Çoklu Medya Bloklarını Render Et (Magic happens here)
    const contentArea = document.getElementById('artContent');
    contentArea.innerHTML = '';

    post.blocks.forEach(block => {
        if (block.type === 'text') {
            contentArea.innerHTML += `<div class="block-text">${block.content}</div>`;
        } 
        else if (block.type === 'image') {
            const caption = block.caption ? `<figcaption>${block.caption}</figcaption>` : '';
            contentArea.innerHTML += `
                <figure class="block-image">
                    <img src="${block.url}" alt="Makale Görseli">
                    ${caption}
                </figure>
            `;
        }
        else if (block.type === 'youtube') {
            contentArea.innerHTML += `
                <div class="block-youtube">
                    <iframe src="${block.url}" allowfullscreen></iframe>
                </div>
            `;
        }
        else if (block.type === 'audio') {
            contentArea.innerHTML += `
                <div class="block-audio">
                    <div class="audio-icon">🎧</div>
                    <audio controls src="${block.url}"></audio>
                </div>
            `;
        }
    });
}

// Hangi sayfada olduğumuzu anlayıp ilgili fonksiyonu çağırıyoruz
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('heroGrid')) {
        renderHome();
    } else if (document.getElementById('artTitle')) {
        renderArticle();
    }
});
