
import React, { useState } from 'react';
import { ReceiptData, AIGeneratedContent } from './types';
import { INITIAL_RECEIPT_DATA } from './constants';
import { ReceiptPreview } from './components/ReceiptPreview';
import { CurrencyInput } from './components/CurrencyInput';
import { generateConfirmationMessage } from './services/geminiService';

const App: React.FC = () => {
  const [receiptData, setReceiptData] = useState<ReceiptData>(INITIAL_RECEIPT_DATA);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiMessage, setAiMessage] = useState<AIGeneratedContent | null>(null);

  const handleChange = (field: keyof ReceiptData, value: string | null) => {
    setReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateAIMessage = async () => {
    if (!receiptData.payerName || !receiptData.amount) {
      alert("Preencha pelo menos o nome do pagador e o valor para gerar a mensagem.");
      return;
    }
    setIsGeneratingAI(true);
    try {
      const content = await generateConfirmationMessage(receiptData);
      setAiMessage(content);
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar mensagem com IA.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Left Side: Editor Form */}
      <div className="w-full md:w-1/3 lg:w-[400px] bg-white border-r border-slate-200 p-6 overflow-y-auto h-screen no-print z-10 shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Editor de Recibo
          </h2>
          <p className="text-slate-500 text-sm mt-1">Preencha os dados para gerar o recibo.</p>
        </div>

        <form className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Pagador</label>
            <input
              type="text"
              value={receiptData.payerName}
              onChange={(e) => handleChange('payerName', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Ex: João Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Valor (R$)</label>
            <CurrencyInput
              value={receiptData.amount}
              onChange={(val) => handleChange('amount', val)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-mono"
              placeholder="R$ 0,00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mês/Referência</label>
            <input
              type="text"
              value={receiptData.referenceMonth}
              onChange={(e) => handleChange('referenceMonth', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Ex: Setembro 2023"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Contribuição</label>
            <div className="relative">
              <select
                value={receiptData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white appearance-none"
              >
                <option value="Dízimo">Dízimo</option>
                <option value="Oferta">Oferta</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Dados do Emissor</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Nome/Empresa</label>
                <input
                  type="text"
                  value={receiptData.issuerName}
                  onChange={(e) => handleChange('issuerName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">CPF/CNPJ</label>
                <input
                  type="text"
                  value={receiptData.issuerDoc}
                  onChange={(e) => handleChange('issuerDoc', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Data de Emissão</label>
                <input
                  type="date"
                  value={receiptData.issueDate}
                  onChange={(e) => handleChange('issueDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="mt-8 space-y-3">
             <button 
              onClick={handleGenerateAIMessage}
              disabled={isGeneratingAI}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isGeneratingAI ? (
                 <>
                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Gerando Mensagem...
                 </>
              ) : (
                <>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                   Criar Msg de Envio (IA)
                </>
              )}
            </button>

            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Imprimir / Salvar PDF
            </button>
        </div>
      </div>

      {/* Right Side: Preview */}
      <div className="flex-1 bg-slate-100 p-4 md:p-12 overflow-y-auto relative">
        <div className="max-w-[850px] mx-auto space-y-8">
          
          {/* The Receipt */}
          <div className="scale-[0.8] md:scale-100 origin-top-center transition-transform duration-300">
             <ReceiptPreview data={receiptData} />
          </div>

          {/* AI Message Card */}
          {aiMessage && (
            <div className="bg-white border border-indigo-100 rounded-xl p-6 shadow-md no-print max-w-[800px] mx-auto">
              <h3 className="text-indigo-800 font-bold mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Sugestão de Mensagem (Gemini)
              </h3>
              <div className="space-y-3">
                <div>
                   <label className="text-xs font-bold text-slate-400 uppercase">Assunto</label>
                   <p className="text-slate-800 font-medium select-all">{aiMessage.subject}</p>
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-400 uppercase">Mensagem</label>
                   <div className="bg-slate-50 p-3 rounded border border-slate-100 text-slate-700 whitespace-pre-wrap select-all">
                     {aiMessage.message}
                   </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default App;
