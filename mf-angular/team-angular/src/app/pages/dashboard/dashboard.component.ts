import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  saldoTotal = 250000; // Simulación de saldo total

  transacciones = [
    { descripcion: 'Pago de Servicios', monto: -50000 },
    { descripcion: 'Depósito Nómina', monto: 200000 },
    { descripcion: 'Compra en Tienda', monto: -30000 }
  ];

  cuentas = [
    { id: 1, nombre: 'Cuenta Ahorros', saldo: 150000 },
    { id: 2, nombre: 'Cuenta Corriente', saldo: 100000 }
  ];

  cuentaSeleccionada: number | null = null;

  getSaldoCuenta(id: number) {
    const cuenta = this.cuentas.find(c => c.id === id);
    return cuenta ? cuenta.saldo : 0;
  }

}
