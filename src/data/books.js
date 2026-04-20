// The library catalog.
// `type: 'pdf'` → opens in the PDF viewer.
// `type: 'typeset'` → reserved for future Unicode-typeset content.

export const BOOKS = [
  {
    id: 'shrimad-vachanamrut',
    title: 'Shrimad Rajchandra Vachanamrut',
    titleGu: 'શ્રીમદ્ રાજચંદ્ર',
    subtitle: 'The complete Agas Ashram edition',
    author: 'Shrimad Rajchandra',
    type: 'pdf',
    file: '/books/Vachanamrut-shrimad-mark.pdf',
    pages: 992,
    year: 'સં. ૨૦૬૮',
    cover: {
      label: 'શ્રીમદ્\nરાજચંદ્ર',
      tone: 'saffron',
    },
    description:
      'The definitive collection of Shrimad Rajchandra’s letters, writings, poems, and private notes, as compiled and published by the Shrimad Rajchandra Ashram, Agas.',
  },
  // Future books can be added here.
  // Example Unicode typeset entry (not yet content-backed):
  // {
  //   id: 'atmasiddhi',
  //   title: 'Atmasiddhi Shastra',
  //   titleGu: 'આત્મસિદ્ધિ શાસ્ત્ર',
  //   type: 'typeset',
  //   source: 'atmasiddhi',
  //   ...
  // },
];

// Reserve a home for future hand-typed Unicode content
// (Apurva Avasar, Atmasiddhi verses, etc.). Empty for now.
export const TYPESET_CONTENT = {};
