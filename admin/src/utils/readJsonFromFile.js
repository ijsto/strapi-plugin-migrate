export default async function readJsonFromFile(file, cb) {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    cb(JSON.parse(reader.result), file.name);
  });
  reader.readAsText(file);
}
