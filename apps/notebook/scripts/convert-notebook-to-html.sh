#!/bin/bash

# Notebook to HTML Converter Script
# Converts all Jupyter notebooks in starter notebook to HTML with dark mode styling

set -e  # Exit on any error

# Configuration
COLLECTION_NAME="Starter Notebook"
NOTEBOOKS_DIR="../src/"
OUTPUT_DIR="../dist"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NOTEBOOKS_PATH="$SCRIPT_DIR/$NOTEBOOKS_DIR"
DIST_PATH="$SCRIPT_DIR/$OUTPUT_DIR"

echo "🚀 Starting notebook to HTML conversion..."

# Check if jupyter is installed
if ! command -v jupyter &> /dev/null; then
    echo "❌ Error: jupyter is not installed. Please install it with: pip install jupyter"
    exit 1
fi

# Check if notebooks directory exists
if [ ! -d "$NOTEBOOKS_PATH" ]; then
    echo "❌ Error: Notebooks directory not found: $NOTEBOOKS_PATH"
    exit 1
fi

# Delete and recreate dist directory
echo "🗑️  Cleaning up existing dist directory..."
if [ -d "$DIST_PATH" ]; then
    rm -rf "$DIST_PATH"
fi
mkdir -p "$DIST_PATH"

# Create custom CSS for dark mode
echo "🎨 Creating dark mode CSS template..."
cat > "$DIST_PATH/custom.css" << 'EOF'
/* Dark Mode CSS for Jupyter Notebooks */
body {
    background-color: #0d1117 !important;
    color: #e6edf3 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
    line-height: 1.8;
    margin: 0;
    padding: 20px;
    font-size: 18px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #161b22;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    border: 1px solid #30363d;
}

h1, h2, h3, h4, h5, h6 {
    color: #ffffff !important;
    border-bottom: 2px solid #21262d;
    padding-bottom: 12px;
    font-weight: 600;
    margin-top: 24px;
    margin-bottom: 16px;
}

h1 {
    font-size: 2.8em;
    margin-bottom: 30px;
    text-align: center;
    color: #58a6ff !important;
    border-bottom: 3px solid #21262d;
    padding-bottom: 20px;
}

h2 {
    color: #7ee787 !important;
    font-size: 2em;
    margin-top: 40px;
    border-bottom: 2px solid #21262d;
}

h3 {
    color: #79c0ff !important;
    font-size: 1.6em;
    border-bottom: 1px solid #21262d;
}

/* Code cells */
.input_area {
    background-color: #0d1117 !important;
    border: 2px solid #30363d;
    border-radius: 8px;
    margin: 16px 0;
}

.code_cell {
    margin: 24px 0;
}

.highlight {
    background-color: #0d1117 !important;
    border-radius: 8px;
    padding: 20px;
    border: 2px solid #30363d;
}

pre {
    background-color: #0d1117 !important;
    color: #e6edf3 !important;
    border: 2px solid #30363d;
    border-radius: 8px;
    padding: 20px;
    overflow-x: auto;
    font-family: 'SF Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 16px;
    line-height: 1.6;
}

code {
    background-color: #161b22 !important;
    color: #79c0ff !important;
    padding: 4px 8px;
    border-radius: 6px;
    font-family: 'SF Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.9em;
    border: 1px solid #30363d;
}

