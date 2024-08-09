import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportPDF = ({ stock }) => {
  const handleExport = () => {
    const doc = new jsPDF();

    
    doc.text('Données de Stock', 14, 16);

    
    const tableColumn = ["Nom", "Numero Article", "Prix Unitaire", "Quantité", "Prix Totale", "Date", "Description"];
    const tableRows = stock.map(item => [
      item.nom,
      item.numero_article,
      item.prix_unitaire,
      item.quantite,
      item.prix_totale,
      item.date,
      item.description
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('stock_data.pdf');
  };

  return (
    <button onClick={handleExport} className="btn btn-success">
      Exporter en PDF
    </button>
  );
};

export default ExportPDF;
