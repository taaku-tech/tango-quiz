# タンゴ・クイズ 仕様書

---

## 1. アプリ概要

### 目的

アルゼンチンタンゴのイントロ（Spotify埋め込みプレイヤー）を聴いて曲名を当てる、4択クイズアプリ。演奏家の紹介・演奏家別クイズ・楽団系譜図も提供する。

### メタデータ（layout.js）

- **title**: `タンゴ・クイズ`
- **description**: `アルゼンチンタンゴのイントロを聴いて曲名を当てよう！`

### 公開URL・GitHubリポジトリ

コード上に公開URLの記載なし。デプロイ先はVercel（README記載）。GitHubリポジトリのURLはコード上に記載なし。

---

## 2. 技術構成

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16.2.4（App Router） |
| UIライブラリ | React 19.2.4 / React DOM 19.2.4 |
| スタイリング | Tailwind CSS v4（`@tailwindcss/postcss` v4） |
| フォント | Geist Sans（`--font-geist-sans`）、Playfair Display（`--font-playfair`）、Noto Serif JP（系譜図ページのみ、Google Fonts動的ロード） |
| 音楽再生 | Spotify Embed API（iframe埋め込み） |
| 音声読み上げ | Web Speech API（`SpeechSynthesis`） |
| データ | ローカルJSON（`data/songs.json`） |
| ホスティング | Vercel（README記載） |
| 開発環境 | Node.js + npm |
| Lint | ESLint 9 + eslint-config-next 16.2.4 |

---

## 3. 画面構成

| パス | 画面名 | 概要 |
|------|--------|------|
| `/` | タイトル画面 / クイズ画面 | タイトル表示→クイズ進行→結果表示を1ページ内でstate管理 |
| `/artists` | 演奏家紹介 | 15名の演奏家カード一覧 |
| `/artist-quiz` | 演奏家別クイズ | URLクエリパラメータ `?artist=` で対象演奏家を指定 |
| `/lineage` | 楽団系譜図 | インタラクティブSVGによる系譜・師弟・親交図 |

---

## 4. クイズ仕様（通常クイズ）

### 問題数・出題順

- `songs.json`（全58曲）をFisher-Yatesシャッフルしてランダム順に並べ、先頭から最大10問を出題する（`slice(0, Math.min(10, shuffled.length))`）
- タイトル画面の表示文言は「全20曲からランダムに10問出題」（コード上のhardcoded text）

### 回答形式

- 4択（ラジオ選択ではなく、ボタンをクリック）
- 1度回答したら選択変更不可（`answered` stateがtrueになると `onAnswer` を無視）

### 選択肢の生成ロジック（`generateChoices` in `app/page.js`）

1. 正解曲を1つ目の選択肢として確定
2. **同じ演奏家・別タイトル**の曲からランダムに1曲選ぶ。同一演奏家に他の曲がない場合は、別演奏家の曲からランダムに1曲選ぶ
3. **別演奏家**の曲からランダムに2曲選ぶ（すでに使用済みタイトルは除外）
4. 計4曲をFisher-Yatesシャッフルして選択肢の表示順を決定

### 選択肢の表示内容

各選択肢に以下を表示：
- `title`（スペイン語タイトル）
- `titleJa`（日本語タイトル）※存在する場合のみ
- `artist`（演奏家名）
- `year`年

### 音源・再生の仕様（Spotify iframeの扱い）

- `https://open.spotify.com/embed/track/{spotifyTrackId}?utm_source=generator&autoplay=0&theme=0` をiframeで埋め込む
- iframe サイズ: 幅100%、高さ80px
- **回答前**: `filter: blur(6px)` でプレイヤー全体をぼかす。右端60px幅に金色のパルスアニメーション付きハイライトを重ねて再生ボタン位置を示す
- **回答後**: `filter: none`（0.4秒のeaseトランジション）でぼかしが解除される
- Spotify Embed APIの `postMessage` イベント（`playback_update`）を受信し、再生中かどうかを `playing` stateで管理（現時点でUI表示には使用していない）
- **Spotifyログインなし**: 30秒で自動停止。停止後はプレイヤーの再生ボタンが押せなくなる
- **Spotifyログイン済み**: フル再生される

### 回答後の表示

- 正解: `✓ 正解！`（色: `#C9A84C` 金色）
- 不正解: `✗ 不正解…`（色: `#F5F0E8` クリーム色）
- 選択肢ボタンの色変化:
  - 正解の選択肢: 背景 `#1a4a1a`（緑）、ボーダー `#C9A84C`、テキスト `#C9A84C`、`✓` マーク付き
  - 選択した不正解の選択肢: 背景 `#3a0000`、ボーダー `#8B0000`、opacity 0.7
  - 他の選択肢: 背景 `#120606`、opacity 0.4
- ボタン2つが表示される:
  - 「この曲について」→ SongModalを開く
  - 「次へ →」 / 「結果を見る →」（最終問題時）

### スコア表示（ScoreBar）

