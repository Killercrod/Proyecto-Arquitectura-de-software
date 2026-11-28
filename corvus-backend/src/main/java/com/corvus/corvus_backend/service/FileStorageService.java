package com.corvus.corvus_backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

//  Guarda y borra las imágenes
@Service
public class FileStorageService {

    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);

    private final Path productsDir;

    // @Value lee app.upload-dir de application.properties
    public FileStorageService(@Value("${app.upload-dir}") String uploadDir) throws IOException {
        this.productsDir = Path.of(uploadDir, "products").toAbsolutePath().normalize();
        Files.createDirectories(productsDir); // tu mkdirSync recursive
    }

    /** Guarda las imágenes y devuelve sus URLs. Si una no es válida, no se guarda ninguna. */
    public List<String> storeAll(List<MultipartFile> files) {
        // 1. Validar TODAS antes de escribir nada en disco
        List<String> extensions = files.stream().map(this::detectExtension).toList();

        // 2. Guardar con nombre único (tu crypto.randomUUID)
        List<String> urls = new ArrayList<>();
        try {
            for (int i = 0; i < files.size(); i++) {
                String filename = UUID.randomUUID() + extensions.get(i);
                files.get(i).transferTo(productsDir.resolve(filename));
                urls.add("/uploads/products/" + filename);
            }
        } catch (IOException e) {
            urls.forEach(this::delete); // si falla una, quitamos las ya guardadas
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "No se pudo guardar la imagen");
        }
        return urls;
    }

    /** Borra un archivo a partir de su URL (/uploads/products/x.jpg). Si no existe, no pasa nada. */
    public void delete(String url) {
        String filename = url.substring(url.lastIndexOf('/') + 1);
        try {
            Files.deleteIfExists(productsDir.resolve(filename));
        } catch (IOException e) {
            log.warn("Could not delete file {}", filename, e);
        }
    }

    //  examina primeros bytes del archivo ("firma") para saber qué es de verdad.
    private String detectExtension(MultipartFile file) {
        byte[] h = new byte[12];
        try (InputStream in = file.getInputStream()) {
            if (in.readNBytes(h, 0, 12) < 12) {
                throw invalidImage();
            }
        } catch (IOException e) {
            throw invalidImage();
        }

        // JPEG: FF D8 FF
        if ((h[0] & 0xFF) == 0xFF && (h[1] & 0xFF) == 0xD8 && (h[2] & 0xFF) == 0xFF) {
            return ".jpg";
        }
        // PNG: 89 'P' 'N' 'G'
        if ((h[0] & 0xFF) == 0x89 && h[1] == 'P' && h[2] == 'N' && h[3] == 'G') {
            return ".png";
        }
        // WebP: 'RIFF' .... 'WEBP'
        if (h[0] == 'R' && h[1] == 'I' && h[2] == 'F' && h[3] == 'F'
                && h[8] == 'W' && h[9] == 'E' && h[10] == 'B' && h[11] == 'P') {
            return ".webp";
        }
        throw invalidImage();
    }

    private ResponseStatusException invalidImage() {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Solo se permiten imágenes JPEG, PNG o WebP");
    }
}
