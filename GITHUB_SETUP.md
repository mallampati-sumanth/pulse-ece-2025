# 📝 GitHub Repository Setup Instructions

## Method 1: Using GitHub Website (Recommended)

### Step 1: Create Repository on GitHub
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" button in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name:** `pulse-student-management`
   - **Description:** `A comprehensive student management system with blood donation tracking, event management, and admin features`
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 2: Connect Your Local Repository
After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pulse-student-management.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Method 2: Using GitHub CLI (if you have it installed)

```bash
# Install GitHub CLI first (optional)
# On Windows: winget install GitHub.cli
# On macOS: brew install gh

# Create repository and push
gh repo create pulse-student-management --public --description "A comprehensive student management system"
git remote add origin https://github.com/YOUR_USERNAME/pulse-student-management.git
git branch -M main
git push -u origin main
```

## Complete Command Sequence

Run these commands in your terminal in the Pulse-main directory:

```bash
# 1. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/pulse-student-management.git

# 2. Rename branch to main
git branch -M main

# 3. Push to GitHub
git push -u origin main
```

## After Pushing to GitHub

1. **Add Repository Description** on GitHub
2. **Add Topics/Tags:** `nodejs`, `express`, `mongodb`, `student-management`, `blood-donation`, `event-management`
3. **Update Repository Settings:**
   - Enable Issues if you want bug reports
   - Set up branch protection rules for main branch
   - Configure Pages if you want to host documentation

## Environment Variables for GitHub Actions (Optional)

If you want to set up CI/CD, create these secrets in your GitHub repository:

1. Go to repository Settings → Secrets and variables → Actions
2. Add these secrets:
   - `DB` (your MongoDB connection string)
   - `SECRET` (session secret)
   - `GMAIL_USER`
   - `GMAIL_CLIENT_ID`
   - `GMAIL_CLIENT_SECRET`
   - `GMAIL_REFRESH_TOKEN`
   - `JWT_SECRET`

## Repository Structure on GitHub

Your repository will contain:
```
pulse-student-management/
├── 📁 Controllers/         # Route controllers
├── 📁 Models/             # Database models
├── 📁 Routes/             # Express routes
├── 📁 middlewares/        # Custom middleware
├── 📁 public/             # Static files (CSS, JS, images)
├── 📁 utils/              # Utility functions
├── 📁 views/              # EJS templates
├── 📁 website/            # Static website files
├── 📄 .gitignore          # Git ignore rules
├── 📄 README.md           # Project documentation
├── 📄 SETUP.md            # Setup instructions
├── 📄 app.js              # Express app configuration
├── 📄 server.js           # Server entry point
├── 📄 package.json        # Dependencies and scripts
├── 📄 setup-database.js   # Database setup script
└── 📄 config.env.example  # Environment variables template
```

## Next Steps After GitHub Setup

1. **Clone repository** on other machines:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pulse-student-management.git
   cd pulse-student-management
   npm install
   cp config.env.example config.env
   # Edit config.env with your values
   npm run setup-db
   npm start
   ```

2. **Invite collaborators** if working in a team

3. **Set up deployment** to platforms like Render, Heroku, or Railway

4. **Create issues** for future features or bug fixes

## Troubleshooting

If you get authentication errors:
1. Make sure you're logged into GitHub
2. Use personal access token instead of password
3. Or use SSH keys for authentication

If you get permission errors:
1. Check repository name is correct
2. Ensure you have write access to the repository
3. Try using HTTPS instead of SSH or vice versa
