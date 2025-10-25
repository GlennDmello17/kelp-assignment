function unflattenObject(obj) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split("."); // Split by dots
    let current = result;

    keys.forEach((part, index) => {
      if (index === keys.length - 1) {
        current[part] = value;
      } else {
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    });
  }

  return result;
}

export default function parseCSV(csvContent) {
  const lines = csvContent.split("\n").filter(Boolean);
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    rows.push(row);
  }

  // Transform each flat object into nested object
  const transformed = rows.map(unflattenObject);
  return transformed;
}