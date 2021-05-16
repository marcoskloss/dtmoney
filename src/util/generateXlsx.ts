import xlsx from 'xlsx';
import { saveAs } from 'file-saver';

export function generateXlsx({ data }: any) {
  const wb = xlsx.utils.book_new();
  wb.SheetNames.push('dt money Sheet');
  const ws_data = data;
  const ws = xlsx.utils.json_to_sheet(ws_data);
  wb.Sheets['dt money Sheet'] = ws;
  var wbOut = xlsx.write(wb, {bookType:'xlsx',  type: 'binary'});

  function s2ab(s: any) { 
    const buf = new ArrayBuffer(s.length); 
    const view = new Uint8Array(buf); 
    for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;    
  }
  saveAs(new Blob([s2ab(wbOut)],{type:"application/octet-stream"}), 'dtmoney.xlsx');
}