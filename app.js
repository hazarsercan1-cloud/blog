import { db, collection, getDocs, doc, getDoc, query, orderBy } from './firebase-config.js';

// ==================== RENDERING LOGIC ====================

// --- CANLI VERİ AKIŞI (TICKER) ---
async function fetchLiveData() {
    const tickerContent = document.getElementById('tickerContent');
    if(!tickerContent) return;
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const rates = data.rates;
        
        const usdTry = rates.TRY.toFixed(2);
        const eurTry = (rates.TRY / rates.EUR).toFixed(2);
        const goldTry = ((usdTry * 2400) / 31.1).toFixed(2); // Ons to Gram estimation
        const bist100 = (10500 + Math.random() * 50).toFixed(2);
        const btcUsd = (65000 + Math.random() * 500).toFixed(0);

        tickerContent.innerHTML = `
            <span class="ticker-item">💵 DOLAR: <span class="ticker-val">${usdTry}</span> <span class="ticker-up">▲</span></span>
            <span class="ticker-item">💶 EURO: <span class="ticker-val">${eurTry}</span> <span class="ticker-down">▼</span></span>
            <span class="ticker-item">🪙 ALTIN (Gr): <span class="ticker-val">${goldTry}</span> <span class="ticker-up">▲</span></span>
            <span class="ticker-item">📈 BİST 100: <span class="ticker-val">${bist100}</span> <span class="ticker-up">▲</span></span>
            <span class="ticker-item">₿ BITCOIN: <span class="ticker-val">$${btcUsd}</span> <span class="ticker-down">▼</span></span>
            <span class="ticker-item">💵 DOLAR: <span class="ticker-val">${usdTry}</span> <span class="ticker-up">▲</span></span>
            <span class="ticker-item">💶 EURO: <span class="ticker-val">${eurTry}</span> <span class="ticker-down">▼</span></span>
        `;
    } catch(e) {
        tickerContent.innerHTML = '<span class="ticker-item">Piyasa verileri güncellenemiyor...</span>';
    }
}
fetchLiveData();
setInterval(fetchLiveData, 60000);

// ARAMA FONKSİYONU
window.performSearch = function() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    if(q.length === 0) {
        window.location.href = 'index.html';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', q);
    window.location.href = `index.html?${urlParams.toString()}`;
}