- 画面上部にスティッキーで固定（`sticky top-0`）
- 表示内容: `問題 {current}/{total}` と `スコア {score}`
- 背景色: `#8B0000`（深紅）
- ✕ボタンでタイトルに戻る（`window.confirm` ダイアログあり）

### 最終結果画面（ResultScreen）

- 最終スコアを `{score}/{total}` 形式で大きく表示
- 正解率に応じたメッセージを表示:
  - 100%: 「完璧！タンゴの達人ですね！」
  - 70%以上: 「すばらしい！よく知っていますね！」
  - 40%以上: 「なかなかです！もう少しで達人！」
  - 39%以下: 「まだまだこれから！練習あるのみ！」
- 出題された10曲の一覧をボタン形式で表示（タップでSongModalが開く）
- 「♪ もう一度挑戦する」ボタンでタイトル画面に戻る（曲をリシャッフルして再初期化）

### 曲解説モーダル（SongModal）

- 画面全体をオーバーレイ（`rgba(0,0,0,0.85)`）して表示
- 表示内容: `title`、`artist`、`year`年、`description`
- オーバーレイ外クリックまたは ✕ ボタンで閉じる
- 表示タイミング: 回答後「この曲について」ボタン押下 / 最終結果画面の曲一覧タップ

### 音声読み上げ（TTS）

各選択肢の右に 🔊 ボタンを表示し、タップすると以下の順序でWeb Speech APIで読み上げる：

1. `choice.title`（スペイン語タイトル）— 言語: `es-ES`
2. `choice.titleJa`（日本語タイトル）— 言語: `ja-JP`
3. `choice.artist`（演奏家名）— 言語: `es-ES`
4. `{choice.year}年` — 言語: `ja-JP`

読み上げ中はボタンがグレーアウト・無効化される。読み上げ中に再タップ不可。`window.speechSynthesis.cancel()` で前の発話をキャンセルしてから開始。

---

## 5. 演奏家別クイズ仕様

### アクセス方法

`/artist-quiz?artist={演奏家名}` でアクセス。演奏家名はURLエンコードされる。

### 表示条件

`/artists` ページの演奏家カード内で、`songs.json` に4曲以上収録されている演奏家のみ「🎵 この演奏家のクイズ」ボタンを表示（`songCount[artist.name] >= 4` の条件）。

### 問題数・出題順

- 指定演奏家の全曲をFisher-Yatesシャッフルして出題（上限なし、全曲出題）
- 問題数は演奏家ごとの収録曲数に依存

### 選択肢の生成ロジック（`generateArtistChoices` in `app/artist-quiz/page.js`）

1. 正解曲を確定
2. **同じ演奏家の別曲**からシャッフル後、最大3曲を選ぶ
3. 同一演奏家の別曲が3曲に満たない場合、不足分を**別演奏家の曲**からランダムに補う
4. 計4曲（正解1 + 残り3）をFisher-Yatesシャッフルして表示順を決定

### その他

- ScoreBar・QuizCard・SongModal・ResultScreen は通常クイズと共通コンポーネントを使用
- 結果画面には「← 演奏家紹介に戻る」リンクを表示
- ScoreBarの ✕ ボタンは `/artists` にルーティング（通常クイズはタイトル画面に戻る）
- `Suspense` でラップして `useSearchParams` のサスペンスに対応

---

## 6. 曲データ（songs.json）

### データ構造（全フィールド）

