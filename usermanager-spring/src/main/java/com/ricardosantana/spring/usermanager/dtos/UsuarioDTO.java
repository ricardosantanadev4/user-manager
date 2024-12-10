package com.ricardosantana.spring.usermanager.dtos;

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
}
