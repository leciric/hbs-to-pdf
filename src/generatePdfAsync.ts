import { readFileSync } from "fs";
import handlebars from "handlebars";
import pdf from "html-pdf";

interface IGeneratePdfAsyncProps<T> {
  filePath: string;
  data: T
  pdfOptions: pdf.CreateOptions
}

export async function generatePdfAsync<T = Object>({filePath, data, pdfOptions}: IGeneratePdfAsyncProps<T>): Promise<Buffer>{

  const file = readFileSync(filePath).toString();

  const template = handlebars.compile(file)

  const html = template(data)

  const filePromise = new Promise<Buffer>((resolve, reject) => {
    pdf
      .create(html, pdfOptions)
      .toBuffer((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });

  return filePromise;
}