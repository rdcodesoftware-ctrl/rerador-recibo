
export const DEFAULT_LOGO = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgMjUwIj48dGV4dCB4PSI0MDAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IidUaW1lcyBOZXcgUm9tYW4nLCBzZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMTQwIiBmaWxsPSIjMDAwMDAwIj5UT1JPTlRPPC90ZXh0Pjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LXNpemU9IjMwIiBsZXR0ZXItc3BhY2luZz0iMiIgZmlsbD0iIzAwMDAwMCI+SU5URVJOQVRJT05BTCBBU1NFTUJMWSBPRiBHT0Q8L3RleHQ+PC9zdmc+";

// Assinatura fixa simulada (estilo manuscrito)
export const FIXED_SIGNATURE = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNTAgMTUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij48cGF0aCBkPSJNNDAsMTIwIEM2MCw5MCAxMDAsNTAgMTMwLDMwIEMxNDAsMjAgMTU1LDIwIDE1MCw1MCBDMTQ1LDgwIDEzMCwxMDAgMTQwLDExMCBDMTUwLDEyMCAxNjUsMTAwIDE4MCw5MCBDMTk1LDgwIDIxMCw4MCAyMjAsOTAgQzIzMCwxMDAgMjQwLDEwMCAyNTAsOTAgQzI2MCw4MCAyODAsNzAgMzAwLDYwIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+";

export const INITIAL_RECEIPT_DATA = {
  payerName: '',
  amount: '',
  referenceMonth: new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' }),
  description: 'Dízimo',
  issuerName: 'IIAD Toronto Bragança',
  issuerDoc: '23.370.923/0001-30',
  issueDate: new Date().toISOString().split('T')[0],
  signatureImage: FIXED_SIGNATURE,
  logo: DEFAULT_LOGO,
};

export const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];