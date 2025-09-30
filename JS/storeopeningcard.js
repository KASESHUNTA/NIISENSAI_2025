document.addEventListener('DOMContentLoaded', () => {
    const storesContainer = document.querySelector('.Stores_container');
    const buildingButtons = document.querySelectorAll('.Exhibitions_button button');

    // 出店情報のサンプルデータ
    const storesData = [{
        imgSrc: "img/sweets.png",
        name: "スイーツの鉄板焼き屋",
        description: "ふわふわのパンケーキ、甘くて美味しいクレープなど、心もとろけるスイーツを豊富にご用意しました。",
        location: "本館 1F",
        building: "本館"
    }, {
        imgSrc: "https://placehold.co/80x80/fef2f2/b91c1c?text=ラーメン",
        name: "ラーメン屋",
        description: "熱い麺、濃厚なスープ、厳選された具材。一杯一杯に心を込めて、皆様にお届けします。",
        location: "4号館 B1F",
        building: "4号館"
    }, {
        imgSrc: "https://placehold.co/80x80/fffbeb/f59e0b?text=焼きそば",
        name: "もちもち焼きそば",
        description: "自家製のもちもち麺と特製ソースが絡み合う絶品焼きそばです。野菜と肉もたっぷり入って、ボリューム満点！",
        location: "5号館 2F",
        building: "5号館"
    }, {
        imgSrc: "https://placehold.co/80x80/ecfdf5/047857?text=タピオカ",
        name: "タピオカドリンク",
        description: "本場の台湾タピオカを使用した、もっちもちの食感が楽しめるドリンクです。ミルクティーやフルーツティーなど、種類豊富にご用意しております。",
        location: "7号館 3F",
        building: "7号館"
    }, {
        imgSrc: "https://placehold.co/80x80/dbeafe/1e40af?text=焼き鳥",
        name: "焼き鳥屋",
        description: "炭火でじっくりと焼き上げた、香ばしい焼き鳥です。もも、ねぎま、つくねなど、定番から変わり種まで楽しめます。",
        location: "9号館 4F",
        building: "9号館"
    }, {
        imgSrc: "https://placehold.co/80x80/e0e7ff/4338ca?text=かき氷",
        name: "かき氷屋",
        description: "ふわふわの氷と、自家製のシロップが絶妙なハーモニーを奏でます。暑い夏にぴったりの、冷たいスイーツをお楽しみください。",
        location: "本館 1F",
        building: "本館"
    },];

    // すべての出店カードをレンダリングする関数
    const renderStores = (stores) => {
        storesContainer.innerHTML = ''; // コンテナをクリア
        stores.forEach(store => {
            const storeCard = document.createElement('div');
            storeCard.className = 'storeopeningcard';
            storeCard.innerHTML = `
                <img src="${store.imgSrc}" alt="${store.name}">
                <div class="details">
                    <div class="summary">
                        <p class="building">${store.building}</p>
                        <p class="location">${store.location}</p>
                    </div>
                    <p class="name">${store.name}</p>
                    <p class="description">${store.description}</p>
                </div>
            `;
            storesContainer.appendChild(storeCard);
        });
    };

    // 初期表示: すべてのカードをレンダリング
    renderStores(storesData);

    // ボタンにクリックイベントリスナーを追加
    buildingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedBuilding = button.dataset.building;
            button.classList.toggle('active');

            const activeBuildings = Array.from(buildingButtons)
                .filter(btn => btn.classList.contains('active'))
                .map(btn => btn.dataset.building);

            let filteredStores;
            if (activeBuildings.length === 0) {
                filteredStores = storesData;
            } else {
                filteredStores = storesData.filter(store => activeBuildings.includes(store.building));
            }

            renderStores(filteredStores);
        });
    });
});