```json
{
  "id": "1",
  "title": "La Cumparsita",
  "titleJa": "小さなカーニバルの行列",
  "artist": "Juan D'Arienzo y su Orquesta Típica",
  "year": 1943,
  "spotifyTrackId": "56m2q6ItHRx5HIF31YobrH",
  "description": "（解説テキスト）",
  "choices": [
    { "title": "...", "artist": "...", "year": 1943 },
    ...
  ]
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `id` | string | 連番（"1"〜"58"） |
| `title` | string | スペイン語タイトル |
| `titleJa` | string | 日本語タイトル |
| `artist` | string | 演奏家・楽団名 |
| `year` | number | 録音・発表年 |
| `spotifyTrackId` | string | SpotifyトラックID |
| `description` | string | 曲の解説テキスト |
| `choices` | array | 事前生成された4択（各要素に `title`, `artist`, `year`）。クイズ実行時は `generateChoices` でランタイム再生成されるため参照されない |

注意: `choices` 配列内の各オブジェクトには `titleJa` フィールドがない（トップレベルのみ存在）。ランタイム生成の `generateChoices` / `generateArtistChoices` では `titleJa` を含む `toChoice()` 関数で生成するため、選択肢のTTSで日本語タイトルが読み上げられる。

### 収録楽団・曲数一覧

| 演奏家 | 曲数 |
|--------|------|
| Juan D'Arienzo y su Orquesta Típica | 4曲 |
| Carlos Gardel | 5曲 |
| Astor Piazzolla | 5曲 |
| Angel Villoldo | 1曲 |
| Enrique Saborido | 1曲 |
| Juan de Dios Filiberto | 1曲 |
| Carlos Di Sarli y su Orquesta Típica | 5曲 |
| Osvaldo Pugliese | 5曲 |
| Jacob Gade | 1曲 |
| Aníbal Troilo y su Orquesta Típica | 5曲 |
| Francisco Canaro y su Orquesta Típica | 5曲 |
| Enrique Rodriguez y su Orquesta Típica | 5曲 |
| Angel D'Agostino y Angel Vargas | 5曲 |
| Julio De Caro y su Sexteto | 5曲 |
| Osvaldo Fresedo y su Orquesta Típica | 5曲 |
| **合計** | **58曲** |

---

## 7. 演奏家紹介ページ仕様（/artists）

### 表示内容

`artists` 配列（page.js内にハードコード）に定義された15名を順番に表示。

各カードの表示項目：
- 番号バッジ（1〜15）
- 演奏家名（Playfair Displayフォント）
- 活動年代（例: `1900–1976`）
- 特徴（文章）
- ダンスのポイント（文章）
- 代表曲（タグ形式）
- 「🎵 この演奏家のクイズ」ボタン（songs.jsonに4曲以上ある場合のみ表示）

### 掲載演奏家（15名、定義順）

1. Juan D'Arienzo y su Orquesta Típica（1900–1976）
2. Carlos Gardel（1890–1935）
3. Astor Piazzolla（1921–1992）
4. Osvaldo Pugliese（1905–1995）
5. Carlos Di Sarli y su Orquesta Típica（1903–1960）
6. Angel Villoldo（1861–1919）
7. Enrique Saborido（1877–1941）
8. Juan de Dios Filiberto（1885–1964）
9. Jacob Gade（1879–1963）
10. Aníbal Troilo y su Orquesta Típica（1914–1975）
11. Francisco Canaro y su Orquesta Típica（1888–1964）
12. Enrique Rodriguez y su Orquesta Típica（1901–1971）
13. Angel D'Agostino y Angel Vargas（1900–1991 / 1904–1959）
14. Julio De Caro y su Sexteto（1899–1980）
15. Osvaldo Fresedo y su Orquesta Típica（1897–1984）

---

## 8. 楽団系譜図ページ仕様（/lineage）

### 概要

アルゼンチンタンゴ楽団の系譜・師弟・親交関係を横軸=時間軸（1897〜1998年）、縦軸=レーン（1〜10）のSVG図で表示する。

### キャンバスサイズ

- SVG全体: 2400 × 800 px
- マージン: 左140、上70、右60、下80

### ノード

`NODES` 配列に定義された37楽団・演奏家を円形ノード（半径34px）で表示。クリックで詳細パネルを表示。

### エッジ（接続線）

`EDGES` 配列に定義された27本の線で楽団間の関係を表示：
- **実線（solid）**: 師弟関係
- **破線（dashed）**: 親交関係

### 時代区分（背景バンド）

| 時代 | 期間 |
|------|------|
| 草創期 | 1897〜1923 |
| デ・カロ時代 | 1923〜1934 |
| 黄金時代 | 1934〜1956 |
| 過渡期 | 1956〜1969 |
| ヌエボ・タンゴ | 1969〜1998 |

### インタラクション

- **ノードクリック**: 選択状態になり、接続するエッジとノードをハイライト。関係のないノードはopacity 0.3でフェード。左下に詳細パネル（演奏家名・活動開始年・注記・師弟関係の入出力一覧）を表示
- **ドラッグ**: SVG全体をパン（移動）
- **マウスホイール**: ズーム（0.25〜3.0倍、係数0.92/1.08）
- **ズームボタン（右下）**: ＋（×1.2）、－（×0.83）、全体（初期状態に戻す: scale=0.72、tx=-40、ty=0）
- **背景クリック**: 選択解除（ドラッグ後は解除しない）

### 表示レベル切り替え機能

**未実装**。コード上に表示レベル切り替えの機能は存在しない。

---

## 9. デザイン

### カラーパレット

| 用途 | カラーコード |
|------|-------------|
| 背景（メイン） | `#0a0a0a` |
| 背景（カード） | `#1a0a0a` |
| テキスト（メイン） | `#F5F0E8`（クリーム色） |
| アクセント金色 | `#C9A84C` |
| アクセント赤 | `#8B0000`（深紅） |
| ボーダー（暗） | `#3D0000` |
| 系譜図背景 | `#0c0101` |

### フォント

- **Playfair Display**: タイトル・スコア・演奏家名などの見出し
- **Geist Sans**: UIの汎用テキスト
- **Noto Serif JP**: 楽団系譜図内のノードテキスト（`/lineage` のみ）

### レイアウト

- 最大幅 `max-w-lg`（512px）、中央寄せ
- モバイルファースト設計
- SongModal: スマホでは画面下部から表示（`items-end`）、sm以上では中央表示（`sm:items-center`）

---

## 10. 開発ルール

### ビルド確認

```bash
npm run build
```

### 開発サーバー起動

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### デプロイ手順

Vercelへの自動デプロイ（mainブランチへのpushで自動デプロイ。Vercelの設定はコード外）。

---

## 11. 今後の追加予定機能

コード上に追加予定機能の記載はない。

