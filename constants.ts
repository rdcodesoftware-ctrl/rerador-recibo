
export const DEFAULT_LOGO = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgMzAwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MDAsNzApIj48cGF0aCBkPSJNMCwwIEwwLDQ1IE0tMTUsMTUgTDE1LDE1IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNLTUsMjUgUS00MCw1IC02MCwyNSBQLTMwLDU1IC01LDQwIE01LDI1IFE0MCwtNSA2MCwxNSBRMzAsNTUgNSw0MCIgZmlsbD0iYmxhY2siLz48L2c+PHRleHQgeD0iNDAwIiB5PSIyMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJUaW1lcyBOZXcgUm9tYW4sIHNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSIxMzAiPlRPUk9OVE88L3RleHQ+PHRleHQgeD0iNDAwIiB5PSIyNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMjgiIGxldHRlci1zcGFjaW5nPSIyIj5JTlRFUk5BVElPTkFMIEFTU0VNQkxZIE9GIEdPRDwvdGV4dD48L3N2Zz4=";

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