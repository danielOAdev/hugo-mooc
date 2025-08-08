import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'node:path';
import json2toml from 'json2toml';

// Load template
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

// Regex to find content between +++
const regex = /\+\+\+[\s\S]*?\+\+\+/;

let count = 0;

data.forEach(entry => {
    const tomlString = json2toml(entry, {
        indent: 4,
        newlineAfterSection: true
    });
    const outputPath = path.join(process.env.INIT_CWD, 'content', entry.filename);
    
    if (fs.existsSync(outputPath)) {
        let existingContent = fs.readFileSync(outputPath, 'utf8');
        const replacement = `+++\n${tomlString}\n+++`;
        
        if (regex.test(existingContent)) {
            if (regex.exec(existingContent)[0] === replacement) {
                return;
            }
            existingContent = existingContent.replace(regex, replacement);
            console.log(`Atualizado FM de ${outputPath}`);
        } else {
            existingContent = `${replacement}\n${existingContent}`;
            console.log(`Adicionado FM de ${outputPath}`);
        }

        fs.writeFileSync(outputPath, existingContent);
        count++;
    } else {
        // Create the directory recursively if it doesn't exist
        try {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            console.log(`Directory '${path.dirname(outputPath)}' created successfully.`);
        } catch (err) {
            console.error(`Error creating directory: ${err.message}`);
            // Handle the error appropriately, e.g., exit or throw
            process.exit(1);
        }
        fs.writeFileSync(outputPath, `+++\n${tomlString}\n+++`);
        console.log(`Created ${outputPath}`);
        count++;
    }
});

console.log(`------\nFinalizado com ${count} mudanças.`);
