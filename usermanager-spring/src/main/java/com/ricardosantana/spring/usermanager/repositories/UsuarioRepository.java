package com.ricardosantana.spring.usermanager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ricardosantana.spring.usermanager.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
