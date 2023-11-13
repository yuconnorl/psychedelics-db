export const CATEGORY_OPTIONS = [
  'psychedelics-fundamentals',
  'online-media',
  'research-centre',
  'ngo-research-institute',
  'private-research-institute',
  'ngo-foundation',
  'therapy-institue',
  'health-n-safety',
  'psychotherapy-training',
  'decriminalize-policy',
  'psychotherapists',
  'press-n-journal',
  'conference',
  'podcast-speech',
] as const

export const TYPE_OPTIONS = [
  'video',
  'instagram',
  'facebook',
  'podcast',
  'article',
  'website',
  'thesis',
  'pdf',
  'book',
] as const

export const LANGUAGE_OPTIONS = ['zh-tw', 'en'] as const

export const CATEGORY_OPTIONS_MAP = {
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
  'podcast-speech': '研討會、線上演講影片與Podcast',
}
