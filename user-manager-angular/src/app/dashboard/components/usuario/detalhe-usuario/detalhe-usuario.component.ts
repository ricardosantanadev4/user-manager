import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalhe-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './detalhe-usuario.component.html',
  styleUrl: './detalhe-usuario.component.scss'
})
export class DetalheUsuarioComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    })
  }

  novoRegistro() {
    alert('Novo registro iniciado!');
  }

  salvar() {
    if (this.form.valid) {
      console.log('Dados salvos:', this.form.value);
      alert('Registro salvo com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos antes de salvar.');
    }
  }
}