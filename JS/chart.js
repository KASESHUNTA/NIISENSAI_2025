const diagnosis = {
    "q1": {
        question: "Q1: あなたは「デジタルなもの」（AI、プログラミング）に興味がありますか？",
        yes: "q2",
        no: "q3",
        result: false
    },
    "q2": {
        question: "Q2: 最新のAIやデータ解析の仕組みに触れてみたいですか？",
        yes: "info_science", // 情報科学科
        no: "q4",
        result: false
    },
    "q3": {
        question: "Q3: 物理的なモノや建物のデザインに興味がありますか？",
        yes: "q5",
        no: "chemistry", // 化学科 (物理・デジタル以外)
        result: false
    },
    "q4": {
        question: "Q4: Webサービス、アプリ開発、ゲーム制作に強い関心がありますか？",
        yes: "info_science", // 情報科学科
        no: "chemistry",
        result: false
    },
    "q5": {
        question: "Q5: ロボット、乗り物、機械の「仕組み」を学ぶことに興味がありますか？",
        yes: "mechanical", // 機械工学科
        no: "architecture", // 建築学科
        result: false
    },

    // --- 結果 (Result) ---
    "info_science": {
        question: "情報科学科",
        description: "プログラミング、AI、データサイエンス、Web技術など、デジタル社会を支える技術に触れられます。未来のIT分野に関心があるあなたにおすすめです！",
        icon: "💻",
        color: "text-indigo-700",
        bg_color: "bg-indigo-100",
        result: true // 明示的な結果フラグ
    },
    "mechanical": {
        question: "機械工学科",
        description: "ロボット、自動車、航空機、エネルギーシステムなど、「モノづくり」の基礎と応用を学べます。物理的な構造や動きの仕組みに興味があるあなたにおすすめです！",
        icon: "⚙️",
        color: "text-red-700",
        bg_color: "bg-red-100",
        result: true // 明示的な結果フラグ
    },
    "chemistry": {
        question: "化学科",
        description: "物質の性質や変化を追求し、新しい材料やエネルギーを生み出す研究を行えます。ミクロな世界の不思議や実験に興味があるあなたにおすすめです！",
        icon: "🧪",
        color: "text-green-700",
        bg_color: "bg-green-100",
        result: true // 明示的な結果フラグ
    },
    "architecture": {
        question: "建築学科",
        description: "快適で美しい空間、安全な建物の設計、都市計画などを学びます。デザインと構造の両方に興味があるあなたにおすすめです！",
        icon: "🏗️",
        color: "text-yellow-700",
        bg_color: "bg-yellow-100",
        result: true // 明示的な結果フラグ
    }
};

let currentStep = "q1"; // 現在の質問IDを保持
const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-button');
const choiceButtons = document.getElementById('choice-buttons');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const restartButton = document.getElementById('restart-button');
const chartBox = document.querySelector('.chart-box');


/**
 * 診断を開始し、最初の質問を表示する
 */
function startGame() {
    currentStep = "q1";

    // 質問表示エリアのスタイルをリセット
    questionElement.className = "text-3xl font-bold flex flex-col justify-center items-center mb-10 text-gray-800 transition duration-300";
    questionElement.innerHTML = diagnosis[currentStep].question;

    // ボタンの表示/非表示を切り替える (スタートを隠し、YES/NOを表示)
    startButton.parentElement.classList.add('hidden'); // スタートボタンのコンテナを隠す
    choiceButtons.classList.remove('hidden');
    choiceButtons.classList.add('flex');
    restartButton.classList.add('hidden');

    // 結果表示用のスタイルをリセット
    chartBox.classList.remove('shadow-2xl', 'border-4', 'border-opacity-50');
    chartBox.style.borderTopColor = '#4f46e5'; // ボーダー色をリセット
}

/**
 * ユーザーの選択（YES/NO）を処理し、次のステップに進む
 * @param {boolean} isYes - trueならYESの選択
 */
function handleChoice(isYes) {

    // **修正: 現在のステップが質問ステップであることを確認し、結果オブジェクトへのアクセスを防ぐ**
    // 質問ステップには必ず 'yes' と 'no' のプロパティがあるため、これで判定する。
    if (!diagnosis[currentStep] || !diagnosis[currentStep].yes) {
        // 既に結果に到達している、または無効なステップIDの場合、処理を停止
        return;
    }

    const nextId = isYes ? diagnosis[currentStep].yes : diagnosis[currentStep].no;
    currentStep = nextId;

    if (diagnosis[currentStep].result) {
        displayResult();
    } else {
        // 次の質問を表示
        // アニメーションのために一時的に不透明度を変更
        questionElement.style.opacity = 0;
        setTimeout(() => {
            questionElement.innerHTML = diagnosis[currentStep].question;
            questionElement.style.opacity = 1;
        }, 150);
    }
}

/**
 * 診断結果を表示する
 */
function displayResult() {
    const resultData = diagnosis[currentStep];

    // 質問表示エリアに結果コンテンツを挿入
    questionElement.innerHTML = `
        <div class="${resultData.bg_color} p-4 rounded-xl w-full">
            <span class="text-xl font-medium block mb-2 text-gray-600 transition duration-300">🎉 あなたにおすすめの展示は...</span>
            <strong class="text-5xl block font-extrabold ${resultData.color} mt-2 mb-4">
                ${resultData.icon} ${resultData.question}
            </strong>
        </div>
        <p class="mt-6 text-gray-700 text-lg px-2 leading-relaxed">${resultData.description}</p>
        <div class="mt-6 text-sm text-gray-500 pt-3">
            ぜひ、この展示を探して足を運んでみましょう！
        </div>
    `;

    // 結果に応じたスタイルの変更
    chartBox.classList.add('shadow-2xl', 'border-4', 'border-opacity-50');
    // 'text-indigo-700' -> 'border-indigo-700' に置換
    chartBox.style.borderTopColor = resultData.color.replace('text', 'border');

    // ボタンの表示/非表示を切り替える
    choiceButtons.classList.add('hidden');
    restartButton.classList.remove('hidden');
}


// --- イベントリスナーの設定 ---

// スタートボタン
startButton.addEventListener('click', startGame);

// YES/NOボタン
yesButton.addEventListener('click', () => handleChoice(true));
noButton.addEventListener('click', () => handleChoice(false));

// リスタートボタン
restartButton.addEventListener('click', () => {
    // 初期画面の状態に戻す
    questionElement.innerHTML = 'Yes/No診断で<br>見に行く学科展示を決めよう！';
    startButton.parentElement.classList.remove('hidden');
    choiceButtons.classList.add('hidden');
    restartButton.classList.add('hidden');
    chartBox.classList.remove('shadow-2xl', 'border-4', 'border-opacity-50');
    chartBox.style.borderTopColor = '#4f46e5'; // ボーダー色をリセット
});