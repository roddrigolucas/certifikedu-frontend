import Papa from 'papaparse';

export const downloadCsv = (data: string[]) => {
  // Prepare data for CSV
  const dataForCsv = data.map((item) => [item]);

  // Convert data to CSV string
  const csv = Papa.unparse(dataForCsv);

  // Create a Blob from the CSV string
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  // Create a link to trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'data.csv');
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
