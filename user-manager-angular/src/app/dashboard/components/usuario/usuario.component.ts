import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from '../../../shared/models/usuario.interface';
import { UsuarioService } from '../../../shared/services/usuario.service';
// import { IServico } from '../../../shared/models/servicos.interface';
// import { RelatorioService } from '../../../shared/services/relatorio.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  filter: string = '';
  maxPageButtons = 10;
  currentPage: number = 1;
  totalPages!: number;
  totalElements!: number;
  itemsPerPage: number = 10; // Itens por página
  sortedColumn: string = ''; // Coluna atualmente ordenada
  sortDirection: 'asc' | 'desc' = 'asc'; // Direção da ordenação
  itemsPerPageOptions: number[] = [5, 10, 15, 20]; // Opções para o seletor
  position: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  data: IUsuario[] = [];

  constructor(private usurioService: UsuarioService, private router: Router,
    private route: ActivatedRoute) {
    this.listarTodosUsuariosNoConsole();
  }

  listarTodosUsuariosNoConsole() {
    this.usurioService.listarTodosOsUsuarios(this.currentPage - 1, this.itemsPerPage).subscribe(r => {
      if (r.body) {
        this.data = r.body.usuarios;
        this.totalPages = r.body.totalPages;
        this.totalElements = r.body.totalElements;
      }
    });
  }

  applyFilter() {
    return this.data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(this.filter.toLowerCase())
      )
    );
  }

  sort(property: keyof IUsuario) {
    // Alterna entre a direção de ordenação
    this.sortDirection = this.sortedColumn === property && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortedColumn = property;
    this.data.sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];
      // Comparação baseada na direção da ordenação
      if (this.sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }

  navigateTo(route: string, usuarioId?: number) {
    if (this.router && usuarioId) {
      this.router.navigate([route, usuarioId], { relativeTo: this.route });
    } else {
      this.router.navigate([route], { relativeTo: this.route });
    }
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.listarTodosUsuariosNoConsole();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.listarTodosUsuariosNoConsole();
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages;
    const visiblePages = [];
    let startPage = Math.max(1, this.currentPage - 5); // Mantém o botão selecionado na posição 6
    let endPage = Math.min(totalPages, startPage + this.maxPageButtons - 1);
    // Se não houver 10 páginas à frente do currentPage, ajuste para mostrar até 10 botões
    if (endPage - startPage < this.maxPageButtons - 1) {
      startPage = Math.max(1, endPage - this.maxPageButtons + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  }

  goToPage(page: number) {
    this.currentPage = page; // Define a página atual com base no número clicado
    this.listarTodosUsuariosNoConsole();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.listarTodosUsuariosNoConsole();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.listarTodosUsuariosNoConsole();
  }

  onItemsPerPageChange() {
    this.currentPage = 1; // Reiniciar para a primeira página ao alterar os itens por página
    this.itemsPerPage = Number(this.itemsPerPage); // Garante que seja um número
    this.listarTodosUsuariosNoConsole();
  }

  baixarRelatorio(formato: string) {
    // this.relatorioService.baixarRelatorio(formato).subscribe(response => {
    // const blob = response.body; // Acessa o corpo da resposta, que é o Blob
    // if (blob) {
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = `relatorio.${formato}`;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // }
    // });
  }
}
