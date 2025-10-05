# Git Setup Instructions

## Initializing Git Repository

If this project is not already a git repository, run the following commands:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Terra Rupertus NASA Space Apps Challenge 2025 project"

# Add remote repository (replace with your actual repository URL)
git remote add origin <your-repository-url>

# Push to remote repository
git push -u origin main
```

## Files That Will Be Ignored

The `.gitignore` file has been configured to ignore the following types of files:

### Environment Files
- `.env*` - All environment variable files
- `cesium-ion-token.txt` - Cesium Ion access tokens
- `nasa-api-key.txt` - NASA API keys

### Build Artifacts
- `node_modules/` - Node.js dependencies
- `.next/` - Next.js build output
- `out/` - Next.js export output
- `dist/` - Distribution files
- `build/` - Build output

### Cesium Assets
- `public/cesium/` - Cesium static assets (copied during build)

### Development Files
- `.vscode/` - VS Code settings (except extensions.json)
- `.idea/` - IntelliJ IDEA settings
- `*.log` - Log files
- `*.tmp` - Temporary files

### OS Files
- `.DS_Store` - macOS system files
- `Thumbs.db` - Windows thumbnail cache
- `Desktop.ini` - Windows folder settings

### NASA Space Apps Documents
- `*.docx` - Microsoft Word documents
- `*.pdf` - PDF files
- `*.pptx` - PowerPoint presentations

## Important Notes

1. **Environment Variables**: Never commit `.env` files or any files containing API keys or secrets.

2. **Cesium Assets**: The `public/cesium/` directory is generated during the build process and should not be committed.

3. **Node Modules**: The `node_modules/` directory should never be committed as it can be regenerated from `package.json`.

4. **Build Output**: All build artifacts (`.next/`, `out/`, `dist/`) should be ignored as they can be regenerated.

## If Files Are Already Tracked

If some files that should be ignored are already being tracked by git, you can remove them from tracking:

```bash
# Remove files from git tracking but keep them locally
git rm --cached <file-name>

# For directories
git rm -r --cached <directory-name>

# Commit the removal
git commit -m "Remove tracked files that should be ignored"
```

## Recommended Git Workflow

1. Always check `git status` before committing
2. Use meaningful commit messages
3. Create feature branches for new development
4. Regularly push changes to remote repository
5. Use pull requests for code review (if working in a team)