/* Syntax highlighting for Python */
.highlight .k { color: #ff7b72; font-weight: 600; } /* Keywords */
.highlight .s { color: #a5d6ff; } /* Strings */
.highlight .c { color: #8b949e; font-style: italic; } /* Comments */
.highlight .n { color: #e6edf3; } /* Names */
.highlight .o { color: #ff7b72; } /* Operators */
.highlight .p { color: #e6edf3; } /* Punctuation */
.highlight .nb { color: #d2a8ff; font-weight: 600; } /* Built-in functions */
.highlight .mi { color: #79c0ff; } /* Numbers */
.highlight .mf { color: #79c0ff; } /* Float numbers */

/* Output cells */
.output_area {
    background-color: #0d1117 !important;
    border: 2px solid #30363d;
    border-radius: 8px;
    margin: 16px 0;
    padding: 20px;
}

.output_text {
    color: #e6edf3 !important;
    font-family: 'SF Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 16px;
    line-height: 1.6;
}

/* Text content */
p {
    color: #e6edf3 !important;
    font-size: 1.1em;
    line-height: 1.8;
    margin: 16px 0;
}

/* Tables */
table {
    background-color: #161b22 !important;
    border-collapse: collapse;
    width: 100%;
    margin: 24px 0;
    font-size: 1em;
}

th, td {
    border: 2px solid #30363d;
    padding: 16px;
    text-align: left;
    color: #e6edf3 !important;
}

th {
    background-color: #21262d !important;
    color: #58a6ff !important;
    font-weight: 600;
    font-size: 1.1em;
}

tr:nth-child(even) {
    background-color: #161b22;
}

tr:nth-child(odd) {
    background-color: #0d1117;
}

tr:hover {
    background-color: #1c2128;
}

/* Links */
a {
    color: #58a6ff !important;
    text-decoration: none;
    font-weight: 500;
}

a:hover {
    color: #79c0ff !important;
    text-decoration: underline;
}

/* Lists */
ul, ol {
    color: #e6edf3 !important;
    font-size: 1.1em;
    line-height: 1.8;
}

li {
    margin: 12px 0;
}

/* Blockquotes */
blockquote {
    border-left: 4px solid #58a6ff;
    margin: 24px 0;
    padding: 16px 24px;
    background-color: #161b22;
    border-radius: 0 8px 8px 0;
    color: #e6edf3 !important;
    font-size: 1.05em;
}

/* Navigation */
.nav-link {
    display: inline-block;
    padding: 12px 24px;
    margin: 8px;
    background-color: #21262d;
    color: #58a6ff !important;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s;
    border: 2px solid #30363d;
    font-size: 1em;
    font-weight: 500;
}

.nav-link:hover {
    background-color: #30363d;
    color: #79c0ff !important;
    text-decoration: none;
    border-color: #58a6ff;
}

        /* Responsive design */
        @media (max-width: 768px) {
            body {
                font-size: 16px;
                padding: 12px;
            }
            
            .container {
                padding: 20px;
                margin: 0;
                border-radius: 8px;
            }
            
            h1 {
                font-size: 2em;
                margin-bottom: 20px;
                line-height: 1.3;
            }
            
            h2 {
                font-size: 1.6em;
                margin-top: 30px;
            }
            
            h3 {
                font-size: 1.3em;
            }
            
            p {
                font-size: 1em;
                line-height: 1.7;
            }
            
            pre {
                font-size: 14px;
                padding: 16px;
                overflow-x: auto;
            }
            
            code {
                font-size: 0.85em;
                padding: 3px 6px;
            }
            
            .lecture-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            
            .lecture-card {
                padding: 16px;
            }
            
            .step-section {
                padding: 16px;
                margin: 20px 0;
            }
            
            .step-title {
                font-size: 1.4em;
            }
            
            .stats {
                padding: 16px;
                margin: 20px 0;
            }
            
            .stat-number {
                font-size: 1.8em;
            }
            
            .back-button {
                top: 12px;
                left: 12px;
                padding: 10px 16px;
                font-size: 14px;
            }
            
            th, td {
                padding: 12px;
                font-size: 0.95em;
            }
            
            ul, ol {
                font-size: 1em;
            }
        }
        
        @media (max-width: 480px) {
            body {
                font-size: 15px;
                padding: 8px;
            }
            
            .container {
                padding: 16px;
                margin: 0;
                border-radius: 6px;
            }
            
            h1 {
                font-size: 1.6em;
                line-height: 1.3;
            }
            
            h2 {
                font-size: 1.4em;
            }
            
            h3 {
                font-size: 1.2em;
            }
            
            p {
                font-size: 1em;
            }
            
            pre {
                font-size: 13px;
                padding: 12px;
            }
            
            code {
                font-size: 0.8em;
            }
            
            .lecture-card {
                padding: 14px;
            }
            
            .step-section {
                padding: 14px;
            }
            
            .back-button {
                top: 8px;
                left: 8px;
                padding: 8px 14px;
                font-size: 13px;
            }
            
            th, td {
                padding: 10px;
                font-size: 0.9em;
            }
        }
EOF

# Find all notebook files and convert them
echo "📚 Converting notebooks to HTML..."
notebook_count=0

# Create array to store all converted files for index generation
declare -a converted_files=()

while IFS= read -r -d '' notebook_file; do
    # Get relative path from notebooks directory
    rel_path="${notebook_file#$NOTEBOOKS_PATH/}"
    
    # Remove .ipynb extension and add .html
    html_path="${rel_path%.ipynb}.html"
    
    # Create output directory structure
    output_dir="$DIST_PATH/$(dirname "$html_path")"
    mkdir -p "$output_dir"
    
    # Convert notebook to HTML
    echo "  Converting: $rel_path"
    jupyter nbconvert --to html \
        --output-dir="$output_dir" \
        --output="$(basename "$html_path" .html)" \
        "$notebook_file"
    
    # Add custom CSS to the generated HTML
    html_file="$output_dir/$(basename "$html_path")"
    if [ -f "$html_file" ]; then
        echo "  Adding custom CSS..."
        # Calculate relative path to CSS file
        css_rel_path=""
        depth=$(echo "$html_path" | tr -cd '/' | wc -c)
        i=0
        while [ $i -lt $depth ]; do
            css_rel_path="../$css_rel_path"
            i=$((i + 1))
        done
        css_rel_path="${css_rel_path}custom.css"
        
        echo "  Inserting CSS link..."
        # Insert CSS link in the head section (using temp file approach for portability)
        awk -v css="$css_rel_path" '{
            if (match($0, /<\/head>/)) {
                sub(/<\/head>/, "  <link rel=\"stylesheet\" href=\"" css "\">\n</head>")
            }
            print
        }' "$html_file" > "$html_file.tmp" && mv "$html_file.tmp" "$html_file"
        
        echo "  Adding container div..."
        # Add container div around body content and back button (using awk for portability)
        awk '{
            if (match($0, /<body[^>]*>/)) {
                sub(/<body[^>]*>/, "<body class=\"jp-Notebook\" data-jp-theme-light=\"true\" data-jp-theme-name=\"JupyterLab Light\">\n<a href=\"../index.html\" class=\"back-button\">← Back to Index</a>\n<div class=\"container\">")
            }
            if (match($0, /<\/body>/)) {
                sub(/<\/body>/, "</div>\n</body>")
            }
            print
        }' "$html_file" > "$html_file.tmp" && mv "$html_file.tmp" "$html_file"
        
        echo "  Done processing HTML file"
        converted_files+=("$html_path")
        notebook_count=$((notebook_count + 1))
    fi
done < <(find "$NOTEBOOKS_PATH" -name "*.ipynb" -type f -print0)

echo "✅ Converted $notebook_count notebooks to HTML"

# Generate index.html navigation page
echo "🏠 Generating navigation index page..."

# Create the HTML file using echo statements
{
    echo '<!DOCTYPE html>'
    echo '<html lang="en">'
    echo '<head>'
    echo '    <meta charset="UTF-8">'
    echo '    <meta name="viewport" content="width=device-width, initial-scale=1.0">'
    echo "    <title>$COLLECTION_NAME - Notebook Collection</title>"
    echo '    <link rel="stylesheet" href="custom.css">'
    echo '    <style>'
    echo '        .step-section {'
    echo '            margin: 30px 0;'
    echo '            padding: 24px;'
    echo '            background-color: #161b22;'
    echo '            border-radius: 12px;'
    echo '            border: 2px solid #30363d;'
    echo '            border-left: 4px solid #7ee787;'
    echo '        }'
    echo '        .step-title {'
    echo '            color: #7ee787 !important;'
    echo '            font-size: 1.8em;'
    echo '            margin-bottom: 15px;'
    echo '            text-transform: capitalize;'
    echo '            font-weight: 600;'
    echo '        }'
    echo '        .lecture-grid {'
    echo '            display: grid;'
    echo '            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));'
    echo '            gap: 15px;'
    echo '            margin-top: 15px;'
    echo '        }'
    echo '        .lecture-card {'
    echo '            background-color: #0d1117;'
    echo '            border: 2px solid #30363d;'
    echo '            border-radius: 12px;'
    echo '            padding: 24px;'
    echo '            transition: all 0.3s ease;'
    echo '            cursor: pointer;'
    echo '            text-decoration: none;'
    echo '            display: block;'
    echo '            position: relative;'
    echo '            overflow: hidden;'
    echo '        }'
    echo '        .lecture-card:hover {'
    echo '            transform: translateY(-3px);'
    echo '            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);'
    echo '            border-color: #58a6ff;'
    echo '            text-decoration: none;'
    echo '            background-color: #161b22;'
    echo '        }'
    echo '        .lecture-card:active {'
    echo '            transform: translateY(-1px);'
    echo '        }'
    echo '        .lecture-title {'
    echo '            color: #58a6ff !important;'
    echo '            font-size: 1.3em;'
    echo '            margin-bottom: 12px;'
    echo '            font-weight: 600;'
    echo '        }'
    echo '        .lecture-link {'
    echo '            color: #7ee787 !important;'
    echo '            text-decoration: none;'
    echo '            font-weight: 600;'
    echo '            display: inline-flex;'
    echo '            align-items: center;'
    echo '            gap: 8px;'
    echo '            margin-top: 10px;'
    echo '            font-size: 1em;'
    echo '        }'
    echo '        .lecture-link:hover {'
    echo '            color: #56d364 !important;'
    echo '        }'
    echo '        .back-button {'
    echo '            position: fixed;'
    echo '            top: 20px;'
    echo '            left: 20px;'
    echo '            background-color: #238636;'
    echo '            color: #ffffff !important;'
    echo '            border: 2px solid #2ea043;'
    echo '            border-radius: 8px;'
    echo '            padding: 12px 20px;'
    echo '            font-size: 15px;'
    echo '            font-weight: 600;'
    echo '            cursor: pointer;'
    echo '            text-decoration: none;'
    echo '            display: flex;'
    echo '            align-items: center;'
    echo '            gap: 8px;'
    echo '            transition: all 0.3s ease;'
    echo '            z-index: 1000;'
    echo '            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);'
    echo '        }'
    echo '        .back-button:hover {'
    echo '            background-color: #2ea043;'
    echo '            transform: translateY(-2px);'
    echo '            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);'
    echo '            text-decoration: none;'
    echo '            color: #ffffff !important;'
    echo '            border-color: #3fb950;'
    echo '        }'
    echo '        .stats {'
    echo '            text-align: center;'
    echo '            margin: 30px 0;'
    echo '            padding: 30px;'
    echo '            background-color: #161b22;'
    echo '            border-radius: 12px;'
    echo '            border: 2px solid #30363d;'
    echo '        }'
    echo '        .stat-number {'
    echo '            font-size: 3em;'
    echo '            color: #7ee787;'
    echo '            font-weight: 700;'
    echo '        }'
    echo '    </style>'
    echo '</head>'
    echo '<body>'
    echo "    <div class=\"container\">"
    echo "        <h1>🚀 $COLLECTION_NAME - Notebook Collection</h1>"
    echo '        '
    echo '        <div class="stats">'
    echo '            <div class="stat-number">'"$notebook_count"'</div>'
    echo '            <p>Total Notebooks Converted</p>'
    echo '        </div>'
    echo ''
} > "$DIST_PATH/index.html"

# Group files by step and generate navigation
# Create temporary file to store step groupings
temp_file=$(mktemp)
for file in "${converted_files[@]}"; do
    step=$(echo "$file" | cut -d'/' -f1)
    echo "$step|$file" >> "$temp_file"
done

# Sort steps and generate HTML
for step in $(cut -d'|' -f1 "$temp_file" | sort -u); do
    step_title=$(echo "$step" | sed 's/step[0-9]*-//g' | sed 's/-/ /g')
    step_number=$(echo "$step" | grep -o 'step[0-9]*' | grep -o '[0-9]*' || echo "")
    
    echo "        <div class=\"step-section\">" >> "$DIST_PATH/index.html"
    if [ -n "$step_number" ]; then
        echo "            <h2 class=\"step-title\">Step $step_number: $step_title</h2>" >> "$DIST_PATH/index.html"
    else
        echo "            <h2 class=\"step-title\">$step_title</h2>" >> "$DIST_PATH/index.html"
    fi
    echo "            <div class=\"lecture-grid\">" >> "$DIST_PATH/index.html"
    
    # Sort files within each step
    for file in $(grep "^$step|" "$temp_file" | cut -d'|' -f2 | sort); do
        lecture_name=$(basename "$file" .html)
        lecture_title=$(echo "$lecture_name" | sed 's/lecture-[0-9]*-//g' | sed 's/-/ /g')
        lecture_number=$(echo "$lecture_name" | grep -o 'lecture-[0-9]*' | grep -o '[0-9]*' || echo "")
        
        echo "                <a href=\"$file\" class=\"lecture-card\">" >> "$DIST_PATH/index.html"
        if [ -n "$lecture_number" ]; then
            echo "                    <div class=\"lecture-title\">Lecture $lecture_number</div>" >> "$DIST_PATH/index.html"
        else
            echo "                    <div class=\"lecture-title\">$lecture_title</div>" >> "$DIST_PATH/index.html"
        fi
        echo "                    <div style=\"color: #e6edf3; margin-bottom: 10px; font-size: 1.05em;\">$lecture_title</div>" >> "$DIST_PATH/index.html"
        echo "                    <div class=\"lecture-link\">📖 Open Notebook →</div>" >> "$DIST_PATH/index.html"
        echo "                </a>" >> "$DIST_PATH/index.html"
    done
    
    echo "            </div>" >> "$DIST_PATH/index.html"
    echo "        </div>" >> "$DIST_PATH/index.html"
done

# Clean up temporary file
rm "$temp_file"

# Add footer
{
    echo '        '
    echo '        <div style="text-align: center; margin-top: 40px; padding: 24px; background-color: #161b22; border-radius: 12px; border: 2px solid #30363d;">'
    echo '            <p style="color: #e6edf3; font-size: 1.1em; line-height: 1.8;">'
    echo '                🎨 Styled with dark mode for comfortable reading<br>'
    echo '                🔄 Run the conversion script again when you add new notebooks'
    echo '            </p>'
    echo '        </div>'
    echo '    </div>'
    echo '</body>'
    echo '</html>'
} >> "$DIST_PATH/index.html"

echo "🎉 Conversion complete!"
echo "📁 HTML files saved to: $DIST_PATH"
echo "🌐 Open $DIST_PATH/index.html in your browser to navigate the notebooks"
echo ""
echo "💡 To run this script again in the future:"
echo "   cd $SCRIPT_DIR && ./convert-notebooks.sh"
