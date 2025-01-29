package com.demo.demo.controllers;

import com.demo.demo.config.mappers.PostMapper;
import com.demo.demo.dtos.post.PostResposeDTO;
import com.demo.demo.dtos.request.PostRequestDto;
import com.demo.demo.dtos.request.PostUpdateDto;
import com.demo.demo.entities.PostEntity;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.NotFoundException;

import com.demo.demo.repositories.PostRepository;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostController {

    private final UserRepository userRepository;
    private final PostService postService;
    private final PostRepository postRepository;
    private final PostMapper postMapper;

    @PostMapping("/new")
    public ResponseEntity<?> newPost(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody PostRequestDto dto
    ) {
        try {
            UserEntity userEntity = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new NotFoundException("No se encontró usuario"));

            PostEntity postEntity = postService.newPost(userEntity, dto);
            return ResponseEntity.status(200).body("Nuevo post creado con éxito. ID: " + postEntity.getId());
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error in value: " + e.getMessage());
        }
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPost(@PathVariable Long postId) {
        try {
            // Recuperar el post por su ID
            PostEntity post = postRepository.findById(postId)
                    .orElseThrow(() -> new NotFoundException("Post no encontrado"));

            return ResponseEntity.status(200).body(post);
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al obtener el post: " + e.getMessage());
        }
    }
    @GetMapping("/postcategory/{category}") // Importante: agregar {category} al PathVariable
    public ResponseEntity<?> getPostByCategory(@PathVariable String category) {
        try {
            List<PostEntity> posts = postRepository.findPostsByCategory(category);

            if (posts.isEmpty()) {
                return ResponseEntity.status(404).body("No hay posts disponibles para la categoría: " + category);
            }

            return ResponseEntity.status(200).body(posts); // Devuelve la lista de posts
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener los posts: " + e.getMessage());
        }
    }


    @GetMapping("/all")
    public ResponseEntity<?> getAllPosts() {
        try {
            // Recuperar todos los posts
            List<PostEntity> postsEntity = postRepository.findAll();
            List<PostResposeDTO> posts = postMapper.toPostResposeDTOList(postsEntity);
            if (posts.isEmpty()) {
                return ResponseEntity.status(404).body("No hay posts disponibles.");
            }

            return ResponseEntity.status(200).body(posts);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al obtener los posts: " + e.getMessage());
        }
    }

    @DeleteMapping ("/delete/{postId}")
    public ResponseEntity<?> deletePost(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long postId) {
        try {
            // Recupero el usuario a través del username en el JWT
            UserEntity userEntity = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new NotFoundException("No se encontró usuario"));

            // Intento eliminar el post si pertenece al usuario
            postService.deletePost(userEntity, postId);

            return ResponseEntity.status(200).body("Post eliminado con éxito.");
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al eliminar el post: " + e.getMessage());
        }
    }
    @PatchMapping("/update/{postId}")
    public ResponseEntity<?> updatePost(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long postId,
            @RequestBody PostUpdateDto updateDto) {
        try {
            // Recupero el usuario a través del username en el JWT
            UserEntity userEntity = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new NotFoundException("No se encontró usuario"));

            // Intento actualizar el post si pertenece al usuario
            postService.updatePost(userEntity, postId, updateDto);

            return ResponseEntity.status(200).body("Post actualizado con éxito.");
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al actualizar el post: " + e.getMessage());
        }
    }


}
