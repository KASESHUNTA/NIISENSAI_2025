document.addEventListener('DOMContentLoaded', () => {
    // ===========================================
    // 診断データ
    // ===========================================
    const quizData = {
        '1': { q_num: 'Q1', question: '未来のあなたはパソコンよりも<br>ペンや紙の方が似合う？', yes: '2', no: '5' },
        '2': { q_num: 'Q2', question: 'その作品は自分で操作できた方が楽しい？', yes: '1a', no: '3' },
        '3': { q_num: 'Q3', question: 'その表現<br>時間の流れで見せたい？', yes: '4', no: '2a' },
        '4': { q_num: 'Q4', question: '2次元に行けるなら<br>行きたい？', yes: '3a', no: '4a' },
        '5': { q_num: 'Q5', question: 'それは見えない世界を<br>守る仕事？', yes: '5a', no: '6' },
        '6': { q_num: 'Q6', question: 'あなたの武器は<br>ハンダゴテ？', yes: '6a', no: '7' },
        '7': { q_num: 'Q7', question: 'それは人間の頭脳を<br>マネするもの？', yes: '7a', no: '8' },
        '8': { q_num: 'Q8', question: 'それはネットやアプリで<br>人とつながる？', yes: '8a', no: '9a' },
        // 結果ノード
        '1a': { result: 'あなたにおすすめの分野は...<br>', detail: 'ゲーム', department: 'ゲーム' }, // ★修正: departmentを追加
        '2a': { result: 'あなたにおすすめの分野は...<br>', detail: 'デザイン', department: 'デザイン' }, // ★修正: departmentを追加
        '3a': { result: 'あなたにおすすめの分野は...<br>', detail: 'アニメ', department: 'アニメ' }, // ★修正: departmentを追加
        '4a': { result: 'あなたにおすすめの分野は...<br>', detail: 'CG・映像', department: 'CG・映像' }, // ★修正: departmentを追加
        '5a': { result: 'あなたにおすすめの分野は...<br>', detail: 'ネットワーク・<br>セキュリティー', department: 'ネットワーク・セキュリティー' }, // ★修正: departmentを追加
        '6a': { result: 'あなたにおすすめの分野は...<br>', detail: '電気・電子', department: '電気・電子' }, // ★修正: departmentを追加
        '7a': { result: 'あなたにおすすめの分野は...<br>', detail: 'AI', department: 'AI' }, // ★修正: departmentを追加
        '8a': { result: 'あなたにおすすめの分野は...<br>', detail: 'Web・モバイル', department: 'Web・モバイル' }, // ★修正: departmentを追加
        '9a': { result: 'あなたにおすすめの分野は...<br>', detail: '情報処理', department: '情報処理' }, // ★修正: departmentを追加
    };

    // ===========================================
    // 学科ごとのデータと色（アコーディオン用）
    // ※ quizDataのdepartment名とキーを合わせること
    // ===========================================
    const departmentData = {
        'ゲーム': {
            color: '#DD6541', // 赤
            shopName: '最新作ゲームの試遊コーナー',
            location: '2号館3階 特設会場',
            description: '学生が制作した未公開ゲームを自由に体験できます！開発者本人に話を聞くチャンス！'
        },
        'デザイン': {
            color: '#E7AC50', // 紫
            shopName: 'デジタルアート＆プロダクト展示会',
            location: '5号館1階 デザインギャラリー',
            description: 'Web、ポスター、プロダクトなど、幅広い分野の洗練されたデザイン作品を展示しています。'
        },
        'アニメ': {
            color: '#AAC862', // 黄色
            shopName: 'アニメ制作工程と原画展',
            location: '6号館2階 アニメーションラボ',
            description: '絵コンテから動画までの制作過程を公開。学生の描いた貴重な原画も見られます！'
        },
        'CG・映像': {
            color: '#E3D643', // 青
            shopName: 'VR/AR 映像体験ブース',
            location: '4号館4階 映像スタジオ',
            description: '最新のVR技術を用いた3DCG映像を体験！没入感のある世界に入り込もう。'
        },
        'ネットワーク・セキュリティー': {
            color: '#20ABA9', // エメラルドグリーン
            shopName: 'ハッキング・防御デモ体験',
            location: '1号館2階 ネットワーク演習室',
            description: 'ホワイトハッカーが教えるセキュリティーの重要性。防御の仕組みをデモで解説します。'
        },
        '電気・電子': {
            color: '#2DA869', // グレー
            shopName: '自作ロボット大集合！動体展示',
            location: '3号館1階 ロボティクスホール',
            description: '学生が設計・開発した様々なセンサー、モーター搭載のロボットの動きを間近で見よう。'
        },
        'AI': {
            color: '#4484BE', // 緑
            shopName: '対話型AI & 機械学習デモ',
            location: '1号館3階 B教室',
            description: '自然言語処理AIや、画像認識の学習プロセスを分かりやすくデモンストレーションします。'
        },
        'Web・モバイル': {
            color: '#A55A99', // オレンジ
            shopName: 'オリジナルアプリ・Webサービス体験',
            location: '8号館1階 Web制作室',
            description: '学生が企画・開発した実用的なモバイルアプリやユニークなWebサイトを触って試せます。'
        },
        '情報処理': {
            color: '#1AADDF', // 薄いグレー
            shopName: 'ビジネス向けシステム開発展',
            location: '4号館1階 プログラミング教室',
            description: '企業向けのデータベース構築や業務改善システムなど、実務に役立つIT技術を紹介します。'
        }
    };

    // 必要なHTML要素を取得
    const startButton = document.getElementById('start-button');
    const questionBox = document.getElementById('question');
    const choiceButtons = document.getElementById('choice-buttons');
    const buttonsContainer = document.getElementById('buttons');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const restartButton = document.getElementById('restart-button');

    // アコーディオン要素の取得
    const accordionContainer = document.getElementById('accordion-container');
    const accordionHeader = document.querySelector('.accordion-header');
    const accordionContent = document.querySelector('.accordion-content');

    // 診断の現在の状態を保持する変数
    let currentQuizId = '1';

    // 最初に質問とYes/Noボタン、リスタートボタン、アコーディオンを非表示に設定
    questionBox.style.display = 'block';
    choiceButtons.style.display = 'none';
    restartButton.style.display = 'none';
    accordionContainer.style.display = 'none'; // アコーディオンは最初は非表示

    // ===========================================
    // アコーディオンの更新関数
    // ===========================================
    const updateAccordion = (departmentName) => {
        const data = departmentData[departmentName] || departmentData['その他'];

        // 1. 色の変更: CSSカスタムプロパティを更新
        accordionContainer.style.setProperty('--main-color', data.color);

        // 2. 内容の変更
        // chart.js:120:58 (このあたり)
        document.getElementById('shop-name').textContent = `出店名: ${data.shopName}`;
        document.getElementById('shop-location').textContent = `場所: ${data.location}`;
        document.getElementById('shop-description').textContent = `紹介: ${data.description}`;

        // 3. アコーディオンを表示
        accordionContainer.style.display = 'block';
    };

    // ===========================================
    // 質問・結果表示のメイン関数
    // ===========================================
    const showNext = (id) => {
        const item = quizData[id];

        if (!item) {
            console.error('無効なIDが指定されました:', id);
            return;
        }

        currentQuizId = id;

        // 結果 (IDに 'a' が含まれる場合)
        if (id.includes('a')) {
            // 結果文をセット
            questionBox.innerHTML = item.result + `<span class="result-department">${item.detail}</span>`;

            // Yes/Noボタンを非表示、リスタートボタンを表示
            choiceButtons.style.display = 'none';
            restartButton.style.display = 'block';

            // ★重要: アコーディオンを更新・表示する
            updateAccordion(item.department);
        }
        // 質問
        else {
            // 質問番号と質問文をセット
            const questionNumber = item.q_num ? `<span class="quiz-number">${item.q_num}</span><br>` : '';
            questionBox.innerHTML = questionNumber + item.question;

            // Yes/Noボタンを表示、リスタートボタンとアコーディオンを非表示
            choiceButtons.style.display = 'flex';
            restartButton.style.display = 'none';
            accordionContainer.style.display = 'none'; // 質問中は非表示に戻す
        }
    };

    // ===========================================
    // イベントリスナー
    // ===========================================

    // 1. 「スタート！！」ボタンのイベント
    startButton.addEventListener('click', () => {
        buttonsContainer.style.display = 'none';
        questionBox.style.display = 'block';
        showNext(currentQuizId);
    });

    // 2. 「はい (YES)」ボタンのイベント
    yesButton.addEventListener('click', () => {
        const currentItem = quizData[currentQuizId];
        if (currentItem && currentItem.yes) {
            showNext(currentItem.yes);
        }
    });

    // 3. 「いいえ (NO)」ボタンのイベント
    noButton.addEventListener('click', () => {
        const currentItem = quizData[currentQuizId];
        if (currentItem && currentItem.no) {
            showNext(currentItem.no);
        }
    });

    // 4. 「最初からやり直す」ボタンのイベント
    restartButton.addEventListener('click', () => {
        // 状態を初期化
        currentQuizId = '1';
        restartButton.style.display = 'none';
        choiceButtons.style.display = 'none';
        accordionContainer.style.display = 'none'; // アコーディオンを非表示に戻す

        // 初期画面に戻す
        questionBox.innerHTML = 'Yes/No診断で<br>見に行く学科展示を決めよう！';
        buttonsContainer.style.display = 'block';
    });

    // 5. アコーディオンの開閉機能
    accordionHeader.addEventListener('click', () => {
        accordionHeader.classList.toggle('active');
        accordionContent.classList.toggle('active');
    });
});