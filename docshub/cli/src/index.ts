#!/usr/bin/env node

import * as clack from '@clack/prompts';
import gradient from 'gradient-string';
import { format } from 'date-fns';
import { resolve } from 'path';
import { existsSync } from 'fs';

// 📦 Utils:
import { docshubColors, docshubStepColors } from './utils/docshub';
import { generateDocument } from './utils/generateDocument';

// ⚙️ Settings:
const introMessage = '📚 Bienvenido a Docshub';
const docsHubGradient = gradient(Object.values(docshubColors));
const docsHubStep = gradient(Object.values(docshubStepColors));
const endMessage = '🚀 Documento creado correctamente.';
const cancelMessage = '⛔ Operación cancelada.';

// Para deploy con Docker
//const documentRoute = '../../app/src/content/docs';
// Para deploy con Vercel
const documentRoute = '../../docshub/src/content/docs';

// 💎 CLI:
async function main() {
  clack.intro(docsHubGradient(introMessage));

  // Nombre del fichero:
  const fileName = (await clack.text({
    message: '📄 Nombre del fichero:',
    placeholder: 'Ejemplo: integracion-sentry',
    validate(value) {
      if (value.length === 0) return 'El nombre del fichero es obligatorio.';
      if (/[^a-zA-Z0-9-]/.test(value)) return 'Solo se permiten letras, números y guiones. No se permiten caracteres especiales ni espacios.';

      const absoluteFilePath = resolve(documentRoute, `${value}.mdx`);
      if (existsSync(absoluteFilePath)) {
        return 'Este nombre de fichero ya existe.';
      }
    },
  })) as string;

  if (clack.isCancel(fileName)) {
    clack.cancel(cancelMessage);
    process.exit(0);
  }

  // Título del documento:
  const documentTitle = (await clack.text({
    message: '🤔 Título del documento:',
    placeholder: 'Integración de Sentry en Angular',
    validate(value) {
      if (value.length === 0) return '⚠️ El título del documento es obligatorio.';
    },
  })) as string;

  if (clack.isCancel(documentTitle)) {
    clack.cancel(cancelMessage);
    process.exit(0);
  }

  // Descripción:
  const documentDescription = (await clack.text({
    message: '✍️ Descripción:',
    validate(value) {
      if (value.length === 0) return '⚠️ La descripción es obligatoria.';
    },
  })) as string;

  if (clack.isCancel(documentDescription)) {
    clack.cancel(cancelMessage);
    process.exit(0);
  }

  // Descripción:
  const documentSidebarTitle = (await clack.text({
    message: '✨ Título para el menú:',
    placeholder: 'Angular',
    validate(value) {
      if (value.length >= 25) return '⚠️ El número de caracteres máximo es de 25';
      if (value.length === 0) return '⚠️ El título del menú es obligatorio';
    },
  })) as string;

  if (clack.isCancel(documentDescription)) {
    clack.cancel(cancelMessage);
    process.exit(0);
  }

  // Categoría:
  const documentCategory = (await clack.text({
    message: '📦 Categoría:',
    placeholder: 'Sentry',
    validate(value) {
      if (value.length === 0) return '⚠️ La categoría es obligatoria.';
      if (/\s/.test(value)) return '⚠️ Solo se permite una palabra.';
    },
  })) as string;

  if (clack.isCancel(documentCategory)) {
    clack.cancel(cancelMessage);
    process.exit(0);
  }

  // Fecha de publicación:
  const documentPublishDate = (await clack.text({
    message: '📅 Fecha de publicación:',
    placeholder: 'YYYY-MM-DD',
    initialValue: new Date().toISOString().split('T')[0],
    validate(value) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return '⚠️ El formato de la fecha debe ser YYYY-MM-DD.';
      }
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return '⚠️ Formato de fecha inválido.';
      }
    },
  })) as string;

  if (clack.isCancel(documentPublishDate)) {
    clack.cancel(cancelMessage);
    process.exit(0);
  }

  clack.log.step('🔎 Resumen:');

  // Resumen del documento:
  console.table([
    ['Título', documentTitle],
    ['Descripción', documentDescription],
    ['Categoría', documentCategory],
    ['Fecha de publicación', documentPublishDate],
  ]);

  const shouldContinue = await clack.confirm({
    message: '🛠️ ¿Crear documento?',
  });

  if (clack.isCancel(shouldContinue)) {
    clack.cancel(cancelMessage);
    process.exit(0);
  }

  const convertPublishDate = new Date(documentPublishDate);
  const formattedPublishDate = format(convertPublishDate, 'yyyy-MM-dd');

  await generateDocument(documentRoute, fileName, {
    title: documentTitle,
    description: documentDescription,
    category: documentCategory,
    publishDate: formattedPublishDate,
    sidebarTitle: documentSidebarTitle,
  });

  const absoluteFilePath = resolve(documentRoute, `${fileName}.mdx`);

  clack.log.step(`📂 ${docsHubStep('Ubicación del fichero')}: ${absoluteFilePath}`);
  // clack.log.step(
  //   `🔒 ${docsHubStep('Proteger contenido')}: Para proteger contenido dentro del documento, envuelve el contenido usando <Protect> Contenido </Protect>`,
  // );
  clack.log.step(
    `🖼️ ${docsHubStep('Uso de imágenes')}: Puedes utilizar imágenes en tu documentación. Para ello almacénalas en /public/images/${documentCategory.toLowerCase()}.`,
  );
  clack.outro(docsHubGradient(endMessage));
}

// 🚀 Main:
main();
