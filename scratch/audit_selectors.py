import os
import re
from html.parser import HTMLParser

workspace_dir = r"c:\Users\Francoo\Desktop\Proyectos-AxionCode\EduCodes - Pagina"

class SelectorParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.classes = set()
        self.ids = set()
        self.css_links = []
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        # Capture classes
        if "class" in attrs_dict:
            for c in attrs_dict["class"].split():
                self.classes.add(c)
                
        # Capture ids
        if "id" in attrs_dict:
            self.ids.add(attrs_dict["id"])
            
        # Capture stylesheet links
        if tag == "link" and attrs_dict.get("rel") == "stylesheet":
            href = attrs_dict.get("href", "")
            if "global.css" not in href and "font-awesome" not in href and "cdnjs" not in href:
                self.css_links.append(href)

def audit_files():
    html_dir = os.path.join(workspace_dir, "html")
    
    html_files = [os.path.join(workspace_dir, "index.html")]
    for root, dirs, files in os.walk(html_dir):
        for file in files:
            if file.endswith(".html") and not "nnnn" in file and not "ssss" in file:
                html_files.append(os.path.join(root, file))
                
    print(f"Found {len(html_files)} active HTML files.")
    
    for html_path in html_files:
        rel_html = os.path.relpath(html_path, workspace_dir)
        with open(html_path, "r", encoding="utf-8") as f:
            html_content = f.read()
            
        parser = SelectorParser()
        parser.feed(html_content)
        
        if not parser.css_links:
            continue
            
        print(f"\n--- Auditing {rel_html} ---")
        # print(f"HTML Classes: {sorted(list(parser.classes))}")
        # print(f"HTML IDs: {sorted(list(parser.ids))}")
        
        # Resolve CSS paths
        for css_link in parser.css_links:
            # remove cache buster
            css_link = css_link.split("?")[0]
            if css_link.startswith("../"):
                css_path = os.path.normpath(os.path.join(os.path.dirname(html_path), css_link))
            elif css_link.startswith("css/"):
                css_path = os.path.normpath(os.path.join(workspace_dir, css_link))
            else:
                css_path = os.path.normpath(os.path.join(os.path.dirname(html_path), css_link))
                
            if not os.path.exists(css_path):
                print(f"  [ERROR] CSS file not found: {css_path}")
                continue
                
            print(f"  Linked CSS: {os.path.relpath(css_path, workspace_dir)}")
            
            with open(css_path, "r", encoding="utf-8") as f:
                css_content = f.read()
                
            # Extract classes from CSS using regex
            css_classes = set(re.findall(r'\.([a-zA-Z0-9_-]+)(?=[^a-zA-Z0-9_-]|\s|\{|\,)', css_content))
            css_ids = set(re.findall(r'#([a-zA-Z0-9_-]+)(?=[^a-zA-Z0-9_-]|\s|\{|\,)', css_content))
            
            # Filter out standard keywords/states
            css_classes = {c for c in css_classes if c not in ["active", "open", "hidden", "show", "gratis", "pago", "bloqueado", "gratuito"]}
            
            # Generic/Global classes in global.css (already ignored or filtered)
            generic = ["user-profile", "dropdown-menu", "btn-primary", "btn-secondary", "btn-danger", "btn-ghost", 
                       "badge", "form-input", "form-label", "form-group", "overlay", "popup", "access-denied-message",
                       "chatbot", "navbar", "logo", "nav-links", "hamburger", "login-btn", "avatar", "username", "profile-image",
                       "comentario", "comentarios", "comentar-form", "comment-form", "comment", "author", "star", "rating",
                       "access-denied-buttons", "access-denied-button", "popup-buttons", "popup-button"]
            
            # Find classes in CSS that are NOT in HTML
            mismatched_classes = css_classes - parser.classes
            mismatched_classes = {c for c in mismatched_classes if c not in generic}
            
            if mismatched_classes:
                print(f"  [CSS NOT IN HTML] Classes in CSS but NOT in HTML: {sorted(list(mismatched_classes))}")
                
            # Find classes in HTML that are NOT in CSS
            missing_classes = parser.classes - css_classes
            missing_classes = {c for c in missing_classes if c not in generic and c not in ["hidden", "active", "open", "gratis", "pago", "bloqueado", "gratuito", "popup-buttons"]}
            if missing_classes:
                print(f"  [HTML NOT IN CSS] Classes in HTML but NOT in CSS: {sorted(list(missing_classes))}")

if __name__ == "__main__":
    audit_files()
