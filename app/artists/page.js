const artists = [
  {
    id: 1,
    name: "Juan D'Arienzo y su Orquesta Típica",
    feature:
      "「タンゴの王様」と呼ばれるダリエンソ楽団は、鋭く刻むリズムと速いテンポが最大の特徴。1935年頃からビアジをピアニストに迎えてスタイルを確立した。バンドネオンの歯切れのよい音が際立ち、常に踊るための音楽を追求した。",
    dancePoint:
      "ビートが明確で速いため、小刻みなステップや鋭いアクセントが映える。テンポが速いのでコンパクトなムーブメントが基本。初心者にも拍が取りやすく、ミロンガでも多く使われる。",
  },
  {
    id: 2,
    name: "Carlos Gardel",
    feature:
      "「タンゴの神様」と称えられる伝説の歌手。甘く切ない声質と完璧なフレージングで、タンゴを世界に広めた。1935年の飛行機事故で45歳で亡くなったが、その録音は今も色あせない。",
    dancePoint:
      "ガルデルの曲はタンゴ・カンシオン（歌のタンゴ）が中心で、歌詞の感情を体で表現することが大切。テンポはゆったりめで、メロディに寄り添ったリリカルな踊りに向いている。",
  },
  {
    id: 3,
    name: "Astor Piazzolla",
    feature:
      "ヌエボタンゴの創始者。クラシック音楽とジャズを融合させ、タンゴを演奏会芸術へと昇華させた革命家。伝統タンゴの愛好家からは批判されたが、今や世界で最も知られるタンゴ作曲家。",
    dancePoint:
      "ピアソラの音楽はダンス用に作られていないため、踊りにくいと感じることも。しかし複雑な強弱やアクセントを活かした表現豊かな踊りが可能。上級者向けで、即興性と音楽性が求められる。",
  },
  {
    id: 4,
    name: "Osvaldo Pugliese",
    feature:
      "重厚でドラマティックな「プグリエーセのコンパス」で知られる巨匠。左手のピアノによる強いアクセント「ラ・ユンバ」が特徴的で、楽団全体が一体となった迫力ある演奏スタイル。",
    dancePoint:
      "強烈なアクセントと劇的な強弱変化が踊りに直結する。「ラ・ユンバ」の重いビートに合わせた力強いステップ、ドラマティックなポーズや止め（パウセ）が効果的。中・上級者向け。",
  },
  {
    id: 5,
    name: "Carlos Di Sarli y su Orquesta Típica",
    feature:
      "「セニョール・デル・タンゴ」の異名を持つ優雅な楽団長。流れるようなピアノラインとシルクのように滑らかなリズムが特徴。派手さよりも品格を重視したスタイルは多くのダンサーに愛される。",
    dancePoint:
      "流れるような動きとエレガントなウォークが映える。急いだり止まったりせず、メロディに乗って滑らかに歩くことが大切。クローズドアンブレイスで踊ると特に美しい。全レベルに対応。",
  },
  {
    id: 6,
    name: "Angel Villoldo",
    feature:
      "タンゴ草創期を代表する作曲家・歌手。19世紀末のブエノスアイレスの街角で生まれたタンゴの原型を多く作曲。ユーモアと活力に満ちた初期タンゴのエッセンスを伝える存在。",
    dancePoint:
      "草創期の古いスタイルのタンゴで、素朴でシンプルなリズムが特徴。ガウチョの雰囲気を持つ力強いステップが合う。現代のミロンガではあまり使われないが、タンゴの歴史を感じられる。",
  },
  {
    id: 7,
    name: "Enrique Saborido",
    feature:
      "ウルグアイ出身のタンゴ草創期の作曲家。明るくエネルギッシュな初期タンゴを多く作曲し、ヨーロッパへのタンゴ普及にも貢献した。",
    dancePoint:
      "草創期タンゴのシンプルで直接的なリズムが特徴。明るく活発な雰囲気で踊れる。現代的なアレンジも多く、比較的踊りやすい。",
  },
  {
    id: 8,
    name: "Juan de Dios Filiberto",
    feature:
      "ブエノスアイレスの詩情を音楽で表現した叙情的な作曲家。カミニートをはじめ、下町の情景を美しいメロディで描いた作品が多い。",
    dancePoint:
      "叙情的でメロディアスな曲が多く、歌心のある踊りに適している。テンポはゆったりめで、メロディに寄り添った柔らかい動きが映える。",
  },
  {
    id: 9,
    name: "Jacob Gade",
    feature:
      "デンマーク出身の作曲家。1925年に作曲したJealousyはタンゴの情熱を世界に広めた名曲で、映画やショーで多用され今も世界中で演奏される。",
    dancePoint:
      "情熱的でドラマティックなJealousyは、大きな動きとメリハリのある表現が映える。ステージタンゴやショータンゴにもよく使われる。",
  },
  {
    id: 10,
    name: "Aníbal Troilo y su Orquesta Típica",
    feature:
      "「ピチュコ」の愛称で親しまれた黄金期最大のバンドネオン奏者・楽団長。叙情的で温かみのある演奏スタイルはダリエンソの鋭さとは対照的で、ロマンティックなタンゴの象徴。フィオレンティーノとのコンビは黄金期最高の声楽デュオ。",
    dancePoint:
      "叙情的なメロディと柔らかいリズムが特徴で、感情表現豊かな踊りに向いている。アクセントは強すぎず、全体的に丸みのある動きが合う。歌詞の感情を体で表現することが大切。中級者以上向け。",
  },
  {
    id: 11,
    name: "Francisco Canaro y su Orquesta Típica",
    feature:
      "史上最多録音数（3800曲以上）を誇るタンゴ界の巨人。明快で踊りやすいスタイルは世界中のダンサーに愛され、タンゴをヨーロッパに広めた功績も大きい。バランスのとれた安定したオーケストラサウンドが特徴。",
    dancePoint:
      "明快なビートと安定したテンポで非常に踊りやすい。初心者から上級者まで対応できる懐の深さが魅力。ミロンガでよく使われ、ウォークやオチョが美しく決まる。",
  },
  {
    id: 12,
    name: "Enrique Rodriguez y su Orquesta Típica",
    feature:
      "明るく快活でユーモアあふれる楽団スタイル。他の楽団が哀愁や情熱を前面に出す中、ロドリゲスは陽気さと軽やかさを大切にした独特の個性を持つ。",
    dancePoint:
      "明るく軽快なリズムが特徴で、楽しく踊れる。重いステップより軽やかなステップが合う。ミロンガやタンゴのセクション転換でよく使われる。初中級者向けで踊りやすい。",
  },
  {
    id: 13,
    name: "Angel D'Agostino y Angel Vargas",
    feature:
      "「二人の天使（ロス・ドス・アンヘレス）」と呼ばれた黄金のコンビ。ダゴスティーノのシンプルで表情豊かなピアノとバルガスの甘い歌声が融合した、素朴で魔法のような音楽。ブエノスアイレスのミロンガで最も人気が高い楽団のひとつ。",
    dancePoint:
      "シンプルで直接的なリズムとメロディが特徴。過度な装飾をせずシンプルに歩くことが最も美しく映える。バルガスの歌声の甘さに合わせた柔らかい動きが効果的。全レベルに対応。",
  },
  {
    id: 14,
    name: "Julio De Caro y su Sexteto",
    feature:
      "タンゴに知性と芸術性をもたらした革新者。クラシック音楽の対位法を取り入れた複雑なアレンジは黄金期タンゴの土台となった。プグリエーセやトロイロも影響を受けた巨匠。",
    dancePoint:
      "複雑な和声と繊細なアレンジが特徴で、音楽をよく聴きながら踊ることが大切。テンポは中程度で、音楽の構造に合わせた精巧な踊りが向いている。上級者向け。",
  },
  {
    id: 15,
    name: "Osvaldo Fresedo y su Orquesta Típica",
    feature:
      "「タンゴの詩人」と呼ばれる洗練された楽団長。優雅でロマンティックなスタイルはディ・サルリと並ぶ上品さを持つ。ヴァイオリンとハープを多用した独特のサウンドが特徴。",
    dancePoint:
      "優雅でロマンティックな雰囲気が特徴。大きな動きより繊細な体重移動や柔らかいコネクションが映える。ヴァイオリンの美しいメロディに合わせた流れるような踊りに向いている。中級者以上向け。",
  },
];

