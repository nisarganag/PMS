package com.major.pmsbackend.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;

import com.major.pmsbackend.entity.Publications;
import com.major.pmsbackend.repository.PublicationRepository;
import com.major.pmsbackend.utils.DataUtils;

@Service
public class PdfService {

    @Autowired
    private PublicationRepository publicationRepository;

    public byte[] getPdfBytesById(Long id) {
        if(id == null) {
            throw new IllegalArgumentException("Publication ID cannot be null");
        }
        Optional<Publications> optionalPublication = publicationRepository.findById(id);
        if (optionalPublication.isPresent()) {
            Publications publication = optionalPublication.get();
            return publication.getData();
        }
        return null; // Handle error or return default PDF bytes
    }

    public byte[] extractFirstPage(byte[] pdfBytes) {
        byte[] decompressedBytes = DataUtils.decompressData(pdfBytes);
    if (decompressedBytes == null) {
        // Handle decompression failure
        return null;
    }

    try (PDDocument document = Loader.loadPDF(decompressedBytes)) {
        PDFRenderer renderer = new PDFRenderer(document);
        BufferedImage image = renderer.renderImageWithDPI(0, 300); // DPI can be adjusted
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        javax.imageio.ImageIO.write(image, "png", baos);
        return baos.toByteArray();
    } catch (IOException e) {
        e.printStackTrace();
        return null; // Handle error or return default first page
    }
    }
}
