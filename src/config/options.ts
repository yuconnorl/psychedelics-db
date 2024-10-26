export const CATEGORY_OPTIONS_MAP = {
  'mandarin-speech-video': '中文演講影片',
  'mandarin-video': '中文影片',
  'mandarin-thesis': '中文論文',
  'mandarin-article': '中文文章',
  'mandarin-file': '中文文件',
  'mandarin-website': '中文網站',
  'mandarin-social-media': '中文社群媒體',
  'mandarin-book': '中文書籍',
  'psychedelics-research-article': '啟靈藥文獻資料庫',
  'waiting-for-translate-video': '待中文化影片',
  'activity-log-n-data': '活動紀錄與資料',
  'psychedelics-fundamentals': '啟靈藥與精神活性物質基礎知識庫',
  'online-media': '線上媒體',
  'research-centre': '學術研究機構',
  'ngo-research-institute': '民間非營利科學研究機構',
  'private-research-institute': '私人科學研究企業',
  'ngo-foundation': '非營利組織與基金會',
  'therapy-institue': '啟靈藥治療機構與靜修中心',
  'health-n-safety': '戒癮、減害與啟靈藥使用心理支持組織',
  'psychotherapy-training': '啟靈藥輔助心理治療訓練機構',
  'decriminalize-policy': '啟靈藥政策倡議組織',
  psychotherapists: '臨床專家組織協會',
  'press-n-journal': '出版社與期刊',
  conference: '國際會議與研討會',
  'podcast-speech': '研討會、線上演講影片與 Podcast',
  'research-topics': '專題文章',
  'influential-people': '全球啟靈藥社群重要人物',
}

export const CATEGORY_OPTIONS = Object.keys(CATEGORY_OPTIONS_MAP) as Array<
  keyof typeof CATEGORY_OPTIONS_MAP
>

export const PAYLOAD_CATEGORY_OPTIONS = Object.entries(
  CATEGORY_OPTIONS_MAP,
).map(([value, label]) => ({ value, label }))

export const TYPE_OPTIONS = [
  'video',
  'youtube-channel',
  'instagram',
  'twitter',
  'facebook',
  'podcast',
  'article',
  'website',
  'thesis',
  'pdf',
  'book',
] as const

export const LANGUAGE_OPTIONS = ['zh-tw', 'en'] as const

export const substanceOptions = {
  '2c-b': '2C-B',
  '5-meo-dmt': '5-MeO-DMT',
  'amanita-muscaria': 'Amanita muscaria',
  ayahuasca: 'Ayahuasca',
  cannabis: 'Cannabis',
  dmt: 'DMT',
  doi: 'DOI',
  ghb: 'GHB',
  ibogaine: 'Ibogaine',
  ketamine: 'Ketamine',
  lsa: 'LSA',
  lsd: 'LSD',
  'lsd-analogs': 'LSD-Analogs',
  mdma: 'MDMA',
  mescaline: 'Mescaline',
  peyote: 'Peyote',
  pcp: 'PCP',
  psilocybin: 'Psilocybin',
  salvia: 'Salvia',
  unspecified: 'Unspecified',
} as const

export const PAYLOAD_SUBSTANCE_OPTIONS = Object.entries(substanceOptions).map(
  ([value, label]) => ({ value, label }),
)
