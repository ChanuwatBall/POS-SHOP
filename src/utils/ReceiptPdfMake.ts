// ReceiptPdfMake.ts
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// สำหรับรองรับฟอนต์ (รวมทั้งภาษาไทย)
pdfMake.vfs = pdfFonts?.vfs
pdfMake.fonts={
    THSarabunNew:{
        normal: 'https://codingthailand.com/site/fonts/th/THSarabunNew.ttf',
        bold: 'https://codingthailand.com/site/fonts/th/THSarabunNewBold.ttf',
        italics: 'https://codingthailand.com/site/fonts/th/THSarabunNewItalic.ttf',
    },   
    Roboto: {
      normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    }, 
  }


interface ReciptProps{
    date:String
    products:any[]
    total:String 
    cash:String
    change:String
}
export const generateReceiptPdfMake  = async ({
    date , products , total , cash ,change
}:ReciptProps) => {
    let body:any =[ ["สินค้า", "ราคา"]]
    await products.map((e)=>{
        body = [...body, [e.name , e.unitPrice] ]
    })
    // body.push(
    //     [  { text: "เงินสด"}, { text: cash+" บาท"}  ],
    //     [  { text: "รวม"}, { text: total+" บาท"}  ],
    //     [  { text: "เงินทอน"}, { text: change+" บาท"}  ]
    // )
  const docDefinition:any = {
    pageSize: {
        width: 210, // ประมาณ 58mm
        height: 'auto'
    },
    pageMargins: [10, 10, 10, 10],
    content: [
      { text: "ใบเสร็จรับเงิน", style: "header" },
      { text: "ร้านค้า: XYZ", margin: [0, 10, 0, 0] },
      { text: date },
      { text: " " },
      {
        table: {
          widths: ["*", "auto"],
          body: body ,
          layout: "noBorders",
          margin: [0, 0, 0, 10],
        },
      },
    { text:"" },
      { text: "จ่ายด้วย: เงินสด" , margin: [0, 0, 0, 5] }, 
      { text: "เงินรับ: "+cash  , margin: [0, 0, 0, 0] },  
      { text: "เงินทอน: "+change , margin: [0, 0, 0, 0]},  

      { text: "ขอบคุณที่อุดหนุน 🙏", alignment: "center", style: "footer" },
      { text: "โทร: 02-123-4567", alignment: "center" },
    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
      },
      footer: {
        fontSize: 10,
        margin: [0, 10, 0, 0],
      },
    },
    defaultStyle: {
      font: "THSarabunNew",
    },
  };

  // โหลดฟอนต์ภาษาไทย (ถ้าจำเป็น)
  pdfMake.createPdf(docDefinition).open(); // หรือ .download('receipt.pdf')
};
