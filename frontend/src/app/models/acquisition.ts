export interface Acquisition {
  id: number;
  presupuesto: number;
  unidad: string;
  tipoBienServicio: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
  fechaAdquisicion: string;
  proveedor: string;
  documentacion: string;
  estado: string;
}
