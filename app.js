import { db, collection, getDocs, doc, getDoc, query, orderBy } from './firebase-config.js';

// ==================== RENDERING LOGIC ====================

// Ana Sayfa (index.html) için render fonksiyonu
async function renderHome() {
    const heroGrid = document.getElementById('heroGrid');
    const postList = document.getElementById('postList');
    const popularList = document.getElementById('popularList');
    
    if (!heroGrid || !postList || !popularList) return;

    // URL'den kategori filtresi kontrolü
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('cat');

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

        // Eğer URL'de "?cat=Teknoloji" varsa filtrele
        if (categoryFilter) {
            allPosts = allPosts.filter(p => p.category === categoryFilter);
            document.querySelector('.section-title').innerHTML = `📌 ${categoryFilter} Haberleri`;
            // Kategori filtreliyse manşetleri gizleyelim, sadece haber akışı olsun
            heroGrid.style.display = 'none';
        }

        if (allPosts.length === 0) {
            postList.innerHTML = '<div style="padding:40px; text-align:center;">Bu kategoride henüz haber bulunamadı.</div>';
            if(!categoryFilter) heroGrid.innerHTML = '';
            return;
        }

        // Manşetleri Ayır (isHeadline: true olanlar) - Kategori yoksa
        const headlines = !categoryFilter ? allPosts.filter(post => post.isHeadline).slice(0, 3) : [];
        // Akış Haberleri
        const feed = !categoryFilter ? allPosts.filter(post => !post.isHeadline) : allPosts;
        // En Çok Okunanlar (Trend olanlar)
        const popular = allPosts.filter(post => post.isTrend);

        // 1. Manşetleri Render Et
        if (headlines.length > 0 && !categoryFilter) {
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
        } else if (!categoryFilter) {
            heroGrid.innerHTML = ''; // Manşet yoksa boş bırak
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
                                <span>${post.views || 0} okuma</span>
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

        if(post.blocks && Array.isArray(post.blocks)) {
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
