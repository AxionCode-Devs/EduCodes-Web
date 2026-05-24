import os

workspace_dir = r"c:\Users\Francoo\Desktop\Proyectos-AxionCode\EduCodes - Pagina"
admin_files = [
    "inicio.css",
    "estudiantes.css",
    "gestcursos.css",
    "reportes.css",
    "configuracion.css"
]

def update_css():
    css_dir = os.path.join(workspace_dir, "css")
    base_file = os.path.join(css_dir, "inicio.css")
    
    with open(base_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Apply modifications to content
    
    # 1. Alias .admin-section with .admin-content
    content = content.replace(".admin-section {", ".admin-section, .admin-content {")
    content = content.replace(".admin-section h1,\n.admin-section h2 {", ".admin-section h1, .admin-section h2, .admin-content h1, .admin-content h2 {")
    content = content.replace(".admin-section h3 {", ".admin-section h3, .admin-content h3 {")
    content = content.replace(".admin-section table {", ".admin-section table, .admin-content table {")
    content = content.replace(".admin-section th {", ".admin-section th, .admin-content th {")
    content = content.replace(".admin-section td {", ".admin-section td, .admin-content td {")
    content = content.replace(".admin-section tr:hover td {", ".admin-section tr:hover td, .admin-content tr:hover td {")
    content = content.replace(".admin-section .admin-logo,\n.admin-section .logo-img {", ".admin-section .admin-logo, .admin-section .logo-img, .admin-content .admin-logo, .admin-content .logo-img {")
    content = content.replace(".admin-section {\n        padding: var(--space-lg) var(--space-sm);\n    }", ".admin-section, .admin-content {\n        padding: var(--space-lg) var(--space-sm);\n    }")
    content = content.replace(".admin-section h1, .admin-section h2 {", ".admin-section h1, .admin-section h2, .admin-content h1, .admin-content h2 {")
    
    # 2. Add .cta-btn alias to .admin-btn
    content = content.replace(".admin-btn {", ".admin-btn, .cta-btn {")
    content = content.replace(".admin-btn:hover {", ".admin-btn:hover, .cta-btn:hover {")
    content = content.replace(".admin-btn.secondary {", ".admin-btn.secondary, .cta-btn.secondary {")
    content = content.replace(".admin-btn.secondary:hover {", ".admin-btn.secondary:hover, .cta-btn.secondary:hover {")
    
    # 3. Resolve the nested double card border glitch by removing .about from the card rule
    content = content.replace(".about,\n.about-container {", ".about-container {")
    content = content.replace(".about h2,\n.about-container h2 {", ".about-container h2 {")
    content = content.replace(".about p,\n.about-container p {", ".about-container p {")
    
    # Write to all files
    for filename in admin_files:
        filepath = os.path.join(css_dir, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully updated admin CSS: {filename}")

if __name__ == "__main__":
    update_css()
