package com.demo.demo.controllers;

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

    @PostMapping("/new") //crear nuevo posteo
    public ResponseEntity<?> newPost(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PostRequestDto dto ){
        try{
            //recupero el usuario a travez del username en el jwt "userDetails

        UserEntity userEntity = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("No se encontró usuario"));

            //grabo el posteo teniendo el usuarioo y el dto de post
        postService.newPost(userEntity,dto);

        return ResponseEntity.status(200).body("New post"+ dto);
        }
        catch (Exception e){
            return ResponseEntity.status(400).body("Error in value " + e.getMessage()) ;
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

    @GetMapping("/all")
    public ResponseEntity<?> getAllPosts() {
        try {
            // Recuperar todos los posts
            List<PostEntity> posts = postRepository.findAll();

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
