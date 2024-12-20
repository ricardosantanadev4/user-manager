import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../../../shared/models/usuario.interface';

@Component({
  selector: 'app-detalhe-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './detalhe-usuario.component.html',
  styleUrl: './detalhe-usuario.component.scss'
})
export class DetalheUsuarioComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    const usuarioResolver: IUsuario = this.route.snapshot.data['usuarioResolver']
    this.initForm(usuarioResolver);
  }

  initForm(usuarioResolver: IUsuario) {
    this.form = this.formBuilder.group({
      id: [usuarioResolver?.id],
      nome: [usuarioResolver?.nome, Validators.required],
      email: [usuarioResolver?.email, [Validators.required, Validators.email]],
      telefone: [usuarioResolver?.telefone, [Validators.required, , Validators.minLength(11),
      Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
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
