'use client';
import { useState } from 'react';
import { importFiles } from '../lib/api';

export function useImport() {
  const [importing, setImporting] = useState(false);
  const importFilesHandler = async (files: FileList | null) => {
    if (!files) return;
    setImporting(true);
    try {
      await importFiles(files);
    } finally {
      setImporting(false);
    }
  };
  return { importing, importFiles: importFilesHandler };
}
