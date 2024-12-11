package com.ricardosantana.spring.usermanager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ricardosantana.spring.usermanager.dtos.UsuarioDTO;
import com.ricardosantana.spring.usermanager.dtos.UsuarioPageDTO;
import com.ricardosantana.spring.usermanager.services.UsuarioService;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/criar")
    public ResponseEntity<UsuarioDTO> criarUsuario(@RequestBody UsuarioDTO usuarioDto) {
        UsuarioDTO body = this.usuarioService.criarUsuario(usuarioDto);
        return new ResponseEntity<UsuarioDTO>(body, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<UsuarioPageDTO> listarUsuariosPaginados(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        UsuarioPageDTO usuarioPageDTO = this.usuarioService.listarUsuariosPaginados(page, size);
        return new ResponseEntity<UsuarioPageDTO>(usuarioPageDTO, HttpStatus.OK);
    }
}
