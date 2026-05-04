import os

def export_knowledge():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_file = os.path.join(project_root, "L_Project_Master_Knowledge.md")
    
    ignore_dirs = {'.git', '.agent', '.vscode', 'images', 'scripts', 'sessions', 'styles'}
    ignore_files = {'L_Project_Master_Knowledge.md'}
    
    knowledge_content = []
    knowledge_content.append("# 🧠 L Project Master Knowledge Base\n")
    knowledge_content.append(f"**Export Date:** {os.popen('date /t').read().strip()}\n")
    knowledge_content.append("This document is a consolidated knowledge base for the L Project, designed for NotebookLM ingestion.\n\n---\n")
    
    for root, dirs, files in os.walk(project_root):
        # Filter directories
        dirs[:] = [d for d in dirs if d not in ignore_dirs and not d.startswith('.')]
        
        for file in files:
            if file.endswith('.md') and file not in ignore_files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, project_root)
                
                knowledge_content.append(f"\n## 📄 File: {rel_path}\n")
                knowledge_content.append("-" * 20 + "\n")
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        knowledge_content.append(content)
                        knowledge_content.append("\n\n---\n")
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(knowledge_content)
    
    print(f"✅ Success: {output_file} has been created.")

if __name__ == "__main__":
    export_knowledge()
