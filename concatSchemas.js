const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
const modelsPath = path.join(__dirname, 'prisma', 'models');
const combinedSchemaPath = path.join(__dirname, 'prisma', 'combined-schema.prisma');

// Read base schema
const baseSchema = fs.readFileSync(schemaPath, 'utf-8');

// Read model files
const modelFiles = fs.readdirSync(modelsPath).filter(file => file.endsWith('.prisma'));
const modelSchemas = modelFiles.map(file => fs.readFileSync(path.join(modelsPath, file), 'utf-8'));

// Combine schemas
const combinedSchema = [baseSchema, ...modelSchemas].join('\n\n');

// Write to combined schema file
fs.writeFileSync(combinedSchemaPath, combinedSchema);

console.log('Schema combined successfully.');
