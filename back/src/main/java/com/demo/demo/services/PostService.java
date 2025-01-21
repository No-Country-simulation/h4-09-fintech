package com.demo.demo.services;

import com.demo.demo.dtos.request.PostRequestDto;
import com.demo.demo.dtos.request.PostUpdateDto;
import com.demo.demo.entities.PostEntity;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.PostRepository;
import com.demo.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;


    public PostEntity newPost(UserEntity userEntity, PostRequestDto postRequestDto){


        PostEntity postEntity = PostEntity.builder()
                .userEntity(userEntity)
                .title(postRequestDto.title())

                .creationDate(postRequestDto.creationDate())
                .category(postRequestDto.category())
                .subtitle(postRequestDto.subtitle())  // Nuevo campo
                .text(postRequestDto.text())          // Nuevo campo
                .creationUser(LocalDateTime.parse(postRequestDto.creationUser()))  // Nuevo campo
                .build();

        return postRepository.save(postEntity);

    }

    public void deletePost(UserEntity userEntity, Long postId) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post no encontrado"));

        // Verificar si el usuario es el dueño del post
        if (!post.getUserEntity().getUserId().equals(userEntity.getUserId())) {
            throw new IllegalArgumentException("No tienes permiso para eliminar este post.");
        }

        postRepository.delete(post);
    }
    public void updatePost(UserEntity userEntity, Long postId, PostUpdateDto updateDto) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post no encontrado"));

        // Verificar si el usuario es el dueño del post
        if (!post.getUserEntity().getUserId().equals(userEntity.getUserId())) {
            throw new IllegalArgumentException("No tienes permiso para actualizar este post.");
        }


        // Actualizar solo los campos no nulos
        if (updateDto.getTitle() != null) {
            post.setTitle(updateDto.getTitle());
        }
        if (updateDto.getSubtitle() != null) {  // Nuevo campo
            post.setSubtitle(updateDto.getSubtitle());
        }
        if (updateDto.getText() != null) {  // Nuevo campo
            post.setText(updateDto.getText());
        }
        if (updateDto.getCreationUser() != null) {  // Nuevo campo
            post.setCreationUser(LocalDateTime.parse(updateDto.getCreationUser()));
        }

        if (updateDto.getCategory() != null) {
            post.setCategory(updateDto.getCategory());
        }

        postRepository.save(post);
    }

}
