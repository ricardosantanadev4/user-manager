package com.ricardosantana.spring.usermanager.dtos;

import com.ricardosantana.spring.usermanager.models.Usuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UsuarioDTO {
    private Long id;
    private String nome;
    private String email;
    private String telefone;

    public Usuario toEntity(UsuarioDTO usuarioDto) {
        Usuario usuario = new Usuario(usuarioDto.getId(), usuarioDto.getNome(), usuarioDto.getEmail(),
                usuarioDto.getTelefone());
        return usuario;
    }

    public UsuarioDTO toDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.telefone = usuario.getTelefone();
        return new UsuarioDTO(id, nome, email, telefone);
    }
}
