/**
 * Archivos descargables de cada premio. Viven en private/cumpleanos (fuera
 * de public/) y solo los sirve app/cumpleanos/premio/[numero]/route.ts a
 * quien tenga sesión y haya llegado a esa pregunta.
 */
export interface ArchivoPremio {
  /** PDF que se descarga. */
  pdf: string;
  /** Imagen de vista previa. */
  vista: string;
  /** Nombre con el que se guarda la descarga. */
  nombreDescarga: string;
}

export const ARCHIVOS_PREMIO: Record<number, ArchivoPremio> = {
  5: {
    pdf: "cupon-masaje.pdf",
    vista: "cupon-masaje.jpg",
    nombreDescarga: "Cupon de masaje.pdf",
  },
  10: {
    pdf: "entrada-circo.pdf",
    vista: "entrada-circo.jpg",
    nombreDescarga: "Entrada de circo.pdf",
  },
};