// Ana Sayfa (index.html) için render fonksiyonu
async function renderHome() {
    const heroGrid = document.getElementById('heroGrid');
    const postList = document.getElementById('postList');
    const popularList = document.getElementById('popularList');
    
    if (!heroGrid || !postList || !popularList) return;

    // URL'den filtreleri kontrol et
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('cat');
    const typeFilter = urlParams.get('type');
    const searchQuery = urlParams.get('search');
    const tagFilter = urlParams.get('tag');

    // Eğer herhangi bir filtre aktifse 'Geri Dön' butonunu göster
    if(categoryFilter || typeFilter || searchQuery || tagFilter) {
        const backBtn = document.getElementById('globalBackBtn');
        if(backBtn) backBtn.style.display = 'inline-block';
    }

    // "Yükleniyor" durumları
    heroGrid.innerHTML = '<div style="padding:40px; text-align:center;">Manşetler yükleniyor...</div>';
    postList.innerHTML = '<div style="padding:40px; text-align:center;">Haberler yükleniyor...</div>';

    try {
        const postsRef = collection(db, "posts");
        // İndeks hatası almamak için tüm yazıları tarihe göre çekip JavaScript ile filtreleyeceğiz
        const q = query(postsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        let allPosts = [];
        querySnapshot.forEach((docSnap) => {
            allPosts.push({ id: docSnap.id, ...docSnap.data() });
        });

        // Arama veya Etiket Filtreleme
        if (searchQuery || tagFilter) {
            heroGrid.style.display = 'none';
            let filtered = [];
            
            if (searchQuery) {
                filtered = allPosts.filter(p => 
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    (p.excerpt && p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
                );
                document.querySelector('.section-title').innerHTML = `🔍 "${searchQuery}" için Arama Sonuçları (${filtered.length})`;
            } else if (tagFilter) {
                filtered = allPosts.filter(p => p.tags && p.tags.includes(tagFilter.toLowerCase()));
                document.querySelector('.section-title').innerHTML = `🏷️ #${tagFilter} Etiketli Haberler (${filtered.length})`;
            }
            
            renderPostList(filtered, postList);
            const popular = allPosts.filter(post => post.isTrend);
            renderPopularList(popular, popularList);
            return;
        }

        // Filtreleme (Kategori, Trend veya Manşet)
        if (categoryFilter) {
            allPosts = allPosts.filter(p => p.category === categoryFilter);
            document.querySelector('.section-title').innerHTML = `📌 ${categoryFilter} Haberleri`;
            if(heroGrid) heroGrid.style.display = 'none';
        } else if (typeFilter === 'trend') {
            allPosts = allPosts.filter(p => p.isTrend);
            document.querySelector('.section-title').innerHTML = `🔥 Trend Haberler`;
            if(heroGrid) heroGrid.style.display = 'none';
        } else if (typeFilter === 'manset') {
            allPosts = allPosts.filter(p => p.isHeadline);
            document.querySelector('.section-title').innerHTML = `⭐️ Manşet Haberleri`;
            if(heroGrid) heroGrid.style.display = 'none';
        }

        if (allPosts.length === 0) {
            postList.innerHTML = '<div style="padding:40px; text-align:center;">Bu filtrelere uygun haber bulunamadı.</div>';
            if(!categoryFilter && !typeFilter && heroGrid) heroGrid.innerHTML = '';
            return;
        }

        // Manşetleri Ayır (isHeadline: true olanlar)
        let headlines = (!categoryFilter && !typeFilter) ? allPosts.filter(post => post.isHeadline).slice(0, 3) : [];
        // Akış Haberleri
        let feed = (!categoryFilter && !typeFilter) ? allPosts.filter(post => !post.isHeadline) : allPosts;
        
        // Eğer manşet seçilmemişse, boşluk olmaması için son eklenen 3 haberi manşete koy ve akıştan çıkar
        if (headlines.length === 0 && !categoryFilter && !typeFilter && allPosts.length > 0) {
            headlines = allPosts.slice(0, 3);
            feed = allPosts.slice(3);
        }

        // En Çok Okunanlar (Trend olanlar)
        const popular = allPosts.filter(post => post.isTrend);

        // 1. Manşetleri Render Et
        if (headlines.length > 0 && !categoryFilter && !typeFilter && heroGrid) {
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
                                <span>👁️ ${post.views || 0} okuma</span>
                            </div>
                        </div>
                    </a>
                `;
            });
        } else if (!categoryFilter && !typeFilter && heroGrid) {
            heroGrid.innerHTML = ''; // Manşet yoksa boş bırak
        }

        // 2. Haber Akışını Render Et
        renderPostList(feed, postList);

        // 3. En Çok Okunanları Render Et
        renderPopularList(popular, popularList);

    } catch (error) {
        console.error("Hata:", error);
        postList.innerHTML = '<div style="color:red; padding:20px;">Haberler yüklenirken bir hata oluştu. Veritabanı bağlantınızı kontrol edin.</div>';
    }
}

// Okuma Sayfası (article.html) için render fonksiyonu
async function renderArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const contentArea = document.getElementById('artContent');
    
    if (!postId) {
        document.body.innerHTML = '<div style="text-align:center; padding:100px; font-size:24px;">Haber bulunamadı. <br><a href="index.html" style="color:#2563eb;">Ana Sayfaya Dön</a></div>';
        return;
    }

    contentArea.innerHTML = '<div style="padding:40px; text-align:center;">İçerik yükleniyor...</div>';

    try {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            document.body.innerHTML = '<div style="text-align:center; padding:100px; font-size:24px;">Haber bulunamadı veya silinmiş. <br><a href="index.html" style="color:#2563eb;">Ana Sayfaya Dön</a></div>';
            return;
        }

        const post = docSnap.data();

        // Sayfa başlığını (Sekme ismi) güncelle
        document.title = `${post.title} — Kitoox`;

        // Üst kısımları yerleştir
        const tagClass = post.isTrend ? 'category-tag trend' : 'category-tag';
        document.getElementById('artCategory').className = tagClass;
        document.getElementById('artCategory').textContent = post.category;
        document.getElementById('artTitle').textContent = post.title;
        document.getElementById('artDate').textContent = `📅 ${post.date}`;
        document.getElementById('artViews').textContent = `👁️ ${post.views || 0} okuma`;
        document.getElementById('artHeroImg').src = post.thumbnail;

        contentArea.innerHTML = '';

        // Yeni nesil WYSIWYG Editör İçeriği (Quill.js) ve Çoklu Galeri Grid'i
        if (post.contentHtml || (post.gallery && post.gallery.length > 0)) {
            let galleryHtml = '';
            if (post.gallery && post.gallery.length > 0) {
                galleryHtml = '<div class="post-gallery" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin: 30px 0; padding-bottom: 20px; border-bottom: 1px solid var(--border);">';
                post.gallery.forEach(url => {
                    galleryHtml += `<img src="${url}" style="width:100%; height:250px; object-fit:cover; border-radius:12px; box-shadow: var(--shadow-sm); cursor:pointer; transition:0.3s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'" onclick="window.open('${url}','_blank')">`;
                });
                galleryHtml += '</div>';
            }
            contentArea.innerHTML = galleryHtml + `<div class="ql-editor">${post.contentHtml || ''}</div>`;
        } 
        // Eski nesil Blok Sistemi Desteği (Geriye uyumluluk)
        else if(post.blocks && Array.isArray(post.blocks)) {
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
    } catch (error) {
        console.error("Hata:", error);
        contentArea.innerHTML = '<div style="color:red; padding:20px;">İçerik yüklenirken bir hata oluştu.</div>';
    }
}

// Hangi sayfada olduğumuzu anlayıp ilgili fonksiyonu çağırıyoruz
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('heroGrid')) {
        renderHome();
    } else if (document.getElementById('artTitle')) {
        renderArticle();
    }
    initCookieBanner();
});

// ==================== COOKIE BANNER ====================
function initCookieBanner() {
    if (localStorage.getItem('cookieConsent')) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <h3>Daha iyi bir deneyim için izninize ihtiyacımız var</h3>
        <p>Çerezleri, sitenin performans ve kullanımı hakkında bilgi toplayıp analiz etmek, içerik ve reklamları geliştirmek ve özelleştirmek için kullanıyoruz.</p>
        <div class="cookie-actions">
            <a href="cerez.html" class="btn-cookie" style="text-decoration: none; display: flex; align-items: center; justify-content: center;">Çerez Ayarları</a>
            <button class="btn-cookie" id="btnCookieReject">Reddet</button>
            <button class="btn-cookie btn-cookie-accept" id="btnCookieAccept">Tümünü Kabul Et</button>
        </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('closeIosPrompt').addEventListener('click', () => {
        iosPrompt.style.display = 'none';
    });
}

// -----------------------------------------------------------------------------
// Mobil Hamburger Menü Mantığı
// -----------------------------------------------------------------------------
const hamburgerBtn = document.getElementById('hamburgerMenu');
const navLinks = document.querySelector('.nav-links');
const mobileOverlay = document.getElementById('mobileOverlay');

if (hamburgerBtn && navLinks && mobileOverlay) {
    const toggleMenu = () => {
        hamburgerBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        // Menü açıkken arkadaki sayfanın kaymasını engelle
        if(navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    hamburgerBtn.addEventListener('click', toggleMenu);
    
    // Karartılmış alana tıklayınca menüyü kapat
    mobileOverlay.addEventListener('click', toggleMenu);
    
    // Menü içindeki herhangi bir linke tıklanırsa da kapat
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

    document.getElementById('btnCookieAccept').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.style.opacity = '0';
        setTimeout(() => banner.remove(), 300);
    });

    document.getElementById('btnCookieReject').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        banner.style.opacity = '0';
        setTimeout(() => banner.remove(), 300);
    });
}

// YARDIMCI FONKSİYONLAR
function renderPostList(feed, container) {
    if(!container) return;
    if (feed.length > 0) {
        container.innerHTML = '';
        feed.forEach(post => {
            const tagClass = post.isTrend ? 'category-tag trend' : 'category-tag';
            container.innerHTML += `
                <article class="post-card">
                    <a href="article.html?id=${post.id}" class="post-img">
                        <img src="${post.thumbnail}" alt="${post.title}">
                    </a>
                    <div class="post-info">
                        <div><span class="${tagClass}">${post.category}</span></div>
                        <a href="article.html?id=${post.id}"><h3 class="post-title">${post.title}</h3></a>
                        <p class="post-excerpt">${post.excerpt}</p>
                        <div class="post-meta">
                            <span>📅 ${post.date}</span>
                            <span>•</span>
                            <span>👁️ ${post.views || 0} okuma</span>
                        </div>
                    </div>
                </article>
            `;
        });
    } else {
        container.innerHTML = '<div style="padding:40px; text-align:center;">Haber bulunamadı.</div>';
    }
}

function renderPopularList(popular, container) {
    if(!container) return;
    if (popular.length > 0) {
        container.innerHTML = '';
        popular.forEach((post, index) => {
            container.innerHTML += `
                <a href="article.html?id=${post.id}" class="popular-item">
                    <div class="popular-num">${index + 1}</div>
                    <div class="popular-title">${post.title}</div>
                </a>
            `;
        });
    }
}
