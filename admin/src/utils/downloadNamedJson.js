export default function downloadNamedJson(exportFile, exportFileName) {
  const json = exportFile;

  const data = `text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(json)
  )}`;
  const a = document.createElement('a');
  a.href = `data:${data}`;
  a.download = `${exportFileName}-${new Date().toISOString()}.json`;
  a.innerHTML = 'download JSON';

  const container = document.getElementById('download');
  container.appendChild(a);
  a.click();

  a.remove();
}
