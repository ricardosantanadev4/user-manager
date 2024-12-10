package com.ricardosantana.spring.usermanager.services;

import org.springframework.stereotype.Service;

import com.ricardosantana.spring.usermanager.dtos.UsuarioDTO;
import com.ricardosantana.spring.usermanager.models.Usuario;
import com.ricardosantana.spring.usermanager.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public UsuarioDTO criarUsuario(UsuarioDTO usuarioDto) {
        Usuario toEntity = new UsuarioDTO().toEntity(usuarioDto);
        Usuario usuario = this.usuarioRepository.save(toEntity);
        UsuarioDTO toDto = new UsuarioDTO().toDTO(usuario);
        return toDto;
    }

}
