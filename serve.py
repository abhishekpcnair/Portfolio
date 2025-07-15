#!/usr/bin/env python3
"""
Simple HTTP server for serving the portfolio website locally.
Run this script to start a local development server.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
HOST = 'localhost'

class PortfolioHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP request handler with better error pages and MIME types."""
    
    def end_headers(self):
        # Add security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        super().end_headers()
    
    def guess_type(self, path):
        """Improve MIME type guessing for modern web files."""
        mimetype, encoding = super().guess_type(path)
        
        # Handle modern file types
        if path.endswith('.js'):
            return 'application/javascript', encoding
        elif path.endswith('.css'):
            return 'text/css', encoding
        elif path.endswith('.json'):
            return 'application/json', encoding
        elif path.endswith('.woff2'):
            return 'font/woff2', encoding
        elif path.endswith('.woff'):
            return 'font/woff', encoding
        
        return mimetype, encoding

def main():
    """Start the local development server."""
    
    # Ensure we're in the right directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Check if index.html exists
    if not Path('index.html').exists():
        print("❌ Error: index.html not found!")
        print("Make sure you're running this script from the portfolio directory.")
        sys.exit(1)
    
    # Create the server
    try:
        with socketserver.TCPServer((HOST, PORT), PortfolioHTTPRequestHandler) as httpd:
            server_url = f"http://{HOST}:{PORT}"
            
            print("🚀 Starting Abhishek's Portfolio Server...")
            print(f"📂 Serving directory: {os.getcwd()}")
            print(f"🌐 Server running at: {server_url}")
            print("📱 The portfolio should open in your browser automatically.")
            print("⌨️  Press Ctrl+C to stop the server")
            print("-" * 50)
            
            # Open browser automatically
            webbrowser.open(server_url)
            
            # Start serving
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: Port {PORT} is already in use!")
            print(f"Try a different port by editing the PORT variable in this script.")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user.")
        print("👋 Thanks for viewing the portfolio!")

if __name__ == "__main__":
    main() 