export default function ArtistsPage() {
  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ backgroundColor: "#0a0a0a", color: "#F5F0E8" }}
    >
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1
            className="text-3xl"
            style={{ fontFamily: "var(--font-playfair)", color: "#C9A84C" }}
          >
            演奏家ガイド
          </h1>
          <p className="text-sm" style={{ color: "#F5F0E8", opacity: 0.6 }}>
            各演奏家の特徴とダンスのポイント
          </p>
          <div className="w-16 h-px mx-auto mt-3" style={{ backgroundColor: "#8B0000" }} />
        </div>

        {artists.map((artist) => (
          <div
            key={artist.id}
            className="rounded-2xl p-5 space-y-4 border"
            style={{ backgroundColor: "#1a0a0a", borderColor: "#C9A84C" }}
          >
            <h2
              className="text-base font-bold leading-snug"
              style={{ fontFamily: "var(--font-playfair)", color: "#C9A84C" }}
            >
              {artist.name}
            </h2>

            <div className="space-y-1">
              <p
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: "#8B0000" }}
              >
                特徴
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.85 }}>
                {artist.feature}
              </p>
            </div>

            <div className="h-px" style={{ backgroundColor: "#2a1a1a" }} />

            <div className="space-y-1">
              <p
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: "#8B0000" }}
              >
                ダンスのポイント
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.85 }}>
                {artist.dancePoint}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
