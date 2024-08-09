import React from 'react';
import * as XLSX from 'xlsx';

const ExportExcel = ({ stock }) => {
  const handleExport = () => {
    
    const ws = XLSX.utils.json_to_sheet(stock);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Données de Stock');
    XLSX.writeFile(wb, 'stock_data.xlsx');
  };

  return (
    <button onClick={handleExport} className="btn btn-success">
      Exporter en Excel
    </button>
  );
};

export default ExportExcel;
