'use client';
import { useImport } from '../hooks/useImport';

export default function ImportPanel() {
  const { importing, importFiles } = useImport();
  return (
    <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center h-64">
      <input type="file" multiple className="mb-4" onChange={(e) => importFiles(e.target.files)} />
      {importing && <span className="text-muted-foreground">Importing...</span>}
    </div>
  );
}
