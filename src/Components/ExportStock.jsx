import React from 'react';
import Papa from 'papaparse';

const ExportStock = ({ stock }) => {
  const handleExport = () => {
    const csv = Papa.unparse(stock);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'stock_data.csv';
    document.body.appendChild(a);
    a.click();

    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <button onClick={handleExport} className="btn btn-success">
      Exporter en CSV
    </button>
  );
};

export default ExportStock;
