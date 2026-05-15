'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

/* ─────────────────── COLORS ─────────────────── */
const GOLD    = '#c9a84c';
const GOLD_LT = '#f0d880';
const CREAM   = '#f5e6c8';
const NODE_DARK = '#1a0404';
const NODE_SEL  = '#5c1010';
const NODE_CON  = '#2d0808';

/* ═══════════════════════════════════════════════
   LEVEL 1 — 主要系統（6カード）
═══════════════════════════════════════════════ */
const L1_CARDS = [
  'ロベルト・フィルポ',
  'フランシスコ・カナロ',
  'アニバル・トロイロ',
  'カルロス・ディ・サルリ',
  'オスバルド・プグリエーセ',
  'アストル・ピアソラ',
];

function Level1() {
  return (
    <div style={{ padding: '32px 20px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 16,
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {L1_CARDS.map((name) => (
          <div key={name} style={{
            border: `1.5px solid ${GOLD}`,
            borderRadius: 10,
            padding: '18px 12px',
            textAlign: 'center',
            backgroundColor: NODE_DARK,
            color: CREAM,
            fontSize: 14,
            fontFamily: "'Noto Serif JP', serif",
            fontWeight: 700,
            letterSpacing: '0.04em',
            lineHeight: 1.6,
          }}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LEVEL 2 — 代表楽団（SVG系統図）
═══════════════════════════════════════════════ */
const L2_NODES = [
  { id: 'filpo',       label: 'ロベルト・フィルポ',           year: '1910年代',    col: 0, row: 1 },
  { id: 'canaro',      label: 'フランシスコ・カナロ',         year: '1910年代',    col: 0, row: 3 },
  { id: 'donato',      label: 'エドガルド・ドナート',         year: '1920s',       col: 1, row: 0 },
  { id: 'fresedo',     label: 'オスバルド・フレセド',         year: '独立',        col: 1, row: 2 },
  { id: 'caro_m',      label: 'ミゲル・カロ',                 year: '独立',        col: 2, row: 2 },
  { id: 'darienzo',    label: 'フアン・ダリエンソ',           year: '1930s',       col: 1, row: 4 },
  { id: 'rodriguez_e', label: 'エンリケ・ロドリゲス',         year: '',            col: 2, row: 4 },
  { id: 'troilo',      label: 'アニバル・トロイロ',           year: '1935年',      col: 2, row: 1 },
  { id: 'disarli',     label: 'カルロス・ディ・サルリ',       year: '1920s後半',   col: 0, row: 5 },
  { id: 'gobbi',       label: 'アルフレード・ゴビ',           year: '独立',        col: 1, row: 5 },
  { id: 'salgan',      label: 'オラシオ・サルガン',           year: '独立',        col: 2, row: 5 },
  { id: 'pugliese',    label: 'オスバルド・プグリエーセ',     year: '1939年',      col: 0, row: 7 },
  { id: 'piazzolla',   label: 'アストル・ピアソラ',           year: '1955年頃',    col: 3, row: 1 },
  { id: 'francini',    label: 'E.M.フランシニ',               year: '独立',        col: 3, row: 2 },
  { id: 'stampone',    label: 'エクトル・スタンポーネ',       year: '独立',        col: 3, row: 3 },
  { id: 'agri',        label: 'アントニオ・アグリ',           year: '独立',        col: 3, row: 4 },
  { id: 'valcarce_e',  label: 'エミリオ・バルカルセ',         year: '独立',        col: 3, row: 5 },
  { id: 'modern',      label: '現代楽団多数',                 year: '1970〜1998',  col: 1, row: 7 },
];

const L2_EDGES = [
  { from: 'filpo',     to: 'donato',      type: 'solid' },
  { from: 'filpo',     to: 'fresedo',     type: 'solid' },
  { from: 'donato',    to: 'troilo',      type: 'dashed' },
  { from: 'fresedo',   to: 'caro_m',      type: 'solid' },
  { from: 'canaro',    to: 'darienzo',    type: 'solid' },
  { from: 'canaro',    to: 'troilo',      type: 'solid' },
  { from: 'darienzo',  to: 'rodriguez_e', type: 'solid' },
  { from: 'troilo',    to: 'piazzolla',   type: 'solid' },
  { from: 'troilo',    to: 'francini',    type: 'solid' },
  { from: 'troilo',    to: 'stampone',    type: 'solid' },
  { from: 'troilo',    to: 'agri',        type: 'solid' },
  { from: 'troilo',    to: 'valcarce_e',  type: 'solid' },
  { from: 'disarli',   to: 'gobbi',       type: 'solid' },
  { from: 'gobbi',     to: 'salgan',      type: 'dashed' },
  { from: 'pugliese',  to: 'modern',      type: 'dashed' },
];

function TreeSVG({ nodes, edges }) {
  const COL_W = 200;
  const ROW_H = 72;
  const NW = 160, NH = 52;
  const PAD = 24;

  const maxCol = Math.max(...nodes.map(n => n.col));
  const maxRow = Math.max(...nodes.map(n => n.row));
  const W = (maxCol + 1) * COL_W + PAD * 2;
  const H = (maxRow + 1) * ROW_H + PAD * 2 + 40;

  const cx = (col) => PAD + col * COL_W + NW / 2;
  const cy = (row) => PAD + row * ROW_H + NH / 2;

  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  return (
    <div style={{ overflowX: 'auto', padding: '0 16px' }}>
      <svg width={W} height={H} style={{ display: 'block', margin: '0 auto', minWidth: 320 }}>
        {/* edges */}
        {edges.map((e, i) => {
          const fn = nodeMap[e.from], tn = nodeMap[e.to];
          if (!fn || !tn) return null;
          const x1 = cx(fn.col), y1 = cy(fn.row);
          const x2 = cx(tn.col), y2 = cy(tn.row);
          const mx = (x1 + x2) / 2;
          const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
          return (
            <path key={i} d={d} fill="none"
              stroke={e.type === 'solid' ? GOLD : '#8a7040'}
              strokeWidth={e.type === 'solid' ? 1.5 : 1.2}
              strokeDasharray={e.type === 'dashed' ? '6,4' : undefined}
              opacity={e.type === 'solid' ? 0.7 : 0.45}
            />
          );
        })}
        {/* nodes */}
        {nodes.map(n => {
          const x = PAD + n.col * COL_W;
          const y = PAD + n.row * ROW_H;
          return (
            <g key={n.id}>
              <rect x={x} y={y} width={NW} height={NH} rx={8}
                fill={NODE_DARK} stroke={GOLD} strokeWidth={1.2} />
              <text x={x + NW / 2} y={y + (n.year ? NH / 2 - 6 : NH / 2 + 4)}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={11} fill={CREAM}
                fontFamily="'Noto Serif JP', serif" fontWeight={700}>
                {n.label}
              </text>
              {n.year && (
                <text x={x + NW / 2} y={y + NH / 2 + 10}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={9} fill={GOLD} opacity={0.7}
                  fontFamily="'Noto Serif JP', serif">
                  {n.year}
                </text>
              )}
            </g>
          );
        })}
        {/* legend */}
        <g transform={`translate(${PAD},${H - 28})`}>
          <line x1={0} y1={8} x2={28} y2={8} stroke={GOLD} strokeWidth={1.5} opacity={0.7} />
          <text x={34} y={12} fontSize={10} fill={CREAM} opacity={0.65} fontFamily="'Noto Serif JP', serif">直接継承</text>
          <line x1={90} y1={8} x2={118} y2={8} stroke="#8a7040" strokeWidth={1.2} strokeDasharray="6,4" opacity={0.45} />
          <text x={124} y={12} fontSize={10} fill={CREAM} opacity={0.65} fontFamily="'Noto Serif JP', serif">影響</text>
        </g>
      </svg>
    </div>
  );
}

function Level2() {
  return <TreeSVG nodes={L2_NODES} edges={L2_EDGES} />;
}

/* ═══════════════════════════════════════════════
   LEVEL 3 — 完全版（SVG系統図）
═══════════════════════════════════════════════ */
const L3_NODES = [
  /* 源流期 */
  { id: 'filpo',        label: 'ロベルト・フィルポ',           year: '1910年代',      col: 0, row: 1  },
  { id: 'canaro',       label: 'フランシスコ・カナロ',         year: '1910年代',      col: 0, row: 4  },
  { id: 'donato',       label: 'エドガルド・ドナート',         year: '1920s独立',     col: 1, row: 0  },
  { id: 'fresedo',      label: 'オスバルド・フレセド',         year: '独立',          col: 1, row: 2  },
  { id: 'caro_m',       label: 'ミゲル・カロ',                 year: '独立',          col: 2, row: 2  },
  { id: 'darienzo',     label: 'フアン・ダリエンソ',           year: '1930s',         col: 1, row: 5  },
  { id: 'rodriguez_e',  label: 'エンリケ・ロドリゲス',         year: '',              col: 2, row: 5  },
  { id: 'disarli',      label: 'カルロス・ディ・サルリ',       year: '1920s後半',     col: 0, row: 6  },
  { id: 'gobbi',        label: 'アルフレード・ゴビ',           year: '独立',          col: 1, row: 6  },
  /* 黄金期 */
  { id: 'troilo',       label: 'アニバル・トロイロ',           year: '1935年',        col: 2, row: 1  },
  { id: 'pugliese',     label: 'オスバルド・プグリエーセ',     year: '1939年独立',    col: 0, row: 9  },
  /* 分岐期 */
  { id: 'piazzolla',    label: 'アストル・ピアソラ',           year: '1955年頃',      col: 3, row: 0  },
  { id: 'francini',     label: 'E.M.フランシニ',               year: '独立',          col: 3, row: 1  },
  { id: 'stampone',     label: 'E.スタンポーネ',               year: '独立',          col: 3, row: 2  },
  { id: 'agri',         label: 'A.アグリ',                     year: '1960s独立',     col: 3, row: 3  },
  { id: 'valcarce_e',   label: 'E.バルカルセ',                 year: '独立',          col: 3, row: 4  },
  { id: 'salgan',       label: 'O.サルガン',                   year: '独立',          col: 2, row: 6  },
  { id: 'gojeneche',    label: 'R.ゴジェネチェ',               year: '歌手として独立', col: 3, row: 5 },
  { id: 'octet_ba',     label: 'オクテート・BS.As.',           year: '1960s室内楽',   col: 4, row: 0  },
  /* 1970〜80年代 */
  { id: 'valcarce_h',   label: 'H.バルカルセ',                 year: '1980s',         col: 4, row: 4  },
  { id: 'ducan',        label: 'ドゥカン・ナーテ',             year: '1970s',         col: 4, row: 1  },
  { id: 'stampone_n',   label: 'N.スタンポーネ',               year: '1970〜80s',     col: 4, row: 2  },
  { id: 'rodriguez_h',  label: 'H.ロドリゲス',                 year: '1980s',         col: 4, row: 3  },
  { id: 'basso',        label: 'バッソ楽団',                   year: '1980s前衛',     col: 4, row: 5  },
  { id: 'rovira',       label: 'ロビラ・ベリョス',             year: '1970〜80s',     col: 1, row: 9  },
  { id: 'rodriguez_n',  label: 'ロドリゲス・ノバルス',         year: '1980s',         col: 2, row: 9  },
  { id: 'muliano',      label: 'H.ムリャーノ',                 year: '1980〜90s',     col: 2, row: 5  },
  { id: 'notro',        label: 'ノトロ楽団',                   year: '',              col: 4, row: 6  },
  { id: 'salgan_r',     label: 'ロエール・サルガン楽団',       year: '1980〜90s',     col: 3, row: 6  },
  { id: 'darienzo_c',   label: 'C.ダリエンソ楽団',             year: '1990s後継',     col: 2, row: 4  },
  { id: 'disarli_c',    label: 'ディ・サルリ後継楽団',         year: '1990s',         col: 1, row: 7  },
  /* 1990〜98年代 */
  { id: 'quinteto_nt',  label: 'キンテート・ヌエボ・タンゴ',  year: '1987〜1990s',   col: 5, row: 0  },
  { id: 'laconte',      label: 'N.ラコンテ',                   year: '1990s',         col: 5, row: 1  },
  { id: 'birjion',      label: 'D.ビルジョン',                 year: '1990s',         col: 3, row: 9  },
  { id: 'nacional',     label: 'アルゼンチン国立タンゴ楽団',  year: '1990s',         col: 4, row: 9  },
  { id: 'muliano2',     label: 'H.ムリャーノ楽団',             year: '1990s',         col: 2, row: 10 },
  { id: 'modern',       label: '現代楽団多数',                 year: '1970〜1998年',  col: 0, row: 11 },
];

const L3_EDGES = [
  /* 源流期 */
  { from: 'filpo',      to: 'donato',       type: 'solid'  },
  { from: 'filpo',      to: 'fresedo',      type: 'solid'  },
  { from: 'donato',     to: 'troilo',       type: 'dashed' },
  { from: 'fresedo',    to: 'caro_m',       type: 'solid'  },
  { from: 'canaro',     to: 'darienzo',     type: 'solid'  },
  { from: 'canaro',     to: 'troilo',       type: 'solid'  },
  { from: 'darienzo',   to: 'rodriguez_e',  type: 'solid'  },
  { from: 'darienzo',   to: 'muliano',      type: 'solid'  },
  { from: 'darienzo',   to: 'darienzo_c',   type: 'solid'  },
  { from: 'disarli',    to: 'gobbi',        type: 'solid'  },
  { from: 'disarli',    to: 'disarli_c',    type: 'solid'  },
  { from: 'gobbi',      to: 'salgan',       type: 'dashed' },
  /* 黄金期〜分岐期 */
  { from: 'troilo',     to: 'piazzolla',    type: 'solid'  },
  { from: 'troilo',     to: 'francini',     type: 'solid'  },
  { from: 'troilo',     to: 'stampone',     type: 'solid'  },
  { from: 'troilo',     to: 'agri',         type: 'solid'  },
  { from: 'troilo',     to: 'valcarce_e',   type: 'solid'  },
  { from: 'troilo',     to: 'gojeneche',    type: 'dashed' },
  { from: 'valcarce_e', to: 'valcarce_h',   type: 'solid'  },
  { from: 'pugliese',   to: 'rovira',       type: 'solid'  },
  { from: 'pugliese',   to: 'rodriguez_n',  type: 'solid'  },
  { from: 'pugliese',   to: 'birjion',      type: 'dashed' },
  { from: 'pugliese',   to: 'nacional',     type: 'dashed' },
  { from: 'pugliese',   to: 'modern',       type: 'dashed' },
  /* ピアソラ系 */
  { from: 'piazzolla',  to: 'octet_ba',     type: 'solid'  },
  { from: 'piazzolla',  to: 'ducan',        type: 'dashed' },
  { from: 'piazzolla',  to: 'stampone_n',   type: 'dashed' },
  { from: 'piazzolla',  to: 'rodriguez_h',  type: 'dashed' },
  { from: 'piazzolla',  to: 'basso',        type: 'dashed' },
  { from: 'piazzolla',  to: 'laconte',      type: 'dashed' },
  { from: 'piazzolla',  to: 'quinteto_nt',  type: 'dashed' },
  /* 1980〜90s */
  { from: 'salgan',     to: 'salgan_r',     type: 'solid'  },
  { from: 'gojeneche',  to: 'notro',        type: 'dashed' },
  { from: 'gojeneche',  to: 'rodriguez_n',  type: 'dashed' },
  { from: 'muliano',    to: 'muliano2',     type: 'solid'  },
];

function Level3() {
  return <TreeSVG nodes={L3_NODES} edges={L3_EDGES} />;
}

/* ═══════════════════════════════════════════════
   LEVEL 4 — 完全版インタラクティブ（旧実装）
═══════════════════════════════════════════════ */

/* ─────────────────── LAYOUT ─────────────────── */
const YR0 = 1897, YR1 = 1998;
const CW = 2400, CH = 800;
const ML = 140, MT = 70, MR = 60;

const yrX = (y) => ML + (y - YR0) / (YR1 - YR0) * (CW - ML - MR);
const lnY = (l) => MT + (l - 1) * 64;

const NODES = [
  { id: 'villoldo',  name: 'アンヘル\nビジョルド',     year: 1898, lane: 2,  note: '（1861–1919）アルゼンチン・タンゴの草創期を代表する作曲家・歌手。「エル・チョクロ」（1903）「ラ・モロチャ」など不朽の名曲を残した。タンゴを音楽として世に広めた最初の人物の一人。' },
  { id: 'firpo',     name: 'ロベルト\nフィルポ',       year: 1908, lane: 4,  note: '（1884–1969）ピアノ奏者・楽団長。フリオ・デ・カロの師として知られ、タンゴの器楽化・芸術化に貢献。「カミニート」の編曲でも有名。長きにわたりタンゴ界の中心に立ち続けた。' },
  { id: 'canaro',    name: 'フランシスコ\nカナロ',     year: 1907, lane: 7,  note: '（1888–1964）ウルグアイ出身の楽団長・作曲家・ヴァイオリン奏者。生涯で5000曲以上を録音した最多作の人物。ダリエンソなど多くの後進を育て、タンゴの商業的普及に最も寄与した。' },
  { id: 'robaudy',   name: 'カルロス\nロバウディ',    year: 1912, lane: 10, note: '草創期のタンゴ楽団長。1910年代のブエノスアイレスで活躍し、タンゴをカフェや舞踏会に普及させた初期の演奏家の一人。' },
  { id: 'fresedo',   name: 'オスバルド\nフレセド',    year: 1920, lane: 6,  note: '（1897–1984）「タンゴの貴公子」と呼ばれた洗練されたスタイルの楽団長。バイオリン奏者として繊細な音楽性を持ち、上流階級のサロンでも愛された。1920年代から60年以上にわたり活躍した。' },
  { id: 'lomuto',    name: 'フランシスコ\nロムート',  year: 1921, lane: 9,  note: '（1893–1950）ピアノ奏者・楽団長。踊りやすいリズムを重視した楽団として人気を博し、1920〜30年代のミロンガ（ダンスホール）で広く演奏された。' },
  { id: 'decaro',    name: 'フリオ\nデ・カロ',        year: 1924, lane: 4,  note: '（1899–1980）「タンゴ革新の父」。フィルポ楽団出身。タンゴを単なる踊りの伴奏から芸術音楽へと昇華させた。バンドネオン2本・ヴァイオリン2本・ピアノ・コントラバスの六重奏編成を確立し、その影響は後の全楽団に及ぶ。' },
  { id: 'maffia',    name: 'ペドロ\nマフィア',        year: 1925, lane: 3,  note: '（1899–1967）デ・カロ楽団出身のバンドネオン奏者・作曲家。タンゴの演奏技法を高め、後進の育成にも尽力。楽器の表現可能性を大きく広げた演奏家として評価される。' },
  { id: 'donato',    name: 'エドガルド\nドナート',    year: 1926, lane: 2,  note: '（1897–1963）ヴァイオリン奏者・楽団長。リズミカルで躍動感あふれる独自のスタイルを確立。「ラ・カンパルシータ」の編曲でも知られ、黄金時代への橋渡し役を果たした。' },
  { id: 'disarli',   name: 'カルロス\nディ・サルリ',  year: 1928, lane: 8,  note: '（1903–1960）「エル・セニョール・デル・タンゴ（タンゴの君主）」。ピアノ奏者・楽団長。クリアで優雅なピアノと流麗なヴァイオリンが特徴。サロン・タンゴの美学を極めた。' },
  { id: 'laurenz',   name: 'ペドロ\nラウレンス',      year: 1929, lane: 3,  note: '（1902–1972）デ・カロ楽団出身のバンドネオン奏者・作曲家・楽団長。深みのある音色と複雑な和声を駆使した知性的な演奏で知られ、マフィアと並ぶデ・カロ系の名手。' },
  { id: 'darienzo',  name: 'フアン\nダリエンソ',      year: 1935, lane: 7,  note: "Juan D'Arienzo。「リズムの王様」。カナロ楽団出身。" },
  { id: 'carabajal', name: 'ロドルフォ\nカラバハル',   year: 1934, lane: 10, note: '1930年代に活躍したバンドネオン奏者・楽団長。黄金時代前夜のブエノスアイレスのカフェやダンスホールで演奏し、タンゴの普及に貢献した。' },
  { id: 'rodrigueE', name: 'エンリケ\nロドリゲス',     year: 1938, lane: 9,  note: '（1901–1971）バンドネオン奏者・楽団長。明るく軽快で踊りやすいスタイルが特徴。歌手アルマンド・モレノとのコンビで多くのヒット曲を残した。黄金時代の大衆的人気を誇った楽団の一つ。' },
  { id: 'tanturi',   name: 'リカルド\nタンツーリ',    year: 1941, lane: 9,  note: '（1905–1973）ピアノ奏者・楽団長。名歌手アルベルト・カスティージョとのコンビで1940年代に絶大な人気を博した。踊りやすいリズムと歌謡性を兼ね備えた黄金時代を代表する楽団の一つ。' },
  { id: 'troilo',    name: 'アニバル\nトロイロ',      year: 1937, lane: 5,  note: '（1914–1975）愛称「ピチュコ」。黄金時代最大の楽団長・バンドネオン奏者。深く人間的な音楽はタンゴの精神を体現するとも言われる。ピアソーラ、フランシーニ、ポンティエルなど多くの名演奏家を育てた。' },
  { id: 'biagi',     name: 'ロドルフォ\nビアヒ',       year: 1938, lane: 6,  note: '（1906–1969）「マノス・ブルハス（魔法の手）」と呼ばれたピアノ奏者・楽団長。ダリエンソ楽団出身。鋭いスタッカートと独特のリズム感でダリエンソ以上に激しいビートを実現。ダンサーから特に愛された。' },
  { id: 'pugliese',  name: 'オスバルド\nプグリエーセ', year: 1939, lane: 4,  note: '（1905–1995）ピアノ奏者・楽団長。重厚で劇的、複雑なリズムパターンを特徴とする「プグリエーセ・スタイル」を確立。左翼的政治信条から当局に弾圧を受けた時代もあったが演奏を続け、90年の生涯をタンゴに捧げた。' },
  { id: 'varela',    name: 'カルロス\nバレラ',         year: 1936, lane: 10, note: '1930年代末から活躍した楽団長。黄金時代のブエノスアイレスのダンスホールで活動し、タンゴの踊り文化を支えた演奏家の一人。' },
  { id: 'demare',    name: 'ルシオ\nデ・マーレ',       year: 1940, lane: 3,  note: '（1906–1974）ピアノ奏者・作曲家・楽団長。詩的で叙情的なスタイルが特徴。歌手ロベルト・ルフィーノとのコンビで多くの名録音を残した。タンゴに文学的な深みをもたらした芸術家の一人。' },
  { id: 'calo',      name: 'ミゲル\nカロ',             year: 1940, lane: 6,  note: '（1907–1972）バンドネオン奏者・楽団長。「オルケスタ・デ・ラス・エストレジャス（スターたちの楽団）」と称され、アルフレド・ゴビ、オラシオ・サルガンらを輩出。トロイロ楽団と並ぶ黄金時代の名門。' },
  { id: 'gobbi',     name: 'アルフレド\nゴビ',          year: 1943, lane: 2,  note: '（1912–1965）ヴァイオリン奏者・楽団長。カロ楽団出身。繊細で感情豊かな演奏スタイルを持つ。妻でありタンゴの名歌手フローラ・ロドンとのコンビは伝説的。早逝が惜しまれる才人。' },
  { id: 'salgan',    name: 'オラシオ\nサルガン',       year: 1944, lane: 8,  note: '（1916–2016）ピアノ奏者・作曲家・楽団長。カロ楽団出身。クラシック音楽とジャズの要素を大胆に取り入れた革新的なスタイルで知られる。100歳まで演奏を続けた長寿の巨匠。' },
  { id: 'francini',  name: 'フランシーニ\n=ポンティエル', year: 1946, lane: 5, note: 'エンリケ・フランシーニ（1916–1978、Vn）とアルマンド・ポンティエル（1918–1980、Bn）。ともにトロイロ楽団出身の名手コンビ。均整のとれた洗練されたアンサンブルで黄金時代の終盤に多くの名録音を残した。' },
  { id: 'piaz55',    name: 'アストル・ピアソーラ\nBsAs八重奏団', year: 1955, lane: 5, note: '（1921–1992）バンドネオン奏者・作曲家。トロイロ楽団での修業後、1955年に「ブエノスアイレス八重奏団」を結成。ジャズ・クラシックの対位法を融合した「ヌエボ・タンゴ」を創始し、タンゴを世界的な芸術音楽へと押し上げた。' },
  { id: 'piaz61',    name: 'アストル・ピアソーラ\n前期Quinteto', year: 1961, lane: 5, note: 'アストル・ピアソーラ 前期クインテット（1961年頃）。バンドネオン・ヴァイオリン・ピアノ・エレキギター・コントラバスの五重奏編成を確立。パリ留学後の円熟したスタイルで「アディオス・ノニーノ」など代表作を多数発表。' },
  { id: 'piaz70',    name: 'アストル・ピアソーラ\n後期Quinteto', year: 1970, lane: 5, note: 'アストル・ピアソーラ 後期クインテット（1970年代）。円熟の最盛期。「リベルタンゴ」（1974）をはじめ多くの代表作を生み出した。国際的な評価が高まり、世界中でコンサートを行った時期。' },
  { id: 'mederos',   name: 'ロドルフォ\nメデロス',     year: 1972, lane: 4,  note: '（1940– ）バンドネオン奏者・作曲家・楽団長。プグリエーセの重厚なスタイルに影響を受けつつ、独自の現代的タンゴを追求。アルゼンチン国内での評価は特に高く、タンゴの知的継承者の一人とされる。' },
  { id: 'sexteto',   name: 'セステート\nマヨール',    year: 1975, lane: 9,  note: '1970年代に結成された六重奏団。黄金時代のスタイルを高い演奏技術で再現し、世界中のタンゴファンに愛された。伝統的な編成・奏法を守りながら国際的な普及に大きく貢献した。' },
  { id: 'saluzzi',   name: 'ディノ\nサルッシ',         year: 1976, lane: 3,  note: '（1935– ）バンドネオン奏者・作曲家。アルゼンチン北部フォルクローレの要素とジャズ・現代音楽を融合した極めて個性的なスタイル。ECMレーベルからの録音で世界的に知られる。タンゴの枠を超えた20世紀の音楽巨人。' },
  { id: 'troiloLt',  name: 'アニバル・トロイロ\n(晩年)', year: 1972, lane: 6, note: 'アニバル・トロイロ 晩年の楽団（1970年代初頭）。老いてなお衰えぬ音楽性で多くのファンを魅了し続けた。1975年5月18日、ブエノスアイレスにて逝去。その死はアルゼンチン全土が悼んだ。' },
  { id: 'piaz82',    name: 'アストル・ピアソーラ\nNuevo Quinteto', year: 1982, lane: 5, note: 'アストル・ピアソーラ ヌエボ・クインテット（1982–92）。キケ・シノージ（Vn）、パブロ・ジーグレル（Pf）らを擁した集大成の時期。「ブエノスアイレスのマリア」など大作を発表。1992年逝去。' },
  { id: 'nuevo',     name: 'ヌエボ・タンゴ\n各楽団',  year: 1993, lane: 5,  note: '1990年代以降に世界各地で生まれたヌエボ・タンゴの諸楽団。ピアソーラの遺産を受け継ぎながら、さらにジャズ・クラシック・ワールドミュージックと融合。タンゴはブエノスアイレスを超えた世界的な音楽ジャンルへと発展した。' },
];

const EDGES = [
  { from: 'villoldo',  to: 'firpo',     type: 'dashed' },
  { from: 'firpo',     to: 'canaro',    type: 'dashed' },
  { from: 'firpo',     to: 'decaro',    type: 'solid'  },
  { from: 'firpo',     to: 'fresedo',   type: 'dashed' },
  { from: 'decaro',    to: 'maffia',    type: 'solid'  },
  { from: 'decaro',    to: 'laurenz',   type: 'solid'  },
  { from: 'decaro',    to: 'pugliese',  type: 'dashed' },
  { from: 'decaro',    to: 'demare',    type: 'dashed' },
  { from: 'decaro',    to: 'disarli',   type: 'dashed' },
  { from: 'canaro',    to: 'lomuto',    type: 'solid'  },
  { from: 'canaro',    to: 'darienzo',  type: 'solid'  },
  { from: 'fresedo',   to: 'donato',    type: 'dashed' },
  { from: 'fresedo',   to: 'calo',      type: 'dashed' },
  { from: 'darienzo',  to: 'biagi',     type: 'solid'  },
  { from: 'darienzo',  to: 'salgan',    type: 'dashed' },
  { from: 'disarli',   to: 'rodrigueE', type: 'dashed' },
  { from: 'lomuto',    to: 'rodrigueE', type: 'dashed' },
  { from: 'troilo',    to: 'piaz55',    type: 'solid'  },
  { from: 'troilo',    to: 'francini',  type: 'solid'  },
  { from: 'troilo',    to: 'gobbi',     type: 'dashed' },
  { from: 'troilo',    to: 'calo',      type: 'dashed' },
  { from: 'troilo',    to: 'troiloLt',  type: 'solid'  },
  { from: 'pugliese',  to: 'mederos',   type: 'dashed' },
  { from: 'pugliese',  to: 'sexteto',   type: 'dashed' },
  { from: 'piaz55',    to: 'piaz61',    type: 'solid'  },
  { from: 'piaz61',    to: 'piaz70',    type: 'solid'  },
  { from: 'piaz70',    to: 'piaz82',    type: 'solid'  },
  { from: 'piaz82',    to: 'nuevo',     type: 'solid'  },
];

function EdgePath({ from, to, type, active, faded }) {
  const x1 = yrX(from.year), y1 = lnY(from.lane);
  const x2 = yrX(to.year),   y2 = lnY(to.lane);
  const mx = (x1 + x2) / 2;
  const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  const color   = active ? GOLD_LT : (type === 'solid' ? GOLD : '#8a7040');
  const opacity = faded  ? 0.08 : (active ? 1 : (type === 'solid' ? 0.6 : 0.3));
  const sw      = active ? 2.5 : 1.2;
  return (
    <path d={d} fill="none" stroke={color} strokeWidth={sw}
      strokeDasharray={type === 'dashed' ? '6,5' : undefined}
      opacity={opacity} />
  );
}

function OrchestraNode({ node, isSelected, isConnected, isIdle, onClick }) {
  const cx = yrX(node.year), cy = lnY(node.lane);
  const lines = node.name.split('\n');
  const r = 34;
  const fs = lines.length === 1 ? 9.5 : lines.length === 2 ? 8 : 7;
  const lh = fs + 2.5;

  return (
    <g transform={`translate(${cx},${cy})`}
      onClick={(e) => { e.stopPropagation(); onClick(node.id); }}
      style={{ cursor: 'pointer' }}>
      {isSelected && (
        <circle r={r + 7} fill="none" stroke={GOLD_LT} strokeWidth="1" opacity="0.25" />
      )}
      <circle r={r}
        fill={isSelected ? NODE_SEL : isConnected ? NODE_CON : NODE_DARK}
        stroke={isSelected ? GOLD_LT : GOLD}
        strokeWidth={isSelected ? 2.5 : 1.5}
        opacity={isIdle ? 0.3 : 1} />
      {lines.map((line, i) => (
        <text key={i}
          x="0" y={(i - (lines.length - 1) / 2) * lh}
          textAnchor="middle" dominantBaseline="middle"
          fontSize={fs} fill={isIdle ? 'rgba(245,230,200,0.25)' : CREAM}
          fontFamily="'Noto Serif JP', serif" fontWeight="400">
          {line}
        </text>
      ))}
    </g>
  );
}

function LevelFull() {
  const [selected, setSelected] = useState(null);
  const [tx, setTx] = useState(-40);
  const [ty, setTy] = useState(0);
  const [scale, setScale] = useState(0.72);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e) => {
      e.preventDefault();
      const f = e.deltaY > 0 ? 0.92 : 1.08;
      setScale(s => Math.max(0.25, Math.min(3, s * f)));
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  const nodeMap = {};
  NODES.forEach(n => (nodeMap[n.id] = n));

  const connectedSet = new Set();
  const activeEdgeSet = new Set();
  if (selected) {
    connectedSet.add(selected);
    EDGES.forEach((e, i) => {
      if (e.from === selected || e.to === selected) {
        connectedSet.add(e.from);
        connectedSet.add(e.to);
        activeEdgeSet.add(i);
      }
    });
  }
  const hasSel = selected !== null;

  const onMouseDown = (e) => {
    isDragging.current = true;
    hasMoved.current = false;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasMoved.current = true;
    setTx(t => t + dx);
    setTy(t => t + dy);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => { isDragging.current = false; };
  const onBgClick = () => { if (!hasMoved.current) setSelected(null); };
  const onNodeClick = (id) => { if (!hasMoved.current) setSelected(p => p === id ? null : id); };

  const YEARS = [];
  for (let y = 1900; y <= 1998; y += 10) YEARS.push(y);

  const ERAS = [
    { label: '草創期',        start: 1897, end: 1923 },
    { label: 'デ・カロ時代',  start: 1923, end: 1934 },
    { label: '黄金時代',      start: 1934, end: 1956 },
    { label: '過渡期',        start: 1956, end: 1969 },
    { label: 'ヌエボ・タンゴ', start: 1969, end: 1998 },
  ];

  const TOP_Y = lnY(1) - 40;
  const BOT_Y = lnY(10) + 40;

  const selNode = selected ? nodeMap[selected] : null;
  const selIn   = selNode ? EDGES.filter(e => e.to   === selected).map(e => nodeMap[e.from]?.name.replace(/\n/g, '')) : [];
  const selOut  = selNode ? EDGES.filter(e => e.from === selected).map(e => nodeMap[e.to]  ?.name.replace(/\n/g, '')) : [];

  return (
    <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}
      ref={containerRef}
      onMouseDown={onMouseDown} onMouseMove={onMouseMove}
      onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>

      <svg width={CW} height={CH} onClick={onBgClick}
        style={{ transformOrigin: '0 0', transform: `translate(${tx}px,${ty}px) scale(${scale})`, cursor: 'grab', display: 'block' }}>

        <rect width={CW} height={CH} fill="transparent" />

        {ERAS.map((era, i) => {
          const x = yrX(era.start);
          const w = yrX(era.end) - x;
          const colors = [
            'rgba(255,210,120,0.025)',
            'rgba(220,130,70,0.035)',
            'rgba(200,80,50,0.045)',
            'rgba(100,80,160,0.03)',
            'rgba(60,40,120,0.045)',
          ];
          return (
            <g key={era.label}>
              <rect x={x} y={TOP_Y} width={w} height={BOT_Y - TOP_Y} fill={colors[i]} />
              <line x1={x} y1={TOP_Y} x2={x} y2={BOT_Y} stroke={GOLD} strokeWidth="0.4" opacity="0.12" />
              <text x={x + w / 2} y={BOT_Y + 22} textAnchor="middle" fontSize="9.5"
                fill={GOLD} opacity="0.35" fontFamily="'Noto Serif JP', serif">{era.label}</text>
            </g>
          );
        })}

        {YEARS.map(y => (
          <g key={y}>
            <line x1={yrX(y)} y1={TOP_Y} x2={yrX(y)} y2={BOT_Y}
              stroke={GOLD} strokeWidth="0.3" opacity="0.18" />
            <text x={yrX(y)} y={TOP_Y - 10} textAnchor="middle" fontSize="11"
              fill={GOLD} opacity="0.55" fontFamily="'Noto Serif JP', serif">{y}</text>
          </g>
        ))}

        <line x1={yrX(YR0) - 10} y1={BOT_Y + 8} x2={yrX(YR1) + 10} y2={BOT_Y + 8}
          stroke={GOLD} strokeWidth="0.5" opacity="0.22" />

        {EDGES.map((e, i) => {
          const fn = nodeMap[e.from], tn = nodeMap[e.to];
          if (!fn || !tn) return null;
          return (
            <EdgePath key={i} from={fn} to={tn} type={e.type}
              active={activeEdgeSet.has(i)}
              faded={hasSel && !activeEdgeSet.has(i)} />
          );
        })}

        {NODES.map(n => (
          <OrchestraNode key={n.id} node={n}
            isSelected={selected === n.id}
            isConnected={connectedSet.has(n.id) && selected !== n.id}
            isIdle={hasSel && !connectedSet.has(n.id)}
            onClick={onNodeClick} />
        ))}
      </svg>

      {selNode && (
        <div style={{
          position: 'absolute', bottom: 20, left: 20,
          background: 'rgba(8,1,1,0.92)', border: '1px solid rgba(201,168,76,0.35)',
          padding: '14px 20px', minWidth: 240, maxWidth: 320,
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
          <div style={{ fontSize: 15, color: GOLD_LT, fontWeight: 700, marginBottom: 6, letterSpacing: '0.05em' }}>
            {selNode.name.replace(/\n/g, '')}
          </div>
          <div style={{ fontSize: 10.5, color: 'rgba(201,168,76,0.5)', marginBottom: 10, letterSpacing: '0.1em' }}>
            活動開始：{selNode.year}年頃
          </div>
          {selNode.note && (
            <div style={{ fontSize: 10.5, color: 'rgba(245,230,200,0.65)', lineHeight: 1.65, marginBottom: 10, borderLeft: '2px solid rgba(201,168,76,0.3)', paddingLeft: 8 }}>
              {selNode.note}
            </div>
          )}
          {selIn.length > 0 && (
            <div style={{ fontSize: 10.5, color: 'rgba(245,230,200,0.6)', marginBottom: 4 }}>
              <span style={{ color: 'rgba(201,168,76,0.7)', marginRight: 4 }}>←</span>
              {selIn.filter(Boolean).join('、')}
            </div>
          )}
          {selOut.length > 0 && (
            <div style={{ fontSize: 10.5, color: 'rgba(245,230,200,0.92)' }}>
              <span style={{ color: '#e8cc6a', marginRight: 4 }}>→</span>
              {selOut.filter(Boolean).join('、')}
            </div>
          )}
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[['＋', 1.2], ['－', 0.83]].map(([label, f]) => (
          <button key={label}
            onClick={() => setScale(s => Math.max(0.25, Math.min(3, s * f)))}
            style={{
              width: 32, height: 32, background: 'rgba(8,1,1,0.85)',
              border: '1px solid rgba(201,168,76,0.3)', color: GOLD,
              fontSize: 16, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            {label}
          </button>
        ))}
        <button
          onClick={() => { setScale(0.72); setTx(-40); setTy(0); }}
          style={{
            width: 32, height: 32, background: 'rgba(8,1,1,0.85)',
            border: '1px solid rgba(201,168,76,0.3)', color: GOLD,
            fontSize: 9, cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1.2,
          }}>
          全体
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
const LEVELS = [
  { id: 1, label: 'レベル1：主要系統' },
  { id: 2, label: 'レベル2：代表楽団' },
  { id: 3, label: 'レベル3：完全版'   },
];

export default function TangoChart() {
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;700&display=swap';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const isFullChart = level === 3;

  return (
    <div style={{
      width: '100vw',
      height: isFullChart ? '100vh' : 'auto',
      minHeight: '100vh',
      background: '#0c0101',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Noto Serif JP', serif",
      userSelect: 'none',
    }}>
      {/* ── NAVIGATION ── */}
      <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(201,168,76,0.18)', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <Link
          href="/artists"
          style={{ color: GOLD, fontSize: 13, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em' }}
        >
          ← 演奏家紹介に戻る
        </Link>
      </div>

      {/* ── HEADER ── */}
      <div style={{ padding: '10px 28px', borderBottom: '1px solid rgba(201,168,76,0.18)', flexShrink: 0 }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 17, color: GOLD, letterSpacing: '0.18em', fontWeight: 700 }}>
            アルゼンチンタンゴ楽団　系譜・師弟・親交図
          </div>
          <div style={{ fontSize: 10.5, color: 'rgba(201,168,76,0.42)', letterSpacing: '0.28em', marginTop: 3 }}>
            ARGENTINE TANGO ORCHESTRAS GENEALOGY　（1900 — 1998）
          </div>
        </div>

        {/* ── LEVEL BUTTONS ── */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {LEVELS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setLevel(id)}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "'Noto Serif JP', serif",
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.15s',
                backgroundColor: level === id ? '#8B0000' : 'transparent',
                color: GOLD,
                border: `1.5px solid ${level === id ? '#8B0000' : GOLD}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      {level === 1 && <Level1 />}
      {level === 2 && <Level2 />}
      {level === 3 && <Level3 />}
    </div>
  );
}
