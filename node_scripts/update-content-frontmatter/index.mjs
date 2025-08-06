import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'node:path';
import handlebars from 'handlebars';

// Load template
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templateSource = fs.readFileSync(path.join(__dirname, 'frontmatter.hbs'), 'utf8');
const template = handlebars.compile(templateSource);

// Load data
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

// Regex to find content between +++
const regex = /\+\+\+[\s\S]*?\+\+\+/;

data.forEach(entry => {
    const outputPath = path.join(process.env.INIT_CWD, 'content', entry.filename);
    const newContent = template(entry);
    
    if (fs.existsSync(outputPath)) {
        let existingContent = fs.readFileSync(outputPath, 'utf8');
        const replacement = `+++\n${newContent}\n+++`;
        
        if (regex.test(existingContent)) {
            existingContent = existingContent.replace(regex, replacement);
        } else {
            existingContent += `\n${replacement}`;
        }
        
        fs.writeFileSync(outputPath, existingContent);
        console.log(`Updated ${outputPath}`);
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
        fs.writeFileSync(outputPath, `+++\n${newContent}\n+++`);
        console.log(`Created ${outputPath}`);
    }
});
