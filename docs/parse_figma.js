import fs from 'fs';

const data = JSON.parse(fs.readFileSync('C:\\Users\\308\\.mcp-figma\\cache\\file_nodes_giv7zNQhUpbiHessc6bbFq_1778557292734.json', 'utf8'));

const colors = new Set();
const fonts = new Set();
const radii = new Set();
const effects = new Set();

function traverse(node) {
    if (!node) return;
    
    // Extract Colors from fills and strokes
    if (node.fills && Array.isArray(node.fills)) {
        node.fills.forEach(fill => {
            if (fill.color) {
                const r = Math.round(fill.color.r * 255);
                const g = Math.round(fill.color.g * 255);
                const b = Math.round(fill.color.b * 255);
                const a = fill.color.a !== undefined ? fill.color.a : 1;
                colors.add(`rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`);
            }
        });
    }
    if (node.strokes && Array.isArray(node.strokes)) {
        node.strokes.forEach(stroke => {
            if (stroke.color) {
                const r = Math.round(stroke.color.r * 255);
                const g = Math.round(stroke.color.g * 255);
                const b = Math.round(stroke.color.b * 255);
                const a = stroke.color.a !== undefined ? stroke.color.a : 1;
                colors.add(`rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`);
            }
        });
    }

    // Extract Typography
    if (node.type === 'TEXT' && node.style) {
        fonts.add(`${node.style.fontFamily} - ${node.style.fontWeight} - ${node.style.fontSize}px - ${node.style.letterSpacing}px`);
    }

    // Extract Border Radius
    if (node.cornerRadius) radii.add(node.cornerRadius);
    if (node.rectangleCornerRadii) {
        radii.add(`TopLeft: ${node.rectangleCornerRadii.RECTANGLE_TOP_LEFT_CORNER_RADIUS}, TopRight: ${node.rectangleCornerRadii.RECTANGLE_TOP_RIGHT_CORNER_RADIUS}, BottomLeft: ${node.rectangleCornerRadii.RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS}, BottomRight: ${node.rectangleCornerRadii.RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS}`);
    }

    // Extract Effects
    if (node.effects && Array.isArray(node.effects)) {
        node.effects.forEach(effect => {
            effects.add(JSON.stringify(effect));
        });
    }

    // Traverse children
    if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse);
    }
}

Object.values(data.nodes).forEach(nodeData => {
    traverse(nodeData.document);
});

console.log("=== COLORS ===");
Array.from(colors).forEach(c => console.log(c));

console.log("\n=== TYPOGRAPHY (Family - Weight - Size - LetterSpacing) ===");
Array.from(fonts).forEach(f => console.log(f));

console.log("\n=== BORDER RADIUS ===");
Array.from(radii).forEach(r => console.log(r));

console.log("\n=== EFFECTS ===");
Array.from(effects).forEach(e => console.log(e));
