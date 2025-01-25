package com.demo.demo.repositories;

import com.demo.demo.entities.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity,Long> {
    @Query("SELECT p FROM PostEntity p WHERE p.category = :category")
    List<PostEntity> findPostsByCategory(@Param("category") String category);
}
