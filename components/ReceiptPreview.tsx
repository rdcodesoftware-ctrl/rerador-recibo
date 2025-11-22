
import React from 'react';
import { ReceiptData } from '../types';

interface ReceiptPreviewProps {
  data: ReceiptData;
}

export const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ data }) => {
  
  // Helper to write amount in words (simplified for demo, usually needs a library for full number-to-words)
  // For this task, we will focus on layout.
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  return (
    <div 
      id="receipt-preview" 
      className="bg-[#fffcf5] text-slate-900 p-8 shadow-xl mx-auto max-w-[800px] relative font-serif border border-slate-200 print:border-2 print:border-slate-800 print:shadow-none"
      style={{ minHeight: '450px' }}
    >
      {/* Texture overlay for screen only */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] print:hidden"></div>

      {/* Header */}
      <div className="border-b-2 border-slate-800 pb-6 mb-8">
        {/* Logo Centered */}
        {data.logo && (
          <div className="flex justify-center mb-8">
            <img 
              src={data.logo} 
              alt="Logo" 
              className="h-auto max-h-40 w-auto max-w-full object-contain" 
            />
          </div>
        )}

        <div className="flex justify-between items-end">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold tracking-wider uppercase">Recibo</h1>
            <p className="text-slate-600 italic mt-1">Comprovante de Doação</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Valor</div>
            <div className="text-3xl font-bold text-emerald-700 bg-emerald-50 px-4 py-2 border border-emerald-200 rounded">
              {data.amount || 'R$ 0,00'}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-8 text-lg leading-relaxed">
        <p>
          Recebi(emos) de <span className="font-bold border-b border-slate-400 px-1 inline-block min-w-[200px]">{data.payerName}</span>
        </p>
        
        <p>
          A importância de <span className="font-bold text-emerald-700 px-1">{data.amount}</span>
        </p>

        <p>
          Referente a <span className="font-bold border-b border-slate-400 px-1 inline-block min-w-[200px]">{data.referenceMonth}</span>
          {data.description && (
             <span className="text-slate-600 italic"> - {data.description}</span>
          )}
        </p>

        <p>
          E, para clareza, firmo(amos) o presente.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-16 flex flex-col md:flex-row justify-between items-end gap-8">
        
        {/* Date */}
        <div className="text-center md:text-left">
          <p className="mb-2">{data.issueDate ? `Data: ${formatDate(data.issueDate)}` : 'Data: ___/___/____'}</p>
          <div className="text-sm text-slate-500">Local e Data</div>
        </div>

        {/* Signature */}
        <div className="flex flex-col items-center min-w-[250px]">
          <div className="h-24 w-full flex items-end justify-center mb-2 relative">
             {data.signatureImage ? (
                <img 
                  src={data.signatureImage} 
                  alt="Assinatura" 
                  className="max-h-full object-contain absolute bottom-0 mix-blend-multiply" 
                />
             ) : (
               <div className="w-full h-full border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 print:hidden">
                 Sem Assinatura
               </div>
             )}
             <div className="w-full border-b border-slate-800 absolute bottom-0"></div>
          </div>
          <p className="font-bold">{data.issuerName || 'Nome do Emissor'}</p>
          {data.issuerDoc && <p className="text-xs text-slate-500">CPF/CNPJ: {data.issuerDoc}</p>}
        </div>

      </div>
    </div>
  );
};
