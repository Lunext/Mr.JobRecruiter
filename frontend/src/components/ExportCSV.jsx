
import * as FileSaver from 'file-saver'; 
import * as XLSX from 'xlsx'; 

const ExportCSV = ({csvData,fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

  return (
    <button
    type="button"
    className="py-2 px-10 bg-gray-400 hover:bg-gray-600 text-white uppercase font-bold rounded-lg "
    onClick={(e)=>exportToCSV(csvData,fileName)}
>
    Exportar
</button>
  )
}

export default ExportCSV
