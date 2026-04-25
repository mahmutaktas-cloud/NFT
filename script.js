
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const activePage = document.getElementById(pageId);
    activePage.classList.add('active');

    document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });

    if (pageId === 'collection') {
        filterNFT('all');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('.nav-links a[data-page="home"]');
    if (homeLink) homeLink.classList.add('active');
});


const nfts = [
    { type: 'ape',   name: 'Angry Monkey',      price: '4.2 ETH', img: 'AngryMonkeyNFT.jpg' },
    { type: 'car',   name: 'Neon Gatsby Car',    price: '15 ETH',  img: 'NeonGatsbyNFT.jpg' },
    { type: 'error', name: 'Error Nft',           price: '0.9 ETH', img: 'ErrorNFT.jpg' },
    { type: 'nasa',  name: "Nasa's Chameleon",    price: '2.1 ETH', img: "Nasa`sChameleonNFT.jpg" },
    { type: 'ape',   name: 'Confused Monkey',     price: '6.5 ETH', img: 'ConfusedMonkeyNFT.jpg' },
    { type: 'car',   name: 'Cyber Stratos Car',   price: '9 ETH',   img: 'CyberStratosNFT.jpg' }
];

function filterNFT(category) {
    const grid = document.getElementById('nftGrid');
    grid.innerHTML = '';

    const filtered = category === 'all' ? nfts : nfts.filter(n => n.type === category);

    filtered.forEach(nft => {
        const div = document.createElement('div');
        div.className = 'nft-card';
        div.innerHTML = `
            <img src="${nft.img}" alt="${nft.name}">
            <div style="display:flex; justify-content:space-between; margin-top:15px">
                <h4>${nft.name}</h4>
                <b style="color:#00f2ff">${nft.price}</b>
            </div>
            <button class="btn-primary" style="width:100%; margin-top:15px; background:transparent; border:1px solid var(--primary)">Teklif Ver</button>
        `;
        grid.appendChild(div);
    });
}

function connectWallet() {
    alert("Web3 Cüzdan Bağlantısı Başlatıldı...");
}

(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [];

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const COLORS = ['#bc13fe', '#00f2ff', '#ffffff', '#9b00e8', '#00c9d4'];

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function createParticle() {
        return {
            x: rand(0, W),
            y: rand(0, H),
            r: rand(0.8, 2.5),
            dx: rand(-0.3, 0.3),
            dy: rand(-0.5, -0.1),
            alpha: rand(0.3, 1),
            fadeSpeed: rand(0.003, 0.008),
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            glitch: Math.random() < 0.08 
        };
    }

    for (let i = 0; i < 120; i++) particles.push(createParticle());

    function draw() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach((p, i) => {
            ctx.save();
            ctx.globalAlpha = p.alpha;

            if (p.glitch) {
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, rand(4, 14), rand(1, 3));
            } else {
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
                grd.addColorStop(0, p.color);
                grd.addColorStop(1, 'transparent');
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();

            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= p.fadeSpeed;

            if (p.alpha <= 0 || p.y < -10) {
                particles[i] = createParticle();
                particles[i].y = H + 5; 
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
})();
