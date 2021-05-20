import React from 'react';
import { useRouter, useContext } from "next/router";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { FplContext } from "../../context/Context";

const createFpl = async (values) => {
    



    const { setPdf, setCallsign, setBlob, setBytes, setValues } = useContext(FplContext);
    const router = useRouter();
    const existingPdfBytes = await fetch("/plan.pdf").then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();
    console.log(width);
    console.log(height);

    firstPage.drawText(values.Matricula.toUpperCase(), {
      x: 182,
      y: 589,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.reglas, {
      x: 338,
      y: 589,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.tipo, {
      x: 462,
      y: 590,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.numero.toString(), {
      x: 120,
      y: 543,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.tipoACFT.toUpperCase(), {
      x: 175,
      y: 543,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.estela, {
      x: 318,
      y: 544,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.equipo.toUpperCase(), {
      x: 422,
      y: 544,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.salida.toUpperCase(), {
      x: 208,
      y: 503,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.hora, {
      x: 355,
      y: 503,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.velocidad.toUpperCase(), {
      x: 90,
      y: 461,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.nivel.toUpperCase(), {
      x: 190,
      y: 460,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    //290 comienza el primer renglon de ruta
    //520 limite x del renglon de ruta del primer renglon
    //545 limite x de los renglones restantes
    //485 limite ultimo renglon x
    //72 comienzan del segundo al ultimo

    //459 1er renglon en y
    //449 2do renglon en y
    //439 3er renglon y
    //429 4to
    let limite = 520;
    let comienzo = 290;
    let renglon = 459;
    let actual = 1;

    if (values.ruta.length > 48) {
      const primer = values.ruta.split(" ");
      /*firstPage.drawText('X', {
        x: 70,
        y: 419,
        size: 8,
        font: helveticaFont,
        color: rgb(0,0,0),
      });  */
      let x = comienzo;
      let y = renglon;
      primer.forEach((element) => {
        if (comienzo >= limite) {
          actual++;
          renglon = renglon - 10;
          comienzo = 72;
        }
        firstPage.drawText(element.toUpperCase(), {
          x: comienzo,
          y: renglon,
          size: 8,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        comienzo = comienzo + element.length * 5 + 5;
      });
    } else {
      firstPage.drawText(values.ruta.toUpperCase(), {
        x: 290,
        y: 459,
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    firstPage.drawText(values.destino.toUpperCase(), {
      x: 130,
      y: 382,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.eet, {
      x: 237,
      y: 382,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(values.alternativa1.toUpperCase(), {
      x: 340,
      y: 382,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    if (values.alternativa2 !== null) {
      firstPage.drawText(values.alternativa2.toUpperCase(), {
        x: 441,
        y: 382,
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    //290 comienza el primer renglon de ruta
    //520 limite x del renglon de ruta del primer renglon
    //545 limite x de los renglones restantes
    //485 limite ultimo renglon x
    //72 comienzan del segundo al ultimo

    //459 1er renglon en y
    //449 2do renglon en y
    //439 3er renglon y
    //429 4to
    limite = 520;
    comienzo = 90;
    renglon = 338;
    actual = 1;

    if (values.otros.length > 65) {
      const primer = values.otros.split(" ");

      let x = comienzo;
      let y = renglon;
      primer.forEach((element) => {
        if (comienzo >= limite) {
          actual++;
          renglon = renglon - 10;
          comienzo = 72;
          if (actual > 2) {
            limite = 490;
          }
        }
        firstPage.drawText(element.toUpperCase(), {
          x: comienzo,
          y: renglon,
          size: 8,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        comienzo = comienzo + element.length * 5 + 5;
      });
    } else {
      firstPage.drawText(values.otros.toUpperCase(), {
        x: 90,
        y: 338,
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    /* firstPage.drawText(values.otros.toUpperCase(), {
      x: 90,
      y: 338,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    }); */
    firstPage.drawText(values.autonomia, {
      x: 130,
      y: 247,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    if (values.sob.toUpperCase() === "TBN") {
      firstPage.drawText(values.sob.toUpperCase(), {
        x: 245,
        y: 247,
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    } else {
      if (values.sob.valueOf() < 10) {
        if (values.sob.length > 1) {
          firstPage.drawText(values.sob, {
            x: 267,
            y: 247,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        } else {
          firstPage.drawText(values.sob, {
            x: 277,
            y: 247,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
      } else if (values.sob.valueOf() >= 10 && values.sob.valueOf() <= 99) {
        firstPage.drawText(values.sob, {
          x: 267,
          y: 247,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      } else if (values.sob.valueOf() > 99) {
        firstPage.drawText(values.sob, {
          x: 255,
          y: 247,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
    }
    /* firstPage.drawText(values.sob, {
      x: 235,
      y: 247,
      size: 11,
      font: helveticaFont,
      color: rgb(0,0,0),
    }); */

    if (!values.radio.includes("U")) {
      firstPage.drawText("X", {
        x: 432,
        y: 242,
        size: 16,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }
    if (!values.radio.includes("V")) {
      firstPage.drawText("X", {
        x: 460,
        y: 242,
        size: 16,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }
    if (!values.radio.includes("E")) {
      firstPage.drawText("X", {
        x: 494,
        y: 242,
        size: 16,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }
    if (values.supervivencia === null) {
      firstPage.drawText("X", {
        x: 128,
        y: 209,
        size: 16,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    if (values.supervivencia !== null) {
      if (!values.supervivencia.includes("P")) {
        firstPage.drawText("X", {
          x: 160,
          y: 209,
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
      if (!values.supervivencia.includes("D")) {
        firstPage.drawText("X", {
          x: 200,
          y: 209,
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }

      if (!values.supervivencia.includes("M")) {
        firstPage.drawText("X", {
          x: 237,
          y: 209,
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
      if (!values.supervivencia.includes("J")) {
        firstPage.drawText("X", {
          x: 285,
          y: 209,
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
    }

    if (values.chalecos === null) {
      firstPage.drawText("X", {
        x: 333,
        y: 208,
        size: 16,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    if (values.chalecos !== null) {
      if (!values.chalecos.includes("L")) {
        firstPage.drawText("X", {
          x: 370,
          y: 209,
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
      if (!values.chalecos.includes("F")) {
        firstPage.drawText("X", {
          x: 408,
          y: 209,
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
      if (!values.chalecos.includes("U")) {
        firstPage.drawText("X", {
          x: 447,
          y: 209,
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
      if (!values.chalecos.includes("V")) {
        firstPage.drawText("X", {
          x: 482,
          y: 209,
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
    }

    if (values.botes === null) {
      firstPage.drawText("X", {
        x: 93,
        y: 174,
        size: 16,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      firstPage.drawText("X", {
        x: 304,
        y: 174,
        size: 16,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    } else {
      if (values.botes.valueOf() < 10) {
        if (values.botes.length > 1) {
          firstPage.drawText(values.botes, {
            x: 140,
            y: 179,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        } else {
          firstPage.drawText(values.botes, {
            x: 155,
            y: 179,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
      } else {
        firstPage.drawText(values.botes, {
          x: 140,
          y: 179,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
      values.capacidad = "22";
      if (values.capacidad.valueOf() < 10) {
        if (values.capacidad.length > 1) {
          firstPage.drawText(values.capacidad, {
            x: 241,
            y: 179,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        } else {
          firstPage.drawText(values.capacidad, {
            x: 250,
            y: 179,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
      } else {
        firstPage.drawText(values.capacidad, {
          x: 241,
          y: 179,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }

      firstPage.drawText(values.colorBotes.toUpperCase(), {
        x: 345,
        y: 178,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }
    firstPage.drawText(values.colorACFT.toUpperCase(), {
      x: 150,
      y: 151,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    if (values.remarks) {
      firstPage.drawText(values.remarks.toUpperCase(), {
        x: 150,
        y: 123,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }
    firstPage.drawText(values.pilot.toUpperCase(), {
      x: 150,
      y: 99,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    const pngImage = await pdfDoc.embedPng(values.firma);
    firstPage.drawImage(pngImage, {
      x: 375,
      y: 50,
      width: 50,
      height: 50,
    });

    const pdfBytes = await pdfDoc.save();
    const base64String = await pdfDoc.saveAsBase64();

    const base64DataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    bytes = new Uint8Array(pdfBytes);
    let blob = new Blob([bytes], { type: "application/pdf" });
    docUrl = URL.createObjectURL(blob);

   
    setPdf(bytes);
    setBlob(docUrl);
    setBytes(base64String);

    setCallsign(values.Matricula);
    console.log(docUrl);
    console.log(bytes);
    console.log(window.innerWidth);
    router.push("/pdf");

    //download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");

    /* const docUrl = URL.createObjectURL(
      new Blob(pdfBytes, { type: "application/pdf" })
    );
    setPdfInfo(docUrl); */
  };

 export default createFpl;
