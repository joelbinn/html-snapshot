package se.joelabs.html2pdf;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.IBlockElement;
import com.itextpdf.layout.element.IElement;
import com.itextpdf.styledxmlparser.css.media.MediaDeviceDescription;
import com.itextpdf.styledxmlparser.css.media.MediaType;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
public class PdfResource {
  @ResponseBody
  @PostMapping(path = "/convert-html-to-pdf", produces = "text/plain")
  public String convertHtmlToPdf(@RequestBody String html) throws IOException {
    String fileName = UUID.randomUUID().toString() + ".pdf";
    simpleConvert(createHtmlPage(html), "pdfdocs/" + fileName);
    return fileName;
  }

  private String createHtmlPage(@RequestBody String html) {
    return "<html>" +
      "  <head>" +
      "    <style>" +
      "      body { font-family: helvetica; }" +
      "      tr {" +
      "        border-bottom: 1px solid #ddd;" +
      "      }" +
      "      table {" +
      "        border-collapse: collapse;" +
      "        border: 1px solid;" +
      "        page-break-inside: avoid;" +
      "      }" +
      "      .visible-print { display: block; }" +
      "      .hidden-print { display: none; }" +
      "      @page {" +
      "        @top-right {" +
      "          font-family: helvetica;" +
      "          content: counter(page) \" (\" counter(pages) \")\";" +
      "        }" +
      "      }" +
      "    </style>" +
      "  </head>" +
      "  <body>" +
      "    <img src=\"html-to-pdf-conversion/src/main/resources/logo_inera.png\" height=\"10%\" width=\"10%\" style:\"position: absolute; right: 0;\">" +
      html +
      "  </body>" +
      "</html>";
  }

  private void complexConvert(String htmlPage, String fileName) throws IOException {
    List<IElement> elements =
      HtmlConverter.convertToElements(htmlPage);
    PdfDocument pdf = new PdfDocument(new PdfWriter(fileName));
    Document document = new Document(pdf);
    for (IElement element : elements) {
      document.add((IBlockElement) element);
    }
    document.close();
  }

  private void simpleConvert(String htmlPage, String fileName) throws IOException {
    try (FileOutputStream fos = new FileOutputStream(fileName)) {
      ConverterProperties properties = new ConverterProperties();
      MediaDeviceDescription mediaDeviceDescription = new MediaDeviceDescription(MediaType.PRINT);
      properties.setMediaDeviceDescription(mediaDeviceDescription);
      HtmlConverter.convertToPdf(htmlPage, fos, properties);
    }
  }

  @ResponseBody
  @GetMapping(path = "/pdf-document/{filename}", produces = "application/pdf")
  public void fetchPdfDocument(@PathVariable("filename") String filename, HttpServletResponse response) throws IOException {
    try (FileInputStream fis = new FileInputStream("pdfdocs/" + filename)) {
      // Set the content type and attachment header.
      //response.addHeader("Content-disposition", "attachment;filename=" + filename);
      response.setContentType("application/pdf");

      // Copy the stream to the response's output stream.
      IOUtils.copy(fis, response.getOutputStream());
      response.flushBuffer();
    }
  }
}
