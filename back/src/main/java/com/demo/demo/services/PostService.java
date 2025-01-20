package com.demo.demo.services;

import com.demo.demo.dtos.request.PostRequestDto;
import com.demo.demo.dtos.request.PostUpdateDto;
import com.demo.demo.entities.PostEntity;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.PostRepository;
import com.demo.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public void newPost(UserEntity userEntity, PostRequestDto postRequestDto){


        PostEntity postEntity = PostEntity.builder()
                .userEntity(userEntity)
                .title(postRequestDto.title())
                .content(postRequestDto.Content())
                .creationDate(postRequestDto.creationDate())
                .category(postRequestDto.category())
                .build();

        postRepository.save(postEntity);

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
        if (updateDto.getContent() != null) {
            post.setContent(updateDto.getContent());
        }
        if (updateDto.getCategory() != null) {
            post.setCategory(updateDto.getCategory());
        }

        postRepository.save(post);
    }

}
