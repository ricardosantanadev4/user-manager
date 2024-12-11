package com.ricardosantana.spring.usermanager.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ricardosantana.spring.usermanager.dtos.UsuarioDTO;
import com.ricardosantana.spring.usermanager.dtos.UsuarioPageDTO;
import com.ricardosantana.spring.usermanager.mapper.UsuarioMapper;
import com.ricardosantana.spring.usermanager.models.Usuario;
import com.ricardosantana.spring.usermanager.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    public UsuarioService(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
    }

    public UsuarioDTO criarUsuario(UsuarioDTO usuarioDto) {
        Usuario toEntity = this.usuarioMapper.toEntity(usuarioDto);
        Usuario usuario = this.usuarioRepository.save(toEntity);
        UsuarioDTO toDto = this.usuarioMapper.toDTO(usuario);
        return toDto;
    }

    public UsuarioPageDTO listarUsuariosPaginados(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.ASC, "id");
        Page<Usuario> pageUsuario = this.usuarioRepository.findAll(pageable);
        List<UsuarioDTO> usuariosDto = pageUsuario.get().map(usuario -> this.usuarioMapper
                .toDTO(usuario)).collect(Collectors.toList());
        UsuarioPageDTO usuarioPageDTO = this.usuarioMapper.toPageDTO(usuariosDto, pageUsuario);
        return usuarioPageDTO;
    }
}
