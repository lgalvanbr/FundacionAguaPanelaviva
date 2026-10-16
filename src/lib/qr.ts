import QRCode from "qrcode";

// Genera un QR como SVG en el servidor (síncrono, sin JS en el navegador).
export function qrSvg(text: string, { dark = "#044833", light = "#ffffff", margin = 2 } = {}) {
  const { modules } = QRCode.create(text, { errorCorrectionLevel: "M" });
  const size = modules.size;
  const total = size + margin * 2;
  let path = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (modules.get(x, y)) path += `M${x + margin} ${y + margin}h1v1h-1z`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges" width="100%" height="100%"><rect width="${total}" height="${total}" fill="${light}"/><path d="${path}" fill="${dark}"/></svg>`;
}
