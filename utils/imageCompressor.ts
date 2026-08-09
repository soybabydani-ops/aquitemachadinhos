/**
 * imageCompressor.ts — AQUI TEM ACHADINHOS v3.5
 * Utilitário de compressão de imagens no cliente, zero dependências.
 * Compatível com browsers modernos via Canvas API.
 *
 * @usage
 *   import { compressImage, CompressOptions } from './utils/imageCompressor'
 *   const blob = await compressImage(file, { maxWidth: 1200, quality: 0.80 })
 */

export interface CompressOptions {
  /** Largura máxima em px (padrão: 1200) */
  maxWidth?: number
  /** Altura máxima em px (padrão: 1200) */
  maxHeight?: number
  /** Qualidade JPEG 0–1 (padrão: 0.80) */
  quality?: number
  /** Qualidade PNG 0–1 (padrão: 0.90) */
  qualityPng?: number
  /** Tamanho mínimo para acionar compressão, em bytes (padrão: 200KB) */
  skipThreshold?: number
}

export interface CompressResult {
  blob: Blob
  originalSize: number
  compressedSize: number
  reductionPercent: number
  dimensions: { width: number; height: number }
  skipped: boolean
}

/**
 * Comprime uma imagem usando Canvas API pura.
 * - Remove EXIF automaticamente (re-draw no canvas)
 * - Injeta fundo branco antes de JPEG (evita transparência preta)
 * - Escala proporcional — nunca aumenta, só reduz
 * - Emite evento DOM `ata:compress` com estatísticas
 */
export async function compressImage(
  file: File | Blob,
  options: CompressOptions = {}
): Promise<CompressResult> {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.80,
    qualityPng = 0.90,
    skipThreshold = 200 * 1024, // 200 KB
  } = options

  const originalSize = file.size
  const mime = file.type || 'image/jpeg'

  // Fast-path: não é imagem ou já está dentro do limite
  if (!mime.startsWith('image/') || originalSize <= skipThreshold) {
    return {
      blob: file,
      originalSize,
      compressedSize: originalSize,
      reductionPercent: 0,
      dimensions: { width: 0, height: 0 },
      skipped: true,
    }
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(url)

      // Calcular dimensões proporcionais
      let { naturalWidth: w, naturalHeight: h } = img
      if (!w) w = img.width
      if (!h) h = img.height

      // Escala proporcional (nunca aumenta)
      if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth }
      if (h > maxHeight) { w = Math.round(w * maxHeight / h); h = maxHeight }

      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h

      const ctx = canvas.getContext('2d')!
      // Fundo branco: evita artefatos de transparência em JPEG
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, w, h)
      ctx.drawImage(img, 0, 0, w, h)

      const isPng = mime === 'image/png'
      const outputMime = isPng ? 'image/png' : 'image/jpeg'
      const outputQuality = isPng ? qualityPng : quality

      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error('Canvas toBlob falhou')); return }

          const result: CompressResult = {
            blob,
            originalSize,
            compressedSize: blob.size,
            reductionPercent: Math.round((1 - blob.size / originalSize) * 100),
            dimensions: { width: w, height: h },
            skipped: false,
          }

          // Evento DOM para feedback visual externo
          try {
            window.dispatchEvent(new CustomEvent('ata:compress', { detail: result }))
          } catch (_) { /* noop */ }

          console.log(
            `[imageCompressor] ${Math.round(originalSize / 1024)}KB → ` +
            `${Math.round(blob.size / 1024)}KB (${w}×${h}) ` +
            `-${result.reductionPercent}%`
          )

          resolve(result)
        },
        outputMime,
        outputQuality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      // Fallback seguro: retorna original sem comprimir
      console.warn('[imageCompressor] Falha ao carregar imagem — usando original')
      resolve({
        blob: file,
        originalSize,
        compressedSize: originalSize,
        reductionPercent: 0,
        dimensions: { width: 0, height: 0 },
        skipped: true,
      })
    }

    img.src = url
  })
}

/**
 * Comprime múltiplas imagens em paralelo com limite de concorrência.
 */
export async function compressMany(
  files: (File | Blob)[],
  options: CompressOptions = {},
  concurrency = 3
): Promise<CompressResult[]> {
  const results: CompressResult[] = []
  for (let i = 0; i < files.length; i += concurrency) {
    const batch = files.slice(i, i + concurrency)
    const batchResults = await Promise.all(batch.map((f) => compressImage(f, options)))
    results.push(...batchResults)
  }
  return results
}

/**
 * Valida se um arquivo é uma imagem aceitável.
 */
export function isValidImage(file: File, maxSizeMB = 10): boolean {
  return (
    file.type.startsWith('image/') &&
    file.size <= maxSizeMB * 1024 * 1024
  )
}
