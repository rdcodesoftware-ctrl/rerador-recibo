
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ReceiptData } from './types';
import { INITIAL_RECEIPT_DATA } from './constants';
import { ReceiptPreview } from './components/ReceiptPreview';
import { CurrencyInput } from './components/CurrencyInput';

const App: React.FC = () => {
  const [receiptData, setReceiptData] = useState<ReceiptData>(INITIAL_RECEIPT_DATA);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleChange = (field: keyof ReceiptData, value: string | null) => {
    setReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = async () => {
    setIsGeneratingPDF(true);
    try {
      const element = document.getElementById('receipt-preview');
      if (!element) return;

      // 1. Captura o elemento HTML como imagem
      const canvas = await html2canvas(element, {
        scale: 2, // Melhora a resolução
        useCORS: true, // Permite carregar imagens externas se houver headers corretos
        logging: false,
        backgroundColor: '#fffcf5' // Garante a cor de fundo do papel
      });

      const imgData = canvas.toDataURL('image/png');
      
      // 2. Gera o PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width em mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const fileName = `Recibo_${receiptData.payerName.replace(/\s+/g, '_')}.pdf`;

      // 3. Tenta compartilhar usando a API Nativa (Mobile)
      // Isso permite enviar o arquivo direto para o WhatsApp no Android/iOS
      const blob = pdf.output('blob');
      const file = new File([blob], fileName, { type: 'application/pdf' });
      const defaultMessage = `Olá ${receiptData.payerName}, segue o recibo referente a ${receiptData.referenceMonth}.`;

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Recibo de Pagamento',
          text: defaultMessage
        });
      } else {
        // 4. Fallback para Desktop (Baixa o PDF e abre o WhatsApp Web)
        pdf.save(fileName);
        
        const message = encodeURIComponent(`Olá ${receiptData.payerName}, segue o recibo em anexo.`);
        const whatsappUrl = `https://wa.me/?text=${message}`;
        
        // Pequeno delay para garantir que o download iniciou
        setTimeout(() => {
           window.open(whatsappUrl, '_blank');
           alert("O PDF foi baixado no seu computador.\n\nO WhatsApp Web foi aberto. Basta arrastar o arquivo baixado para a conversa.");
        }, 1000);
      }

    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF para compartilhamento.");
    } finally {
      setIsGeneratingPDF(false);
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
              onClick={handleShareWhatsApp}
              disabled={isGeneratingPDF}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
               {isGeneratingPDF ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
               ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
               )}
               Enviar PDF (WhatsApp)
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
              Imprimir
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

        </div>
      </div>
    </div>
  );
};

export default App;
