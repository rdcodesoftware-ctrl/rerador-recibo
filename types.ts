export interface ReceiptData {
  payerName: string;
  amount: string; // Keeping as string for formatted input handling
  referenceMonth: string;
  description: string;
  issuerName: string;
  issuerDoc: string; // CPF or CNPJ
  issueDate: string;
  signatureImage: string | null;
  logo: string | null;
}

export interface AIGeneratedContent {
  message: string;
  subject: string;
}