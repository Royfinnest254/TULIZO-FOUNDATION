import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class DualStackRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run(port=3000):
    server_address = ('', port)
    httpd = ThreadingHTTPServer(server_address, DualStackRequestHandler)
    print(f"Serving HTTP on port {port} (multithreaded)...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nKeyboard interrupt received, exiting.")
        sys.exit(0)

if __name__ == '__main__':
    run()
