package com.demo.demo.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryServiceImpl {

    private final Cloudinary cloudinary;

    public CloudinaryServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public String upload(MultipartFile file, String publicId) throws Exception {
      try {
          if (file.isEmpty()) {
              throw new IllegalArgumentException("El archivo está vacío");
          }

          Map<String, Object> params1 = ObjectUtils.asMap(
                  "use_filename", true,
                  "unique_filename", false,
                  "overwrite", true,
                  "public_id", publicId,
                  "transformation",
                  new Transformation<>().width(250).height(250).gravity("faces").crop("fill").radius("max"));

          Map<String, Object> resp = cloudinary.uploader().upload(file.getBytes(), params1);

          String secureUrl = (String) resp.get("secure_url");
          return secureUrl;
      }catch (Exception e) {
          throw new Exception(e.getMessage());
      }
    }

    @SuppressWarnings("rawtypes")
    public Map delete(String publicId) throws IOException {
        Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        return result;
    }
}